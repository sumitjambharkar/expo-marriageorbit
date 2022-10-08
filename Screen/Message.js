import { View } from "react-native";
import firebase from "firebase/compat/app";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import React, { useEffect, useState, useCallback } from "react";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";

const Message = ({ route }) => {
  const { uid, displayName, image } = route.params;
  const [messages, setMessages] = useState([]);
  const { currentUser } = useAuth();

  

  useEffect(() => {
      const generateId =
        uid > currentUser.uid
          ? currentUser.uid + "-" + uid
          : uid + "-" + currentUser.uid;
      const unSub = db.collection("chat")
        .doc(generateId)
        .collection("messages")
        .orderBy("createdAt", "desc")
        .onSnapshot((querySnap) => {
          const allmsg = querySnap.docs.map((docSanp) => {
            const data = docSanp.data();
            if (data.createdAt) {
              return {
                ...docSanp.data(),
                createdAt: docSanp.data().createdAt.toDate(),
              };
            } else {
              return {
                ...docSanp.data(),
                createdAt: new Date(),
              };
            }
          });
          setMessages(allmsg);
        });
        return() => unSub()
  }, []);

  const onSend = (messagesArray) => {
    const msge = messagesArray[0];
    const myMsge = {
      ...msge,
      sendBy: currentUser.uid,
      senTo: uid,
      createdAt: new Date(),
    };
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, myMsge)
    );
    const generateId =
      uid > currentUser.uid
        ? currentUser.uid + "-" + uid
        : uid + "-" + currentUser.uid;
    db.collection("chat")
      .doc(generateId)
      .collection("messages")
      .add({
        ...myMsge,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: currentUser.uid,
            avatar: null,
          }}
          renderBubble={(props) => {
            return (
              <Bubble
                {...props}
                wrapperStyle={{
                  right: {
                    backgroundColor: "#FFA500",
                  },
                  left: {
                    backgroundColor: "white",
                  },
                }}
              />
            );
          }}
        />
      </View>
    </>
  );
};

export default Message;

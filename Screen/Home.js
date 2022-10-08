import * as React from 'react';
import { BottomNavigation,DefaultTheme} from 'react-native-paper';
import Chat from './Chat';
import Matches from './Matches';
import Profile from './Profile';

const HomeRoute = () => <Profile/>

const MatchesRoute = () => <Matches/>

const ChatRoute = () => <Chat/>

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: '#FFA500',
      accent: 'white',
    },
  };

const Home = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'Home', title: 'Home', icon: 'home' },
    { key: 'Matches', title: 'Matches', icon: 'album' },
    { key: 'Chat', title: 'Chat', icon: 'chat' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    Home:HomeRoute,
    Matches:MatchesRoute,
    Chat:ChatRoute,
  });

  return (
     
      <BottomNavigation theme={theme}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default Home;
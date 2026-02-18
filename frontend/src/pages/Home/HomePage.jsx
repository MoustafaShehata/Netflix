import HomeScreen from "./HomeScreen";
import AuthScreen from "./AuthScreen";

const HomePage = ({ user }) => {
  return <div>{user ? <HomeScreen /> : <AuthScreen />}</div>;
};
export default HomePage;

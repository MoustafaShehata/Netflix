import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";

const HomePage = ({ user }) => {
  return <>{user ? <HomeScreen /> : <AuthScreen />}</>;
};
export default HomePage;

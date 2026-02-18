import HomeScreen from "./HomeScreen";
import AuthScreen from "./AuthScreen";

const HomePage = ({ user }) => {
  return <div>{user?.isVerified ? <HomeScreen /> : <AuthScreen />}</div>;
};
export default HomePage;

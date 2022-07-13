import { selectUserData } from '../store/features/api/selectors';
import { useAppSelector } from '../store/hooks';

const Home = () => {
  const userState = useAppSelector(selectUserData);

  console.log('home user state');
  console.log(userState);
  return <div>Home</div>;
};

export default Home;

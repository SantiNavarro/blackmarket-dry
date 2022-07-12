import { useSelector } from 'react-redux';
import { selectApiData } from '../store/features/api/selectors';

const Home = () => {
  const apiState = useSelector(selectApiData);
  console.log('home api state');
  console.log(apiState);
  return <div>Home</div>;
};

export default Home;

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../store/slices/userSlice';
import '../styles/common/paragraph.scss';
import '../styles/containers/signIn.scss';

const Home = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logOutHandler = () => {
    dispatch(signOut());
    navigate('/sign-in');
  };

  return (
    <div>
      <p className="paragraph-secondary">Home</p>
      <button type="button" className="submit-form-button" onClick={logOutHandler}>
        Log out
      </button>
    </div>
  );
};

export default Home;

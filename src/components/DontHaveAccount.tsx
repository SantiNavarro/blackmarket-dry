/* eslint-disable react/no-unescaped-entities */
import { useNavigate } from 'react-router-dom';
import BasicForm from './BasicForm';

import '../styles/containers/signIn.scss';
import '../styles/containers/dontHaveAccount.scss';

const DontHaveAccount = () => {
  const navigate = useNavigate();

  return (
    <BasicForm>
      <div className="dontHaveAccount">
        <p>Don't have an account?</p>
        <button
          type="button"
          className="submit-form-button-secondary"
          onClick={() => navigate('/sign-up')}
        >
          Sign up
        </button>
      </div>
    </BasicForm>
  );
};

export default DontHaveAccount;

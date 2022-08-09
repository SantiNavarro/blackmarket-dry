/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import '../styles/common/paragraph.scss';
import '../styles/containers/signIn.scss';
import { signUpRequest } from '../api/queries';
import { signIn } from '../store/slices/userSlice';
import BasicForm from '../components/BasicForm';
import Toast from '../components/Toast';
import { isValidEmail, isValidPassword } from '../utils/validators';

interface State {
  email: string;
  password: string;
  name: string;
  showPassword: boolean;
}

const SignUp = () => {
  const [values, setValues] = useState<State>({
    email: '',
    name: '',
    password: '',
    showPassword: false,
  });
  const [toastStatus, setToastStatus] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>(
    'There was an error trying to sign you up, try again later'
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const loginMutation = useMutation(() => {
    return signUpRequest(values.email, values.password, values.name);
  });

  useEffect(() => {
    if (loginMutation.isSuccess) {
      const { email, name } = loginMutation?.data?.data?.data || {};
      const { client, uid } = loginMutation?.data?.headers || {};
      const accessToken = loginMutation?.data?.headers['access-token'] || '';
      dispatch(signIn({ email, name, accessToken, client, uid }));

      navigate('/');
    }
    if (loginMutation.isError) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const error = loginMutation.error as any;
      const errorMessages = error?.response?.data?.errors['full_messages'];

      if (errorMessages && typeof errorMessages[0] === 'string') {
        setToastMessage(errorMessages[0]);
      }
      setToastStatus(true);
    }
  }, [loginMutation, navigate, dispatch]);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
    if (setToastStatus) {
      setToastStatus(false);
    }
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const onSubmitHandler = () => {
    if (!isValidEmail(values.email)) {
      setToastMessage('Invalid email format');
      setToastStatus(true);
    } else if (!isValidPassword(values.password)) {
      setToastMessage('Invalid password format, 6 characters minimum');
      setToastStatus(true);
    } else {
      setToastStatus(false);
      setToastMessage('There was an error trying to sign you up, try again later');
      loginMutation.mutate();
    }
  };

  return (
    <div className="login">
      <div className="basic-form-position">
        <Toast open={toastStatus} message={toastMessage} />
        <BasicForm showLogo>
          <div className="form-control-container">
            <div className="inputs-container">
              <FormControl sx={{ minWidth: '100%' }} variant="filled">
                <p>Email</p>
                <OutlinedInput
                  id="outlined-adornment-email"
                  type="text"
                  value={values.email}
                  onChange={handleChange('email')}
                  placeholder="Type your email"
                  sx={{ borderRadius: '8px' }}
                />
              </FormControl>
              <FormControl sx={{ minWidth: '100%' }} variant="filled">
                <p>Full Name</p>
                <OutlinedInput
                  id="outlined-adornment-name"
                  type="text"
                  value={values.name}
                  onChange={handleChange('name')}
                  placeholder="Type your full name"
                  sx={{ borderRadius: '8px' }}
                />
              </FormControl>
              <FormControl sx={{ minWidth: '100%' }} variant="filled">
                <p className="paragraph">Password</p>
                <OutlinedInput
                  required
                  id="outlined-adornment-password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange('password')}
                  placeholder="Type your password"
                  sx={{ borderRadius: '8px' }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
            {loginMutation.isLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', padding: '1.2rem' }}>
                <CircularProgress />
              </Box>
            ) : (
              <button
                type="button"
                className={
                  !values.email || !values.password || !values.name
                    ? 'submit-form-button-disabled'
                    : 'submit-form-button'
                }
                onClick={onSubmitHandler}
                onSubmit={onSubmitHandler}
                disabled={!values.email || !values.password || !values.name}
              >
                Sign up
              </button>
            )}
            <div className="info-wrapper">
              <p>
                By signing up, you accept the
                <span className="paragraph-secondary"> Data Policy </span>
                and the
                <span className="paragraph-secondary"> Cookies Policy</span>
              </p>
              <p>
                Already have an account?
                <span>
                  <button
                    type="button"
                    onClick={() => navigate('/sign-in')}
                    className="paragraph-secondary"
                  >
                    Log in
                  </button>
                </span>
              </p>
            </div>
          </div>
        </BasicForm>
      </div>
    </div>
  );
};

export default SignUp;

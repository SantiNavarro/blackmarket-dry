/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
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
import { signInRequest } from '../api/queries';
import { signIn } from '../store/slices/userSlice';
import Toast from './Toast';
import BasicForm from './BasicForm';
import DontHaveAccount from './DontHaveAccount';

interface State {
  email: string;
  password: string;
  showPassword: boolean;
}

const SignIn = () => {
  const [toastStatus, setToastStatus] = useState<boolean>(false);
  const [values, setValues] = useState<State>({
    email: '',
    password: '',
    showPassword: false,
  });
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const loginMutation = useMutation(() => signInRequest(values.email, values.password));

  useEffect(() => {
    if (loginMutation.isSuccess) {
      const { email, name } = loginMutation?.data?.data?.data || {};
      dispatch(signIn({ email, name }));
      navigate('/');
    }
    if (loginMutation.isError) {
      setToastStatus(true);
    }
  }, [loginMutation, dispatch, navigate]);

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
    loginMutation.mutate();
  };

  return (
    <div className="basic-form-position">
      <BasicForm showLogo>
        <div className="form-control-container">
          <Toast
            open={toastStatus}
            message="Your credentials are invalid, or you are not Signed Up"
          />
          <div className="inputs-container">
            <FormControl sx={{ minWidth: '100%' }} variant="filled">
              <p>Email</p>
              <OutlinedInput
                id="outlined-adornment-email"
                className="outlined-adornment-email"
                type="text"
                value={values.email}
                onChange={handleChange('email')}
                placeholder="Type your email"
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
                !values.email || !values.password
                  ? 'submit-form-button-disabled'
                  : 'submit-form-button'
              }
              onClick={onSubmitHandler}
              onSubmit={onSubmitHandler}
              disabled={!values.email || !values.password}
            >
              Log in
            </button>
          )}
          <p className="paragraph-secondary">I forgot my password</p>
        </div>
      </BasicForm>
      <BasicForm>
        <DontHaveAccount />
      </BasicForm>
    </div>
  );
};

export default SignIn;

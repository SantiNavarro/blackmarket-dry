/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
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
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const loginMutation = useMutation(() => {
    return signUpRequest(values.email, values.password, values.name);
  });

  useEffect(() => {
    console.log('loginMutation');
    console.log(loginMutation);

    if (loginMutation.isSuccess) {
      const { email, name } = loginMutation?.data?.data?.data || {};
      dispatch(signIn({ email, name }));
      navigate('/');
    }
  }, [loginMutation.isError, loginMutation.isSuccess, navigate]);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
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
    <div className="login">
      <div className="basic-form-position">
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
            <p className="paragraph-secondary">
              By signing up, you accept the Data Policy and the Cookies Policy
            </p>
          </div>
        </BasicForm>
      </div>
    </div>
  );
};

export default SignUp;

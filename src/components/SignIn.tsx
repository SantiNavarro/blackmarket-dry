/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useSignInMutation } from '../store/features/api/api-slice';
import '../styles/common/paragraph.scss';
import '../styles/containers/signIn.scss';

interface State {
  email: string;
  password: string;
  showPassword: boolean;
}

const SignIn = () => {
  const [values, setValues] = useState<State>({
    email: '',
    password: '',
    showPassword: false,
  });

  const [callSignIn, { data, error, isError, isSuccess }] = useSignInMutation();

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
    callSignIn({ email: values.email, password: values.password });
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { width: '100%w' },
      }}
      autoComplete="off"
    >
      <>
        <FormControl sx={{ width: '100%' }} variant="filled">
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
        <FormControl sx={{ width: '100%' }} variant="filled">
          <p className="paragraph">Password</p>
          <OutlinedInput
            required
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            placeholder="Type your password"
            sx={{ borderRadius: '8px' }}
            endAdornment={(
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
            )}
          />
        </FormControl>
      </>
      {console.log('data')}
      {console.log(data)}
      {console.log('isError')}
      {console.log(isError)}
      {console.log('isSuccess')}
      {console.log(isSuccess)}
      {console.log('error')}
      {console.log(error)}
      <button
        type="button"
        className={`submit-form-button ${(!values.email || !values.password) && 'disabled'}`}
        onClick={onSubmitHandler}
      >
        Log in
      </button>
      <p className="paragraph-secondary">I forgot my password</p>
    </Box>
  );
};

export default SignIn;

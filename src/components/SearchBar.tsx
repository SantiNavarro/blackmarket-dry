/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { storeSearchText } from '../store/slices/searchSlice';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '80%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: '30%',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  zIndex: 2,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = useCallback(() => {
    dispatch(storeSearchText(searchText));

    navigate('/search', {
      state: {
        search: searchText,
      },
    });
  }, [searchText, navigate, dispatch]);

  const handleChange = (event: any) => {
    setSearchText(event.target.value);
  };

  useEffect(() => {
    const keyDownHandler = (event: any) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleSubmit();
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [handleSubmit]);

  return (
    <Search>
      <SearchIconWrapper onClick={handleSubmit}>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        onChange={event => handleChange(event)}
        placeholder="Search for products"
        inputProps={{ 'aria-label': 'search' }}
      />
    </Search>
  );
};
export default SearchBar;

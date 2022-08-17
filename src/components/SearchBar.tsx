/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { useMutation } from 'react-query';
import { useCallback, useEffect, useState } from 'react';
import { searchProducts } from '../api/queries';
import { selectUserData } from '../store/features/api/selectors';
import { useAppSelector } from '../store/hooks';

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
  const userState = useAppSelector(selectUserData);

  const searchMutation = useMutation(() => searchProducts(userState, searchText));

  const handleSubmit = useCallback(() => {
    searchMutation.mutate();
  }, [searchMutation]);

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
      <SearchIconWrapper id="santi" onClick={handleSubmit}>
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

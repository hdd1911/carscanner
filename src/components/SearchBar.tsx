import React from 'react';

import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from '@mui/material';

import { useAppActions, useAppSelector } from '../hooks/store';
import { styles } from './SearchBar.styles';

const SearchBar: React.FC = () => {
    const { searchValue, searchPlaceholder } = useAppSelector(state => state.app);
    const { setSearchValue, setHintsVisible } = useAppActions();

    React.useEffect(() => {
        if (searchValue !== '') {
            setHintsVisible(true);
        } // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValue]);

    return (
        <TextField
            sx={styles.textField}
            id="outlined-basic"
            variant="outlined"
            type="search"
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            fullWidth
            placeholder={searchPlaceholder}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default SearchBar;

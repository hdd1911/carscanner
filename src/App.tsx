import React from 'react';

import { Box, Container } from '@mui/material';

import { styles } from './App.styles';
import Hints from './components/Hints';
import InfiniteList from './components/InfiniteList';
import Recent from './components/Recent';
import SearchBar from './components/SearchBar';
import { useAppSelector } from './hooks/store';

const App: React.FC = () => {
    const { hintsVisible } = useAppSelector(state => state.app);

    return (
        <Container sx={styles.appContainer}>
            <Box sx={styles.searchBox}>
                <SearchBar />
                {hintsVisible ? <Hints /> : <InfiniteList />}
            </Box>
            <Box sx={styles.recentBox}>
                <Recent />
            </Box>
        </Container>
    );
};

export default App;

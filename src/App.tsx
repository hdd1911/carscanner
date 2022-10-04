import React from 'react';

import Hints from './components/Hints';
import InfiniteList from './components/InfiniteList';
import Recent from './components/Recent';
import { useAppActions, useAppSelector } from './hooks/store';

const App: React.FC = () => {
    const { searchValue } = useAppSelector(state => state.app);
    const { setSearchValue } = useAppActions();

    return (
        <div style={{ marginInline: 200, marginTop: 100, display: 'flex' }}>
            <div style={{ width: 400 }}>
                <input
                    style={{ width: 300 }}
                    type="text"
                    onChange={e => setSearchValue(e.target.value)}
                    value={searchValue}
                />
                <Hints />
                <InfiniteList />
            </div>
            <div style={{ width: 400 }}>
                <h3>Недавнее:</h3>
                <Recent />
            </div>
        </div>
    );
};

export default App;

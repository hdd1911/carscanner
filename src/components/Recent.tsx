import React from 'react';

import { useAppActions, useAppSelector } from '../hooks/store';

const Recent: React.FC = () => {
    const { searchHistory } = useAppSelector(state => state.app);
    const { removeHistoryItem } = useAppActions();

    return (
        <ul>
            {searchHistory.map(historyItem => (
                <li key={historyItem.title}>
                    {historyItem.title}
                    <button onClick={() => removeHistoryItem(historyItem)}>Удалить</button>
                </li>
            ))}
        </ul>
    );
};

export default Recent;

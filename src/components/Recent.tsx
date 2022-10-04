import React from 'react';

import { useAppActions, useAppSelector } from '../hooks/store';
import { HistoryItem } from '../store/appSlice';

const Recent: React.FC = () => {
    const { searchHistory } = useAppSelector(state => state.app);
    const { removeHistoryItem, setSearchValue } = useAppActions();

    const onHistoryItemClickHandler = React.useCallback((historyItem: HistoryItem) => {
            setSearchValue(historyItem.title);
        },
        [setSearchValue],
    );

    return (
        <ul>
            {searchHistory.map(historyItem => (
                <li key={historyItem.title}>
                    <div
                        onClick={() => onHistoryItemClickHandler(historyItem)}
                        style={{ cursor: 'pointer' }}
                    >
                        {historyItem.title}
                        <button onClick={() => removeHistoryItem(historyItem)}>Удалить</button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default Recent;

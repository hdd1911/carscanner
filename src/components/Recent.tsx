import React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { IconButton, List, ListItem, Typography } from '@mui/material';

import { useAppActions, useAppSelector } from '../hooks/store';
import { HistoryItem } from '../store/appSlice.models';
import { styles } from './Recent.styles';

const Recent: React.FC = () => {
    const { searchHistory } = useAppSelector(state => state.app);
    const { removeHistoryItem, setSearchValue } = useAppActions();

    const onHistoryItemClickHandler = React.useCallback(
        (historyItem: HistoryItem) => {
            setSearchValue(historyItem.title);
        },
        [setSearchValue],
    );

    const Title: () => JSX.Element = () => (
        <Typography variant="h5" fontWeight="bold" margin={2}>
            Недавнее
        </Typography>
    );

    if (!searchHistory?.length)
        return (
            <>
                <Title />
                <Typography sx={styles.noDataTitle} variant="subtitle1">
                    Нет записей
                </Typography>
            </>
        );

    return (
        <>
            <Title />
            <List>
                {searchHistory.map(historyItem => (
                    <ListItem
                        key={historyItem.title}
                        secondaryAction={
                            <IconButton
                                edge="end"
                                aria-label="delete"
                                size="small"
                                onClick={() => removeHistoryItem(historyItem)}
                            >
                                <CloseIcon />
                            </IconButton>
                        }
                    >
                        <Typography
                            sx={styles.historyItem}
                            variant="subtitle1"
                            onClick={() => onHistoryItemClickHandler(historyItem)}
                        >
                            {historyItem.title}
                        </Typography>
                    </ListItem>
                ))}
            </List>
        </>
    );
};

export default Recent;

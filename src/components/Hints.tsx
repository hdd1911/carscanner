import React from 'react';

import { Box, List, ListItem, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';

import useDebounce from '../hooks/debounce';
import { useAppActions, useAppSelector } from '../hooks/store';
import { searcherApi, useLazySuggestHintsQuery } from '../services/searcher';
import { Hint } from '../services/searcher.models';
import HighlightedText from './HighlightedText';
import { styles } from './Hints.styles';

const Hints: React.FC = () => {
    const { searchValue } = useAppSelector(state => state.app);
    const {
        addHistoryItem,
        setSelectedModel,
        setSearchValue,
        setHintsVisible,
        setSearchPlaceholder,
    } = useAppActions();
    const [suggestHints, { data: hints }] = useLazySuggestHintsQuery();

    const dispatch = useDispatch();
    const debounsed = useDebounce(searchValue);

    const onHintClickHandler = React.useCallback(
        (hint: Hint) => {
            addHistoryItem({ title: hint.title });
            setSearchPlaceholder(hint.title);

            if (hint.model_id === 0) {
                setSearchValue(hint.title);
            } else {
                setSelectedModel({ id: hint.model_id });
                setHintsVisible(false);
                setSearchValue('');
            }
        },
        [addHistoryItem, setHintsVisible, setSearchPlaceholder, setSearchValue, setSelectedModel],
    );

    React.useEffect(() => {
        if (debounsed) {
            const query = suggestHints({ text: debounsed });
            return () => {
                query.abort();
            };
        } else {
            dispatch(searcherApi.util.resetApiState());
        }
    }, [debounsed, dispatch, suggestHints]);

    if (!hints?.length)
        return (
            <Typography sx={styles.noDataTitle} variant="subtitle1">
                Нет данных
            </Typography>
        );

    return (
        <Box sx={styles.containerBox}>
            <List>
                {hints?.map(hint => (
                    <ListItem
                        key={hint.title}
                        onClick={() => onHintClickHandler(hint)}
                        sx={styles.listItem}
                    >
                        <Typography variant="subtitle1">
                            <HighlightedText text={hint.title} highlight={searchValue} />
                        </Typography>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default Hints;

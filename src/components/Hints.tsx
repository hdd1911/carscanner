import React from 'react';

import { useDispatch } from 'react-redux';

import useDebounce from '../hooks/debounce';
import { useAppActions, useAppSelector } from '../hooks/store';
import { Hint, searcherApi, useLazySuggestHintsQuery } from '../services/searcher';
import HighlightedText from './HighlightedText';

const Hints: React.FC = () => {
    const { searchValue } = useAppSelector(state => state.app);
    const { addHistoryItem, setSelectedModel, setSearchValue } = useAppActions();
    const [suggestHints, { data: hints }] = useLazySuggestHintsQuery();

    const dispatch = useDispatch();
    const debounsed = useDebounce(searchValue);

    const onHintClickHandler = (hint: Hint) => {
        addHistoryItem({ title: hint.title });

        if (hint.model_id === 0) {
            setSearchValue(hint.title);
            suggestHints({ text: hint.title }); // мб нужно будет убрать
        } else {
            setSelectedModel({ id: hint.model_id });
        }
    };

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

    return (
        <div
            style={{
                height: 300,
                width: 'auto',
                border: '1px solid red',
                marginTop: 10,
            }}
        >
            <ul>
                {hints?.map(hint => (
                    <li
                        key={hint.title}
                        onClick={() => onHintClickHandler(hint)}
                        style={{ cursor: 'pointer' }}
                    >
                        <HighlightedText text={hint.title} highlight={searchValue} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Hints;

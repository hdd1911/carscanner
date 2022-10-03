import React from 'react';

import { useDispatch } from 'react-redux';

import InfiniteList from './components/InfiniteList';
import Recent from './components/Recent';
import { useAppActions } from './hooks/store';
import { Hint, searcherApi, useLazySuggestHintsQuery } from './services/searcher';

const App: React.FC = () => {
    const [searchValue, setSearchValue] = React.useState<string>('');
    const [suggestHints, { isLoading, data: hints }] = useLazySuggestHintsQuery();

    const { addHistoryItem, setSelectedModel } = useAppActions();
    const dispatch = useDispatch();

    // React.useEffect(() => {
    //     console.log(hints);
    // }, [hints]);

    const onClickHandler = () => {
        // const test = fetchSuggestHints({ text: 'toyota' });
        // console.log('onClickHandler fired!');
        // setTimeout(() => test.abort(), 140);
        suggestHints({ text: searchValue });
    };

    const onClickHandler2 = () => {
        addHistoryItem({ title: searchValue });
    };

    const onHintClickHandler = (hint: Hint) => {
        addHistoryItem({ title: hint.title });

        if (hint.model_id === 0) {
            setSearchValue(hint.title);
            suggestHints({ text: hint.title }); // мб нужно будет убрать
        } else {
            setSelectedModel({ id: hint.model_id });
        }
    };

    return (
        <div style={{ marginInline: 200, marginTop: 100, display: 'flex' }}>
            <div style={{ width: 400 }}>
                <input
                    style={{ width: 300 }}
                    type="text"
                    onChange={e => setSearchValue(e.target.value)}
                    value={searchValue}
                />
                <button onClick={onClickHandler}>fetchSuggestHints</button>
                <button onClick={onClickHandler2}>addHistoryItem</button>
                <button onClick={() => dispatch(searcherApi.util.resetApiState())}>
                    resetSearchCache
                </button>
                {/* <button onClick={() => onGetCarsClickHandler(1)}>getCars</button> */}
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
                                {hint.title}
                            </li>
                        ))}
                    </ul>
                </div>
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

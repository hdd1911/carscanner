import React from 'react';

import { ITEMS_PER_PAGE } from '../constants';
import { useAppSelector } from '../hooks/store';
import useOnScreen from '../hooks/useOnScreen';
import { Car, useLazyGetCarsQuery } from '../services/searcher';

const InfiniteList: React.FC = () => {
    const { selectedModel } = useAppSelector(state => state.app);
    const [getCars, { isLoading, data }] = useLazyGetCarsQuery();

    const [list, setList] = React.useState<Car[]>([]);
    const [listCompleted, setListCompleted] = React.useState<boolean>(true);

    const pageRef = React.useRef<number>(0);

    const loadMore = React.useCallback(() => {
        getCars({
            page: ++pageRef.current,
            per_page: ITEMS_PER_PAGE,
            filter: { catalog: [{ model_id: [selectedModel?.id] }] },
        });
    }, [getCars, selectedModel?.id]);

    React.useEffect(() => {
        if (selectedModel) {
            setList([]);
            pageRef.current = 0;
            setListCompleted(false);
            loadMore();
        }
    }, [loadMore, selectedModel]);

    React.useEffect(() => {
        const extraItems = data?.results;
        const totalItems = data?.total;

        if (extraItems) {
            setList(prevState => prevState.concat(extraItems));
        }

        if (totalItems && pageRef.current * ITEMS_PER_PAGE >= totalItems) {
            setListCompleted(true);
        }
    }, [data]);

    const testRef = React.useRef<HTMLDivElement | null>(null);

    const isVisible = useOnScreen(testRef);

    React.useEffect(() => {
        console.log(`is visible >>>>> ${!!(isVisible)}`);
        if (isVisible) loadMore();
    }, [isVisible, loadMore]);

    return (
        <div
            style={{
                height: 300,
                width: 'auto',
                border: '1px solid blue',
                marginTop: 10,
                overflowY: 'scroll',
            }}
        >
            <ul>
                {list?.map((item: Car) => (
                    <li key={item.id}>
                        {item.id} {item.title}
                    </li>
                ))}
            </ul>
            {!listCompleted && (
                <div ref={testRef}>
                    <button onClick={loadMore}>Загрузить еще</button>
                </div>
            )}
        </div>
    );
};

export default InfiniteList;

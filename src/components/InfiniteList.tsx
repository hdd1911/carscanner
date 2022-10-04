import React from 'react';

import { ITEMS_PER_PAGE } from '../constants';
import useIntersection from '../hooks/intersection';
import { useAppSelector } from '../hooks/store';
import { Car, useLazyGetCarsQuery } from '../services/searcher';

const InfiniteList: React.FC = () => {
    const { selectedModel } = useAppSelector(state => state.app);
    const [getCars, { data, isFetching }] = useLazyGetCarsQuery();

    const [list, setList] = React.useState<Car[]>([]);
    const [listCompleted, setListCompleted] = React.useState<boolean>(true);

    const pageRef = React.useRef<number>(0);

    const bottomRef = React.useRef<HTMLDivElement | null>(null);
    const isVisible = useIntersection(bottomRef);

    const loadMore = React.useCallback(async () => {
        pageRef.current += 1;
        const response = await getCars({
            page: pageRef.current,
            per_page: ITEMS_PER_PAGE,
            filter: { catalog: [{ model_id: [selectedModel?.id] }] },
        });
        const extraItems = response.data?.results;
        if (extraItems) setList(prevState => [...prevState, ...extraItems]);
    }, [getCars, selectedModel]);

    React.useEffect(() => {
        if (selectedModel) {
            setList([]);
            pageRef.current = 0;
            setListCompleted(false);
            loadMore();
        }
    }, [loadMore, selectedModel]);

    React.useEffect(() => {
        const totalItems = data?.total;
        const loadedItems = pageRef.current * ITEMS_PER_PAGE;

        if (totalItems && loadedItems >= totalItems) {
            setListCompleted(true);
        }
    }, [data]);

    React.useEffect(() => {
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
                    <li key={item.id} style={{ minHeight: 40 }}>
                        {item.title} {item.price}
                    </li>
                ))}
            </ul>
            {!listCompleted && !isFetching && <div ref={bottomRef}></div>}
        </div>
    );
};

export default InfiniteList;

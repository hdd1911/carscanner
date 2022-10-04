import React from 'react';

import { Box, List, ListItem, Typography } from '@mui/material';

import { CURRENCY, ITEMS_PER_PAGE, LOCALE } from '../constants';
import useIntersection from '../hooks/intersection';
import { useAppSelector } from '../hooks/store';
import { useLazyGetCarsQuery } from '../services/searcher';
import { Car } from '../services/searcher.models';
import { styles } from './InfiniteList.styles';

const InfiniteList: React.FC = () => {
    const { selectedModel } = useAppSelector(state => state.app);
    const [getCars, { data }] = useLazyGetCarsQuery();

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
        }
    }, [selectedModel]);

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
        <Box sx={styles.containerBox} style={{ overflowY: list.length > 9 ? 'scroll' : 'auto' }}>
            <List>
                {list?.map((item: Car) => (
                    <ListItem key={item.id} sx={styles.listItem}>
                        <Typography variant="subtitle1">{item.title}</Typography>
                        <Typography variant="subtitle1" fontWeight="bold">
                            {new Intl.NumberFormat(LOCALE, {
                                style: 'currency',
                                currency: CURRENCY,
                                maximumFractionDigits: 0,
                            }).format(item.price)}
                        </Typography>
                    </ListItem>
                ))}
            </List>
            {!listCompleted && <div ref={bottomRef}></div>}
        </Box>
    );
};

export default InfiniteList;

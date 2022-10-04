import React from 'react';

import { Box, ListItem, Typography } from '@mui/material';
import { Virtuoso } from 'react-virtuoso';

import { CURRENCY, ITEMS_PER_PAGE, LOCALE } from '../constants';
import useIntersection from '../hooks/intersection';
import { useAppSelector } from '../hooks/store';
import { useLazyGetCarsQuery } from '../services/searcher';
import { Car } from '../services/searcher.models';
import { styles } from './InfiniteList.styles';

const InfiniteList: React.FC = () => {
    const { selectedModel } = useAppSelector(state => state.app);
    const [getCars, { data, isFetching }] = useLazyGetCarsQuery();

    const [list, setList] = React.useState<Car[]>([]);
    const [listCompleted, setListCompleted] = React.useState<boolean>(true);

    const pageRef = React.useRef<number>(0);
    const scrollingStateRef = React.useRef<boolean>(false);

    const loadMore = React.useCallback(async () => {
        pageRef.current += 1;
        const response = await getCars({
            page: pageRef.current,
            per_page: ITEMS_PER_PAGE,
            filter: { catalog: [{ model_id: [selectedModel?.id] }] },
        });
        const extraItems = response.data?.results;
        if (extraItems) setList(prevState => [...prevState, ...extraItems]);
    }, [getCars, selectedModel?.id]);

    React.useEffect(() => {
        if (selectedModel) {
            setList([]);
            pageRef.current = 0;
            setListCompleted(false);
        }
        if (pageRef.current === 0) {
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

    const Footer: React.FC = () => {
        const bottomRef = React.useRef<HTMLDivElement | null>(null);
        const isVisible = useIntersection(bottomRef);

        React.useEffect(() => {
            if (!isFetching && isVisible && !listCompleted && scrollingStateRef.current) {
                loadMore();
            }
        }, [isVisible]);

        return <div ref={bottomRef}></div>;
    };

    return (
        <Box sx={styles.containerBox}>
            <Virtuoso
                isScrolling={isScrolling => (scrollingStateRef.current = isScrolling)}
                data={list}
                itemContent={index => (
                    <ListItem key={list[index].id} sx={styles.listItem}>
                        <Typography variant="subtitle1">{list[index].title}</Typography>
                        <Typography variant="subtitle1" fontWeight="bold">
                            {new Intl.NumberFormat(LOCALE, {
                                style: 'currency',
                                currency: CURRENCY,
                                maximumFractionDigits: 0,
                            }).format(list[index].price)}
                        </Typography>
                    </ListItem>
                )}
                components={{ Footer }}
            />
        </Box>
    );
};

export default InfiniteList;

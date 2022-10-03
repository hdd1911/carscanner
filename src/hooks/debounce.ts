import React from 'react';

import { DEFAULT_SEARCH_DEBOUNCE } from '../constants';

const useDebounce = (value: string, delay = DEFAULT_SEARCH_DEBOUNCE) => {
    const [debounced, setDebounced] = React.useState(value);

    React.useEffect(() => {
        const handler = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);

    return debounced;
};

export default useDebounce;

import React from 'react';

const useIntersection = (
    ref: React.MutableRefObject<HTMLDivElement | null>,
    options?: IntersectionObserverInit,
) => {
    const [isIntersecting, setIntersecting] = React.useState(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const observer = new IntersectionObserver(
        ([entry]) => setIntersecting(entry.isIntersecting),
        options,
    );

    React.useEffect(() => {
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [ref, observer, options]);

    return isIntersecting;
};

export default useIntersection;

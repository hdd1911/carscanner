import React from 'react';

export default function useOnScreen(
    ref: React.MutableRefObject<HTMLDivElement | null>,
    options?: IntersectionObserverInit,
) {
    const [isIntersecting, setIntersecting] = React.useState(false);

    const observer = new IntersectionObserver(
        ([entry]) => setIntersecting(entry.isIntersecting),
        options,
    );

    React.useEffect(() => {
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect(); // Remove the observer as soon as the component is unmounted
    }, [ref, observer, options]);

    return isIntersecting;
}

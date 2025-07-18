import { useEffect, useRef, useState, useCallback } from 'react';
export function useInfiniteScroll(fetchMore, options = {}) {
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const containerRef = useRef(null);
    const observer = useRef(null);
    const loadMore = useCallback(async () => {
        if (isLoading || !hasMore)
            return;
        setIsLoading(true);
        try {
            const newItems = await fetchMore();
            if (newItems.length === 0) {
                setHasMore(false);
            }
        }
        catch (error) {
            console.error('Error loading more items:', error);
            setHasMore(false);
        }
        finally {
            setIsLoading(false);
        }
    }, [isLoading, hasMore, fetchMore]);
    useEffect(() => {
        const container = containerRef.current;
        if (!container)
            return;
        const { threshold = 0.5, rootMargin = '20px', root = null } = options;
        observer.current = new IntersectionObserver((entries) => {
            const [entry] = entries;
            if (entry.isIntersecting && hasMore && !isLoading) {
                loadMore();
            }
        }, {
            threshold,
            rootMargin,
            root
        });
        observer.current.observe(container);
        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [hasMore, isLoading, loadMore, options]);
    return {
        isLoading,
        hasMore,
        loadMore,
        containerRef
    };
}

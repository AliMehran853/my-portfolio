import React, { useEffect, useRef, useState } from 'react';

function FadeIn({
    children,
    delay = 0,
    duration = 800,
    threshold = 0.1,
    distance = 30,
}) {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const element = elementRef.current;

        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            {
                threshold,
                rootMargin: '0px 0px -50px 0px',
            }
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [threshold]);

    return (
        <div
            ref={elementRef}
            className="transition-all ease-out will-change-transform"
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible
                    ? 'translate3d(0, 0, 0)'
                    : `translate3d(0, ${distance}px, 0)`,
                transitionDuration: `${duration}ms`,
                transitionDelay: `${delay}ms`,
            }}
        >
            {children}
        </div>
    );
}

export default FadeIn;
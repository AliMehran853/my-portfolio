import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

function ScrollReveal({
    children,
    animation = 'fadeUp',
    delay = 0,
    duration = 700,
}) {
    const { ref, isVisible } = useScrollReveal({
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
    });

    const animationTransforms = {
        fadeUp: isVisible
            ? 'translate3d(0, 0, 0)'
            : 'translate3d(0, 32px, 0)',

        fadeIn: 'translate3d(0, 0, 0)',

        slideLeft: isVisible
            ? 'translate3d(0, 0, 0)'
            : 'translate3d(-48px, 0, 0)',

        slideRight: isVisible
            ? 'translate3d(0, 0, 0)'
            : 'translate3d(48px, 0, 0)',

        scaleIn: isVisible
            ? 'scale(1)'
            : 'scale(0.92)',
    };

    const selectedTransform =
        animationTransforms[animation] ||
        animationTransforms.fadeUp;

    return (
        <div
            ref={ref}
            className="will-change-transform"
            style={{
                opacity: isVisible ? 1 : 0,
                transform: selectedTransform,
                transitionProperty: 'opacity, transform',
                transitionDuration: `${duration}ms`,
                transitionDelay: `${delay}ms`,
                transitionTimingFunction:
                    'cubic-bezier(0.22, 1, 0.36, 1)',
            }}
        >
            {children}
        </div>
    );
}

export default ScrollReveal;
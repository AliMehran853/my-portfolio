import { useEffect, useState } from 'react';

export const useScrollSpy = (
    sectionIds,
    offset = 100
) => {
    const [activeSection, setActiveSection] =
        useState('');

    useEffect(() => {
        if (!sectionIds?.length) {
            setActiveSection('');
            return;
        }

        const sectionKey =
            sectionIds.join('|');

        let ticking = false;

        const updateActiveSection = () => {
            ticking = false;

            const scrollPosition =
                window.scrollY + offset;

            let currentSection = '';

            for (
                let i = 0;
                i < sectionIds.length;
                i++
            ) {
                const section =
                    document.getElementById(
                        sectionIds[i]
                    );

                if (!section) continue;

                const sectionTop =
                    section.getBoundingClientRect()
                        .top +
                    window.scrollY;

                if (
                    sectionTop <=
                    scrollPosition
                ) {
                    currentSection =
                        sectionIds[i];
                } else {
                    break;
                }
            }

            setActiveSection(
                currentSection
            );
        };

        const handleScroll = () => {
            if (ticking) return;

            ticking = true;

            window.requestAnimationFrame(
                updateActiveSection
            );
        };

        const handleResize = () => {
            updateActiveSection();
        };

        updateActiveSection();

        window.addEventListener(
            'scroll',
            handleScroll,
            { passive: true }
        );

        window.addEventListener(
            'resize',
            handleResize
        );

        window.addEventListener(
            'load',
            handleResize
        );

        return () => {
            window.removeEventListener(
                'scroll',
                handleScroll
            );

            window.removeEventListener(
                'resize',
                handleResize
            );

            window.removeEventListener(
                'load',
                handleResize
            );
        };
    }, [
        offset,
        sectionIds?.join('|'),
    ]);

    return activeSection;
};


export const scrollToSection = (
    sectionId,
    offset = 80
) => {
    const section =
        document.getElementById(sectionId);

    if (!section) return;

    const top =
        section.getBoundingClientRect().top +
        window.scrollY -
        offset;

    window.scrollTo({
        top,
        behavior: 'smooth',
    });
};
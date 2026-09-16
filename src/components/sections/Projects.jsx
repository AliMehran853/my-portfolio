import React, {
    useEffect,
    useRef,
    useState,
} from 'react';

import {
    Briefcase,
    ChevronLeft,
    ChevronRight,
    Globe,
    Palette,
    Target,
} from 'lucide-react';

import { useTranslation } from 'react-i18next';

import {
    projects,
    categories,
} from '../../data/projects';

import ProjectCard from '../ui/ProjectCard';
import FadeIn from '../animations/FadeIn';

function Projects() {
    const { t, i18n } = useTranslation();

    const isRTL = i18n.language === 'fa';

    const [activeCategory, setActiveCategory] =
        useState('all');

    const [currentIndex, setCurrentIndex] =
        useState(0);

    const [visibleCards, setVisibleCards] =
        useState(3);

    // ==========================================
    // Responsive number of visible cards
    // ==========================================

    useEffect(() => {
        const updateVisibleCards = () => {
            if (window.innerWidth < 768) {
                setVisibleCards(1);
            } else if (window.innerWidth < 1024) {
                setVisibleCards(2);
            } else {
                setVisibleCards(3);
            }
        };

        updateVisibleCards();

        window.addEventListener(
            'resize',
            updateVisibleCards
        );

        return () => {
            window.removeEventListener(
                'resize',
                updateVisibleCards
            );
        };
    }, []);

    // ==========================================
    // Filter projects
    // ==========================================

    const filteredProjects =
        activeCategory === 'all'
            ? projects
            : projects.filter(
                (project) =>
                    project.categoryKey ===
                    activeCategory
            );

    // ==========================================
    // Reset index when category changes
    // ==========================================

    useEffect(() => {
        setCurrentIndex(0);
    }, [activeCategory]);

    // محاسبه حداکثر ایندکس (تعداد نقاط - 1)
    const maxIndex = Math.max(
        0,
        filteredProjects.length -
            visibleCards
    );

    // محاسبه درصد جابجایی برای هر اسلاید (روش Transform)
    const slidePercentage = 100 / visibleCards;

    // ==========================================
    // Next / Previous (حرکت استاندارد در هر دو زبان)
    // ==========================================

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    };

    // ==========================================
    // Category Change
    // ==========================================

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
    };

    // ==========================================
    // Category Icons
    // ==========================================

    const categoryIcons = {
        all: Target,
        webApps: Globe,
        uiComponents: Palette,
    };

    const hasNavigation =
        filteredProjects.length >
        visibleCards;

    // حرکت اسلایدر همیشه به سمت چپ است (translateX منفی)
    const transformValue = `translateX(-${currentIndex * slidePercentage}%)`;

    return (
        <section
            id="projects"
            dir={isRTL ? 'rtl' : 'ltr'}
            className="relative py-20 bg-black overflow-hidden"
        >
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">

                <div className="absolute top-1/3 right-0 w-96 h-96 bg-emerald-300/20 opacity-20 rounded-full blur-3xl" />

                <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-emerald-300/20 opacity-20 rounded-full blur-3xl" />

                <div className="absolute top-1/2 right-0 w-96 h-96 bg-emerald-300/20 opacity-20 rounded-full blur-3xl" />

            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <FadeIn delay={0}>
                    <div className="text-center mb-12">

                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-300/10 border border-emerald-300/30 rounded-full mb-6">

                            <Briefcase className="w-4 h-4 text-emerald-300" />

                            <span className="text-sm text-emerald-300 font-medium">
                                {t('projects.badge')}
                            </span>

                        </div>

                        <h2 className="text-4xl lg:text-5xl font-normal text-white mb-4">
                            {t('projects.title')}
                        </h2>

                        <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
                            {t('projects.description')}
                        </p>

                    </div>
                </FadeIn>

                {/* Category Filter */}
                <FadeIn delay={100}>
                    <div className="flex flex-wrap justify-center gap-3 mb-14">

                        {categories.map((category) => {

                            const Icon =
                                categoryIcons[
                                    category
                                ] || Target;

                            const isActive =
                                activeCategory ===
                                category;

                            return (
                                <button
                                    key={category}
                                    type="button"
                                    onClick={() =>
                                        handleCategoryChange(
                                            category
                                        )
                                    }
                                    className={`group relative px-5 sm:px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                                        isActive
                                            ? 'text-white'
                                            : 'text-white/60 hover:text-white'
                                    }`}
                                >

                                    <div
                                        className={`absolute inset-0 rounded-full transition-all duration-300 ${
                                            isActive
                                                ? 'bg-emerald-300/10 border border-emerald-300/20'
                                                : 'bg-white/5 border border-white/10'
                                        }`}
                                    />

                                    <div className="relative flex items-center gap-2">

                                        <Icon className="w-4 h-4 shrink-0" />

                                        <span className="text-sm whitespace-nowrap">
                                            {t(
                                                `projects.categories.${category}`
                                            )}
                                        </span>

                                    </div>

                                    {isActive && (
                                        <div className="absolute inset-0 rounded-full bg-emerald-300 blur-xl opacity-30 -z-10" />
                                    )}

                                </button>
                            );
                        })}

                    </div>
                </FadeIn>

                {/* Projects Carousel */}
                <FadeIn delay={200}>
                    <div className="relative">

                        {/* کانتینر اسلایدر با dir="ltr" برای چیدمان صحیح و حرکت یکسان */}
                        <div className="overflow-hidden" dir="ltr">
                            <div
                                className="flex transition-transform duration-500 ease-out"
                                style={{
                                    transform: transformValue
                                }}
                            >
                                {filteredProjects.map(
                                    (project, index) => (
                                        <div
                                            key={project.id}
                                            className="shrink-0 px-3"
                                            style={{
                                                width: `${slidePercentage}%`,
                                                flex: `0 0 ${slidePercentage}%`
                                            }}
                                        >
                                            <ProjectCard
                                                project={
                                                    project
                                                }
                                            />
                                        </div>
                                    )
                                )}
                            </div>
                        </div>

                        {/* Navigation Arrows (حلقه بی‌نهایت، بدون حالت غیرفعال) */}
                        {hasNavigation && (
                            <>
                                {/* Left Arrow */}
                                <button
                                    type="button"
                                    onClick={prevSlide}
                                    aria-label={t('common.previous')}
                                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 lg:-translate-x-4 flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 bg-white/10 border border-white/20 rounded-full backdrop-blur-sm hover:bg-white/20 transition-all duration-300 z-10"
                                >
                                    <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                                </button>

                                {/* Right Arrow */}
                                <button
                                    type="button"
                                    onClick={nextSlide}
                                    aria-label={t('common.next')}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 lg:translate-x-4 flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 bg-white/10 border border-white/20 rounded-full backdrop-blur-sm hover:bg-white/20 transition-all duration-300 z-10"
                                >
                                    <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                                </button>
                            </>
                        )}

                        {/* Navigation Dots (معکوس کردن نقاط در حالت فارسی) */}
                        {hasNavigation && (
                            <div className="flex items-center justify-center gap-2 mt-8">
                                {Array.from({
                                    length:
                                        maxIndex + 1,
                                }).map((_, index) => {
                                    // معکوس کردن ایندکس در حالت فارسی تا نقطه اول سمت راست باشد
                                    const actualIndex = isRTL
                                        ? maxIndex - index
                                        : index;

                                    return (
                                        <button
                                            key={index}
                                            type="button"
                                            onClick={() =>
                                                setCurrentIndex(actualIndex)
                                            }
                                            aria-label={`Go to project slide ${actualIndex + 1}`}
                                            className={`rounded-full transition-all duration-300 ${
                                                actualIndex ===
                                                currentIndex
                                                    ? 'bg-emerald-300 w-6 h-2'
                                                    : 'bg-white/30 w-2 h-2 hover:bg-white/60'
                                            }`}
                                        />
                                    );
                                })}
                            </div>
                        )}

                    </div>
                </FadeIn>

            </div>
        </section>
    );
}

export default Projects;
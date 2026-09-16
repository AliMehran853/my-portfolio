import React from 'react';

import {
    ChevronDown,
    Star,
} from 'lucide-react';

import {
    SiReact,
    SiNextdotjs,
    SiTailwindcss,
    SiNodedotjs,
    SiMongodb,
} from 'react-icons/si';

import {
    PERSONAL_INFO,
    STATS,
} from '../../utils/constants';

import { useTranslation } from 'react-i18next';

import { scrollToSection } from '../../hooks/useScrollSpy';

import FadeIn from '../animations/FadeIn';
import RadialGradientBackground from '../background/RadialGradientBackground';

function Hero() {
    const { t, i18n } = useTranslation();

    const isRTL = i18n.language === 'fa';

    return (
        <section
            dir={isRTL ? 'rtl' : 'ltr'}
            className="relative min-h-screen flex item-center overflow-hidden bg-black"
        >
            <RadialGradientBackground variant="hero" />

            {/* Content Container */}
            <div className="relative z-10 max-w-7xl px-4 sm:px-6 lg:px-8 py-20 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left Column - Content */}
                    <div
                        className={`${
                            isRTL ? 'text-right' : 'text-left'
                        }`}
                    >

                        <FadeIn delay={0}>
                            <div className="inline-flex items-center gap-2.5 px-[18px] py-[11px] mb-8 bg-linear-to-r from-emerald-700/10 via-emerald-700/15 to-emerald-800/20 border border-emerald-700/20 rounded-full">
                                <Star className="w-4 h-4 text-white fill-white shrink-0" />

                                <span className="text-xs md:text-sm text-white tracking-[1.2px]">
                                    {t('hero.badge')}{' '}
                                    {t('hero.basedIn')}{' '}
                                    {PERSONAL_INFO.location}
                                </span>
                            </div>
                        </FadeIn>

                        <FadeIn delay={100}>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal text-white mb-6 leading-tight">
                                {t('hero.title')}
                            </h1>
                        </FadeIn>

                        <FadeIn delay={200}>
                            <p className="text-lg text-white/70 max-w-[550px] mb-8">
                                {t('hero.description')}
                            </p>
                        </FadeIn>

                        <FadeIn delay={300}>
                            <button
                                type="button"
                                onClick={() =>
                                    scrollToSection('contact')
                                }
                                className="inline-flex items-center gap-0 mb-12 group"
                            >
                                <div className="relative z-10 bg-white text-[#212121] rounded-[17px] px-[26px] py-[13px] text-base font-medium border border-white">
                                    {t('hero.getInTouch')}
                                </div>
                            </button>
                        </FadeIn>

                        {/* Stats */}
                        <FadeIn delay={400}>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 max-w-full">
                                {STATS.map((stat) => {
                                    return (
                                        <div
                                            key={stat.id}
                                            className={`
                                                relative min-w-0
                                                ${
                                                    isRTL
                                                        ? 'text-right border-l border-white/50 pl-6 pr-0'
                                                        : 'text-left border-r border-white/50 pr-6 pl-0'
                                                }
                                                last:border-0
                                                md:border-0
                                                md:pr-0
                                                md:pl-0
                                            `}
                                        >
                                            <div className="text-2xl font-normal text-emerald-400 mb-[8px] font-mono whitespace-nowrap" dir="ltr">
                                                {stat.value}
                                            </div>

                                            <p className="text-sm text-white leading-snug">
                                                {t(stat.labelKey)}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </FadeIn>

                    </div>

                    {/* Right Column - Developer Image */}
                    <FadeIn delay={200}>
                        <div className="relative">

                            <div className="relative overflow-hidden rounded-2xl aspect-4/5 max-w-[500px] ml-auto group">

                                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                                    <div className="absolute inset-[-2px] bg-linear-to-r from-emerald-300/20 via-emerald-300/10 to-emerald-300 animate-spin-slow rounded-2xl" />
                                </div>

                                {/* Image Container */}
                                <div className="relative rounded-2xl overflow-hidden m-px h-[calc(100%-2px)]">
                                    <img
                                        src="/mehran.png"
                                        alt={t('common.developerImageAlt')}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Technology Logos */}
                                <div className="absolute bottom-6 left-6 z-20">
                                    <FadeIn delay={500}>
                                        <div className="flex items-center gap-4 bg-black/40 backdrop-blur-sm border rounded-full px-6 py-3 border-white/10">

                                            <div className="w-6 h-6 flex items-center justify-center hover:scale-110 transition-transform duration-300">
                                                <SiReact className="w-full h-full text-emerald-300" />
                                            </div>

                                            <div className="w-6 h-6 flex items-center justify-center hover:scale-110 transition-transform duration-300">
                                                <SiNextdotjs className="w-full h-full text-emerald-300" />
                                            </div>

                                            <div className="w-6 h-6 flex items-center justify-center hover:scale-110 transition-transform duration-300">
                                                <SiNodedotjs className="w-full h-full text-emerald-300" />
                                            </div>

                                            <div className="w-6 h-6 flex items-center justify-center hover:scale-110 transition-transform duration-300">
                                                <SiTailwindcss className="w-full h-full text-emerald-300" />
                                            </div>

                                            <div className="w-6 h-6 flex items-center justify-center hover:scale-110 transition-transform duration-300">
                                                <SiMongodb className="w-full h-full text-emerald-300" />
                                            </div>

                                        </div>
                                    </FadeIn>
                                </div>

                            </div>
                        </div>
                    </FadeIn>

                </div>
            </div>

            {/* Scroll Indicator */}
            <button
                type="button"
                onClick={() =>
                    scrollToSection('about')
                }
                className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
                aria-label={t('common.scrollToAbout')}
            >
                <ChevronDown className="w-8 h-8 text-emerald-300" />
            </button>
        </section>
    );
}

export default Hero;
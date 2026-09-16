import React from 'react';

import {
    Download,
    Code2,
    Sparkles,
    Layers3,
} from 'lucide-react';

import {
    SiReact,
    SiJavascript,
    SiTypescript,
    SiTailwindcss,
    SiVite,
    SiGsap,
} from 'react-icons/si';

import {
    PERSONAL_INFO,
    ABOUT_STATS,
} from '../../utils/constants';

import { useTranslation } from 'react-i18next';

import FadeIn from '../animations/FadeIn';
import RadialGradientBackground from '../background/RadialGradientBackground';

function About() {
    const { t, i18n } = useTranslation();

    const isRTL = i18n.language === 'fa';

    const skills = [
        {
            name: 'React.js',
            icon: SiReact,
        },
        {
            name: 'JavaScript',
            icon: SiJavascript,
        },
        {
            name: 'TypeScript',
            icon: SiTypescript,
        },
        {
            name: 'Tailwind CSS',
            icon: SiTailwindcss,
        },
        {
            name: 'Vite',
            icon: SiVite,
        },
        {
            name: 'GSAP',
            icon: SiGsap,
        },
    ];

    const bio = [
        t('about.bio.paragraph1'),
        t('about.bio.paragraph2'),
        t('about.bio.paragraph3'),
    ];

    return (
        <section
            id="about"
            dir={isRTL ? 'rtl' : 'ltr'}
            className="relative py-20 lg:py-24 bg-black overflow-hidden"
        >
            <RadialGradientBackground variant="about" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16 items-center mb-20">

                    {/* Left Column */}
                    <div className="flex flex-col gap-10">

                        {/* Heading */}
                        <div className="flex flex-col gap-7">

                            <FadeIn delay={60}>
                                <div className="inline-flex items-center gap-2 px-4 py-2 border border-emerald-300/30 bg-emerald-300/10 rounded-full w-fit max-w-full">
                                    <Code2 className="w-4 h-4 text-emerald-300 shrink-0" />

                                    <span className="text-sm text-emerald-300 font-medium">
                                        {t('about.badge')}
                                    </span>

                                    <Sparkles className="w-4 h-4 text-emerald-300 shrink-0" />
                                </div>
                            </FadeIn>

                            <FadeIn delay={100}>
                                <h2 className="text-4xl sm:text-5xl font-normal text-white leading-tight">
                                    {t('about.title')}
                                </h2>
                            </FadeIn>

                            <FadeIn delay={200}>
                                <div className="flex flex-col gap-4">
                                    {bio.map(
                                        (paragraph, index) => (
                                            <p
                                                key={index}
                                                className="text-base text-white/65 leading-8"
                                            >
                                                {paragraph}
                                            </p>
                                        )
                                    )}
                                </div>
                            </FadeIn>
                        </div>

                        {/* Stats */}
                        <FadeIn delay={300}>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-7 sm:gap-6">
                                {ABOUT_STATS.map((stat) => (
                                    <div
                                        key={stat.id}
                                        className={`
                                            relative
                                            ${
                                                isRTL
                                                    ? 'pr-4 pl-0 text-right'
                                                    : 'pl-4 pr-0 text-left'
                                            }
                                        `}
                                    >
                                        <div
                                            className={`
                                                absolute top-0 w-[2px] h-full
                                                bg-linear-to-b
                                                from-emerald-300
                                                via-emerald-300/50
                                                to-transparent
                                                rounded-full
                                                ${
                                                    isRTL
                                                        ? 'right-0 left-auto'
                                                        : 'left-0 right-auto'
                                                }
                                            `}
                                        />

                                        <div className="text-2xl sm:text-3xl font-normal text-white mb-2 font-mono break-words">
                                            {stat.value}
                                        </div>

                                        <p className="text-sm text-white/50 leading-snug">
                                            {t(stat.labelKey)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </FadeIn>

                        {/* Resume */}
                        <FadeIn delay={400}>
                            <a
                                href={PERSONAL_INFO.resume}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-3 bg-white hover:bg-white/90 text-black rounded-full px-7 py-3.5 text-sm sm:text-base font-medium transition-all duration-300 w-fit group"
                            >
                                <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform duration-300" />

                                {t('about.downloadResume')}
                            </a>
                        </FadeIn>
                    </div>

                    {/* Right Column */}
                    <FadeIn delay={200}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            {/* Main Expertise */}
                            <div className="sm:col-span-2 relative group">

                                <div className="absolute inset-0 bg-linear-to-br from-emerald-300/10 to-emerald-300/5 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />

                                <div className="relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-emerald-300/30 transition-all duration-300">
                                    {/* در موبایل آیکون بالا، در دسکتاپ آیکون کنار متن */}
                                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">

                                        <div className="p-3 bg-emerald-300/10 rounded-xl w-fit shrink-0 mb-0">
                                            <Layers3 className="w-6 h-6 text-emerald-300" />
                                        </div>

                                        <div className="min-w-0">
                                            <h3 className="text-lg font-semibold text-white mb-2">
                                                {t('about.cards.frontendFocus.title')}
                                            </h3>

                                            <p className="text-sm text-white/65 leading-7">
                                                {t('about.cards.frontendFocus.description')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Clean Code */}
                            <div className="relative group">
                                <div className="absolute inset-0 bg-linear-to-br from-emerald-300/10 to-emerald-300/5 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />

                                <div className="relative h-full bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-emerald-300/30 transition-all duration-300">

                                    <div className="p-3 bg-emerald-300/10 rounded-xl w-fit mb-4">
                                        <Code2 className="w-5 h-5 text-emerald-300" />
                                    </div>

                                    <h3 className="text-base font-semibold text-white mb-2">
                                        {t('about.cards.cleanCode.title')}
                                    </h3>

                                    <p className="text-sm text-white/60 leading-7">
                                        {t('about.cards.cleanCode.description')}
                                    </p>
                                </div>
                            </div>

                            {/* Continuous Learning */}
                            <div className="relative group">
                                <div className="absolute inset-0 bg-linear-to-br from-emerald-300/10 to-emerald-300/5 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />

                                <div className="relative h-full bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-emerald-300/30 transition-all duration-300">

                                    <div className="p-3 bg-emerald-300/10 rounded-xl w-fit mb-4">
                                        <Sparkles className="w-5 h-5 text-emerald-300" />
                                    </div>

                                    <h3 className="text-base font-semibold text-white mb-2">
                                        {t('about.cards.continuousLearning.title')}
                                    </h3>

                                    <p className="text-sm text-white/60 leading-7">
                                        {t('about.cards.continuousLearning.description')}
                                    </p>
                                </div>
                            </div>

                            {/* Current Direction */}
                            <div className="sm:col-span-2 relative group">

                                <div className="absolute inset-0 bg-linear-to-br from-emerald-300/10 to-emerald-300/5 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />

                                <div className="relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-emerald-300/30 transition-all duration-300">

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

                                        <div className="min-w-0 text-inherit">
                                            <div className="text-xl sm:text-2xl font-semibold text-emerald-300 mb-1 break-words">
                                                {t('about.cards.direction.react.value')}
                                            </div>

                                            <div className="text-xs text-white/50">
                                                {t('about.cards.direction.react.label')}
                                            </div>
                                        </div>

                                        <div className="min-w-0">
                                            <div className="text-xl sm:text-2xl font-semibold text-emerald-300 mb-1 break-words">
                                                {t('about.cards.direction.typescript.value')}
                                            </div>

                                            <div className="text-xs text-white/50">
                                                {t('about.cards.direction.typescript.label')}
                                            </div>
                                        </div>

                                        <div className="min-w-0">
                                            <div className="text-xl sm:text-2xl font-semibold text-emerald-300 mb-1 break-words">
                                                {t('about.cards.direction.nextjs.value')}
                                            </div>

                                            <div className="text-xs text-white/50">
                                                {t('about.cards.direction.nextjs.label')}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>

                {/* Tech Stack */}
                <FadeIn delay={500}>
                    <div className="flex flex-col items-center gap-8">

                        <div className="text-center">
                            <h3 className="text-2xl font-normal text-white mb-2">
                                {t('about.techStack.title')}
                            </h3>

                            <p className="text-sm text-white/50">
                                {t('about.techStack.description')}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 w-full max-w-5xl">
                            {skills.map((skill) => {
                                const Icon = skill.icon;

                                return (
                                    <div
                                        key={skill.name}
                                        className="group relative min-w-0 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-300/40 rounded-2xl p-5 sm:p-6 flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:-translate-y-1"
                                    >
                                        <div className="flex items-center justify-center w-8 h-8 shrink-0">
                                            <Icon className="w-full h-full text-emerald-300" />
                                        </div>

                                        <div className="w-full text-sm text-white/75 font-medium text-center leading-tight break-words">
                                            {skill.name}
                                        </div>

                                        <div className="absolute inset-0 bg-linear-to-br from-emerald-300/0 to-emerald-300/0 group-hover:from-emerald-300/10 group-hover:to-emerald-300/10 rounded-2xl transition-all duration-300 pointer-events-none" />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </FadeIn>

            </div>
        </section>
    );
}

export default About;
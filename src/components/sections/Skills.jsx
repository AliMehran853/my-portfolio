import React from 'react';

import { skills } from '../../data/skills';
import * as Icons from 'lucide-react';

import { useTranslation } from 'react-i18next';

import FadeIn from '../animations/FadeIn';

function Skills() {
    const { t, i18n } = useTranslation();

    const isRTL = i18n.language === 'fa';

    const skillCategories = {
        frontend: [
            skills.find(
                (skill) => skill.name === 'HTML5'
            ),

            skills.find(
                (skill) => skill.name === 'CSS3'
            ),

            skills.find(
                (skill) => skill.name === 'JavaScript'
            ),

            skills.find(
                (skill) => skill.name === 'React.js'
            ),

            skills.find(
                (skill) => skill.name === 'Tailwind CSS'
            ),
        ].filter(Boolean),

        tools: [
            skills.find(
                (skill) => skill.name === 'Vite'
            ),

            skills.find(
                (skill) => skill.name === 'Git & GitHub'
            ),

            skills.find(
                (skill) => skill.name === 'Responsive Design'
            ),

            skills.find(
                (skill) => skill.name === 'GSAP'
            ),

            skills.find(
                (skill) => skill.name === 'ApexCharts'
            ),
        ].filter(Boolean),

        learning: [
            skills.find(
                (skill) => skill.name === 'TypeScript'
            ),

            skills.find(
                (skill) => skill.name === 'Next.js'
            ),
        ].filter(Boolean),
    };

    // Get proficiency percentage
    const getProficiencyLevel = (level) => {
        const levels = {
            strong: 80,
            intermediate: 65,
            workingKnowledge: 55,
            currentlyLearning: 40,
            planned: 20,
        };

        return levels[level] || 40;
    };

    // Get level color
    const getLevelColor = (level) => {
        const colors = {
            strong:
                'text-emerald-300 bg-emerald-500/10 border-emerald-400/20',

            intermediate:
                'text-cyan-300 bg-cyan-500/10 border-cyan-400/20',

            workingKnowledge:
                'text-sky-300 bg-sky-500/10 border-sky-400/20',

            currentlyLearning:
                'text-amber-300 bg-amber-500/10 border-amber-400/20',

            planned:
                'text-white/60 bg-white/5 border-white/10',
        };

        return (
            colors[level] ||
            'text-white/60 bg-white/5 border-white/10'
        );
    };

    return (
        <section
            id="skills"
            dir={isRTL ? 'rtl' : 'ltr'}
            className="relative py-20 bg-black overflow-hidden"
        >
            {/* Animated Background Gradients */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-emerald-300/10 rounded-full blur-3xl opacity-50" />

                <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-emerald-300/10 rounded-full blur-3xl opacity-50" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <FadeIn delay={100}>
                    <div className="text-center mb-16">

                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-300/10 border border-emerald-300/30 rounded-full mb-6">

                            <Icons.Sparkles className="w-4 h-4 text-emerald-300" />

                            <span className="text-sm text-emerald-300 font-medium">
                                {t('skills.badge')}
                            </span>
                        </div>

                        <h2 className="text-4xl lg:text-5xl font-normal text-white mb-4">
                            {t('skills.title')}
                        </h2>

                        <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
                            {t('skills.description')}
                        </p>
                    </div>
                </FadeIn>

                {/* Skills Categories */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {Object.entries(skillCategories).map(
                        ([category, categorySkills], categoryIndex) => (
                            <FadeIn
                                key={category}
                                delay={categoryIndex * 100}
                            >
                                <div className="relative h-full bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-emerald-300/30 transition-all duration-300 group">

                                    {/* Category Header */}
                                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">

                                        <div className="w-1 h-8 bg-linear-to-b from-emerald-300 to-emerald-300/20 rounded-full" />

                                        <h3 className="text-xl font-medium text-white">
                                            {t(
                                                `skills.categories.${category}`
                                            )}
                                        </h3>
                                    </div>

                                    {/* Skills List */}
                                    <div className="space-y-5">

                                        {categorySkills.map((skill) => {

                                            const IconComponent =
                                                Icons[skill.icon] ||
                                                Icons.Code2;

                                            const proficiency =
                                                getProficiencyLevel(
                                                    skill.levelKey
                                                );

                                            return (
                                                <div
                                                    className="space-y-2"
                                                    key={skill.id}
                                                >

                                                    <div className="flex items-start justify-between gap-3">

                                                        {/* Skill Info */}
                                                        <div className="flex items-center gap-3 min-w-0">

                                                            <div className="p-2 bg-white/5 rounded-lg shrink-0">
                                                                <IconComponent className="w-4 h-4 text-emerald-300" />
                                                            </div>

                                                            <div className="min-w-0">
                                                                <div className="text-sm font-medium text-white break-words">
                                                                    {skill.name}
                                                                </div>

                                                                <div className="text-xs text-white/50 mt-0.5 break-words">
                                                                    {t(
                                                                        `skills.experience.${skill.experienceKey}`
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Level */}
                                                        <span
                                                            className={`shrink-0 text-[11px] sm:text-xs px-2 py-1 rounded-full border whitespace-nowrap ${getLevelColor(
                                                                skill.levelKey
                                                            )}`}
                                                        >
                                                            {t(
                                                                `skills.levels.${skill.levelKey}`
                                                            )}
                                                        </span>
                                                    </div>

                                                    {/* Progress */}
                                                    <div className="relative h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                        <div
                                                            className={`
                                                                absolute
                                                                top-0
                                                                h-full
                                                                rounded-full
                                                                bg-linear-to-r
                                                                from-emerald-300/20
                                                                to-emerald-300/80
                                                                transition-all
                                                                duration-1000
                                                                ease-in-out
                                                                ${
                                                                    isRTL
                                                                        ? 'right-0'
                                                                        : 'left-0'
                                                                }
                                                            `}
                                                            style={{
                                                                width: `${proficiency}%`,
                                                            }}
                                                        />
                                                    </div>

                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Hover Glow */}
                                    <div className="absolute inset-0 bg-linear-to-br from-emerald-300/0 to-emerald-300/5 group-hover:from-emerald-300/5 group-hover:to-emerald-300/5 rounded-2xl transition-all duration-300 pointer-events-none" />

                                </div>
                            </FadeIn>
                        )
                    )}

                </div>
            </div>
        </section>
    );
}

export default Skills;
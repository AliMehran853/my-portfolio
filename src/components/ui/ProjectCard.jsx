import React from 'react';

import {
    ExternalLink,
    TrendingUp,
} from 'lucide-react';

import { FaGithub } from 'react-icons/fa6';

import { useTranslation } from 'react-i18next';

function ProjectCard({ project }) {
    const { t, i18n } = useTranslation();

    const isRTL = i18n.language === 'fa';

    if (!project) return null;

    const {
        titleKey,
        descriptionKey,
        image = '',
        technologies = [],
        highlightKey,
        demoUrl = '',
        githubUrl = '',
        categoryKey,
    } = project;

    const title = titleKey
        ? t(titleKey)
        : '';

    const description = descriptionKey
        ? t(descriptionKey)
        : '';

    const highlight = highlightKey
        ? t(highlightKey)
        : '';

    const category = categoryKey
        ? t(`projects.categories.${categoryKey}`)
        : '';

    return (
        <article
            dir={isRTL ? 'rtl' : 'ltr'}
            className="group relative h-full bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-emerald-300/30 hover:bg-white/[0.07] transition-all duration-300"
        >

            {/* Image */}
            <div className="relative h-60 sm:h-64 overflow-hidden bg-white/5">

                {image ? (
                    <img
                        src={image}
                        alt={`${title} project preview`}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                ) : (
                    <div className="flex items-center justify-center w-full h-full text-white/30 text-sm">
                        {t('common.viewDemo')}
                    </div>
                )}

                {/* Image Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none" />

                {/* Category */}
                {category && (
                    <div
                        className={`absolute top-4 ${
                            isRTL
                                ? 'right-4'
                                : 'left-4'
                        }`}
                    >
                        <span className="inline-flex max-w-full px-3 py-1 text-xs font-medium text-white bg-black/40 backdrop-blur-sm border border-white/20 rounded-full break-words">
                            {category}
                        </span>
                    </div>
                )}

                {/* External Links */}
                {(demoUrl || githubUrl) && (
                    <div
                        className={`absolute bottom-4 ${
                            isRTL
                                ? 'left-4'
                                : 'right-4'
                        } flex items-center gap-2`}
                    >

                        {demoUrl && (
                            <a
                                href={demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${t(
                                    'common.viewDemo'
                                )}: ${title}`}
                                title={t(
                                    'common.viewDemo'
                                )}
                                className="flex items-center justify-center w-10 h-10 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 hover:bg-emerald-300/30 hover:border-emerald-300/50 hover:-translate-y-0.5 transition-all duration-300"
                            >
                                <ExternalLink className="w-4 h-4 text-white" />
                            </a>
                        )}

                        {githubUrl && (
                            <a
                                href={githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${t(
                                    'common.viewCode'
                                )}: ${title}`}
                                title={t(
                                    'common.viewCode'
                                )}
                                className="flex items-center justify-center w-10 h-10 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 hover:bg-emerald-300/30 hover:border-emerald-300/50 hover:-translate-y-0.5 transition-all duration-300"
                            >
                                <FaGithub className="w-4 h-4 text-white" />
                            </a>
                        )}

                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex flex-col h-full p-5 sm:p-6">

                {/* Title & Description */}
                <div className="min-w-0">

                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-emerald-300 transition-colors duration-300 break-words">
                        {title}
                    </h3>

                    <p className="text-white/60 text-sm leading-6 line-clamp-3 break-words">
                        {description}
                    </p>

                </div>

                {/* Technologies */}
                {technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                        {technologies.map(
                            (tech) => (
                                <span
                                    key={tech}
                                    className="px-3 py-1 text-xs font-medium text-emerald-300 bg-emerald-300/10 border border-emerald-300/20 rounded-lg hover:bg-emerald-300/20 transition-colors duration-200 break-words"
                                >
                                    {tech}
                                </span>
                            )
                        )}
                    </div>
                )}

                {/* Card Footer */}
                <div className="flex items-center justify-between gap-4 mt-5 pt-4 border-t border-white/10">

                    {/* Project Highlight */}
                    {highlight && (
                        <div className="flex items-start gap-2 min-w-0">

                            <TrendingUp className="w-4 h-4 mt-0.5 text-emerald-300 shrink-0" />

                            <p className="text-sm font-medium text-emerald-300 leading-5 break-words">
                                {highlight}
                            </p>

                        </div>
                    )}

                    {/* Footer Links */}
                    {(demoUrl || githubUrl) && (
                        <div className="flex items-center gap-2 shrink-0">

                            {demoUrl && (
                                <a
                                    href={demoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-emerald-300 transition-colors"
                                >
                                    <ExternalLink className="w-3.5 h-3.5" />

                                    {t('common.viewDemo')}
                                </a>
                            )}

                            {githubUrl && (
                                <a
                                    href={githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-emerald-300 transition-colors"
                                >
                                    <FaGithub className="w-3.5 h-3.5" />

                                    {t('common.viewCode')}
                                </a>
                            )}

                        </div>
                    )}
                </div>

            </div>
        </article>
    );
}

export default ProjectCard;
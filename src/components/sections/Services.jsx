import React from 'react';

import { Wrench } from 'lucide-react';
import * as Icons from 'lucide-react';

import { useTranslation } from 'react-i18next';

import { services } from '../../data/services';
import FadeIn from '../animations/FadeIn';

function Services() {

    const { t } = useTranslation();

    return (
        <section
            id="services"
            className="relative py-20 bg-black overflow-hidden"
        >
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl opacity-20" />

                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl opacity-20" />

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-300/10 rounded-full blur-3xl opacity-20" />
            </div>

            {/* Background Grid */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage:
                        'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
                    backgroundSize: '30px 30px',
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <FadeIn delay={0}>
                    <div className="text-center mb-16">

                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-300/10 border border-emerald-300/30 rounded-full mb-6">
                            <Wrench className="w-4 h-4 text-emerald-300" />

                            <span className="text-sm text-emerald-300 font-medium tracking-wider uppercase">
                                {t('services.badge')}
                            </span>
                        </div>

                        <h2 className="text-4xl lg:text-5xl font-normal text-white mb-4 max-w-2xl mx-auto leading-tight">
                            {t('services.title')}
                        </h2>

                        <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
                            {t('services.description')}
                        </p>
                    </div>
                </FadeIn>

                {/* Featured Services */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {services.slice(0, 2).map((service, index) => {

                        const IconComponent =
                            Icons[service.icon] ||
                            Icons.Code2;

                        return (
                            <FadeIn
                                key={service.id}
                                delay={100 + index * 100}
                            >
                                <div className="group relative h-full min-h-[280px] bg-white/5 border border-white/10 rounded-3xl p-7 sm:p-8 hover:border-emerald-300/30 hover:bg-white/[0.07] transition-all duration-300 flex flex-col">

                                    {/* Icon */}
                                    <div className="mb-6">
                                        <div className="w-16 h-16 rounded-2xl bg-emerald-300/10 border border-emerald-300/20 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                                            <IconComponent className="w-8 h-8 text-emerald-300" />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 group-hover:text-emerald-300 transition-colors duration-300 break-words">
                                            {t(service.titleKey)}
                                        </h3>

                                        <p className="text-white/60 leading-7 break-words">
                                            {t(service.descriptionKey)}
                                        </p>
                                    </div>

                                    {/* Hover Glow */}
                                    <div className="absolute inset-0 bg-linear-to-br from-emerald-300/0 to-emerald-300/0 group-hover:from-emerald-300/5 group-hover:to-emerald-300/5 rounded-3xl transition-all duration-300 pointer-events-none" />
                                </div>
                            </FadeIn>
                        );
                    })}
                </div>

                {/* Remaining Services */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.slice(2).map((service, index) => {

                        const IconComponent =
                            Icons[service.icon] ||
                            Icons.Code2;

                        return (
                            <FadeIn
                                key={service.id}
                                delay={300 + index * 100}
                            >
                                <div className="group relative h-full bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-emerald-300/30 hover:bg-white/[0.07] transition-all duration-300">

                                    {/* Icon */}
                                    <div className="mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-emerald-300/10 border border-emerald-300/20 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                                            <IconComponent className="w-6 h-6 text-emerald-300" />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="min-w-0">
                                        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-300 transition-colors duration-300 break-words">
                                            {t(service.titleKey)}
                                        </h3>

                                        <p className="text-sm text-white/60 leading-7 break-words">
                                            {t(service.descriptionKey)}
                                        </p>
                                    </div>

                                    {/* Hover Glow */}
                                    <div className="absolute inset-0 bg-linear-to-br from-emerald-300/0 to-emerald-300/0 group-hover:from-emerald-300/5 group-hover:to-emerald-300/5 rounded-2xl transition-all duration-300 pointer-events-none" />
                                </div>
                            </FadeIn>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}

export default Services;
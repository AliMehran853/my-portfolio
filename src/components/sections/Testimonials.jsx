import React, { useRef, useState } from 'react';

import {
    ChevronLeft,
    ChevronRight,
    Quote,
    Star,
} from 'lucide-react';

import { useTranslation } from 'react-i18next';

import { testimonials } from '../../data/testimonials';
import FadeIn from '../animations/FadeIn';

function Testimonials() {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'fa';

    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollContainerRef = useRef(null);

    const hasTestimonials = testimonials.length > 0;

    const scrollToIndex = (index) => {
        if (!hasTestimonials) return;
        const safeIndex = Math.min(Math.max(index, 0), testimonials.length - 1);
        setCurrentIndex(safeIndex);

        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const offset = container.offsetWidth * safeIndex;
            container.scrollTo({
                left: isRTL ? -offset : offset,
                behavior: 'smooth',
            });
        }
    };

    const nextTestimonial = () => {
        if (!hasTestimonials) return;
        const newIndex = currentIndex >= testimonials.length - 1 ? 0 : currentIndex + 1;
        scrollToIndex(newIndex);
    };

    const prevTestimonial = () => {
        if (!hasTestimonials) return;
        const newIndex = currentIndex <= 0 ? testimonials.length - 1 : currentIndex - 1;
        scrollToIndex(newIndex);
    };

    const testimonialStats = [
        { value: 'Project', label: 'Based Feedback' },
        { value: 'Real', label: 'Client Experience' },
        { value: 'Quality', label: 'Focused Work' },
        { value: '5★', label: 'Rating' },
    ];

    return (
        <section
            id="testimonials"
            dir={isRTL ? 'rtl' : 'ltr'}
            className="relative py-20 bg-black overflow-hidden"
        >
            {/* Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-emerald-300/10 opacity-90 blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <FadeIn delay={0}>
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-300/10 border border-emerald-300/30 rounded-full mb-6">
                            <Quote className="w-4 h-4 text-emerald-300" />
                            <span className="text-sm text-emerald-300 font-medium tracking-wider uppercase">
                                {t('testimonials.badge')}
                            </span>
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-normal text-white mb-4 max-w-2xl mx-auto">
                            {t('testimonials.title')}
                        </h2>
                        <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
                            {t('testimonials.description')}
                        </p>
                    </div>
                </FadeIn>

                {!hasTestimonials && (
                    <FadeIn delay={100}>
                        <div className="max-w-3xl mx-auto">
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 sm:p-10 text-center">
                                <div className="flex items-center justify-center w-14 h-14 mx-auto mb-5 rounded-full bg-emerald-300/10 border border-emerald-300/20">
                                    <Quote className="w-6 h-6 text-emerald-300" />
                                </div>
                                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                                    {t('testimonials.comingSoon')}
                                </h3>
                                <p className="text-white/55 leading-7 max-w-xl mx-auto">
                                    {t('testimonials.comingSoonDescription')}
                                </p>
                            </div>
                        </div>
                    </FadeIn>
                )}

                {hasTestimonials && (
                    <FadeIn delay={100}>
                        <div className="relative">
                            <div ref={scrollContainerRef} className="overflow-x-hidden scroll-smooth">
                                <div className="flex">
                                    {testimonials.map((testimonial, index) => (
                                        <div key={testimonial.id} className="w-full shrink-0 px-2 sm:px-4">
                                            <div className="max-w-4xl mx-auto">
                                                <div className="flex flex-col md:flex-row gap-6 items-stretch">
                                                    {/* Image */}
                                                    <div className="relative w-full md:w-1/3">
                                                        <div className="relative h-72 md:h-full min-h-[280px] rounded-2xl overflow-hidden">
                                                            <img
                                                                src={testimonial.image}
                                                                alt={t(testimonial.nameKey)}
                                                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                                            />
                                                            {/* Stat Badge */}
                                                            <div className="absolute bottom-4 left-4 right-4">
                                                                <div className="bg-black/60 backdrop-blur-md rounded-xl p-4 border border-white/10">
                                                                    <div className="text-2xl font-semibold text-emerald-300 mb-1">
                                                                        {testimonialStats[index]?.value}
                                                                    </div>
                                                                    <div className="text-sm font-medium text-white/80">
                                                                        {testimonialStats[index]?.label}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Quote */}
                                                    <div className="flex-1 flex flex-col justify-between py-2 md:py-4">
                                                        <div className="mb-8">
                                                            <Quote className="w-7 h-7 text-emerald-300 mb-4 opacity-50" />
                                                            <p className="text-lg md:text-xl text-white leading-relaxed text-justify">
                                                                "{t(testimonial.quoteKey)}"
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                                                            <div>
                                                                <div className="text-white font-medium mb-1">
                                                                    {t(testimonial.nameKey)}
                                                                </div>
                                                                <div className="text-white/60 text-sm">
                                                                    {t(testimonial.roleKey)}
                                                                    {t(testimonial.companyKey) ? `, ${t(testimonial.companyKey)}` : ''}
                                                                </div>
                                                            </div>
                                                            <div className="flex gap-1">
                                                                {Array.from({ length: testimonial.rating || 0 }).map((_, i) => (
                                                                    <Star key={i} className="w-4 h-4 fill-emerald-300 text-emerald-300" />
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Dots */}
                            <div className="flex items-center justify-center gap-2 mt-10">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => scrollToIndex(index)}
                                        aria-label={`Go to testimonial ${index + 1}`}
                                        className={`rounded-full transition-all duration-300 ${
                                            index === currentIndex ? 'bg-white w-6 h-2' : 'bg-white/30 w-2 h-2 hover:bg-white/60'
                                        }`}
                                    />
                                ))}
                            </div>

                            {/* Previous - در حالت فارسی منطق برعکس می‌شود */}
                            <button
                                type="button"
                                onClick={isRTL ? nextTestimonial : prevTestimonial}
                                aria-label={t('common.previous')}
                                className="flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 lg:-translate-x-4 items-center justify-center w-10 h-10 lg:w-12 lg:h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300 z-10"
                            >
                                <ChevronLeft className="w-6 h-6 text-white" />
                            </button>

                            {/* Next - در حالت فارسی منطق برعکس می‌شود */}
                            <button
                                type="button"
                                onClick={isRTL ? prevTestimonial : nextTestimonial}
                                aria-label={t('common.next')}
                                className="flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 lg:translate-x-4 items-center justify-center w-10 h-10 lg:w-12 lg:h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300 z-10"
                            >
                                <ChevronRight className="w-6 h-6 text-white" />
                            </button>
                        </div>
                    </FadeIn>
                )}
            </div>
        </section>
    );
}

export default Testimonials;
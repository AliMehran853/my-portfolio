import React, { useState } from 'react';

import {
    Mail,
    MapPin,
    Send,
    MessageSquare,
} from 'lucide-react';

import {
    FaGithub,
    FaLinkedinIn,
    FaXTwitter,
    FaWhatsapp,
} from 'react-icons/fa6';

import { useTranslation } from 'react-i18next';

import FadeIn from '../animations/FadeIn';
import { PERSONAL_INFO, SOCIAL_LINKES } from '../../utils/constants';

function Contact() {

    const { t } = useTranslation();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [status, setStatus] = useState({
        type: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            !formData.name ||
            !formData.email ||
            !formData.message
        ) {
            setStatus({
                type: 'error',
                message: t(
                    'contact.validation.fillAllFields'
                ),
            });
            return;
        }

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(formData.email)) {
            setStatus({
                type: 'error',
                message: t(
                    'contact.validation.invalidEmail'
                ),
            });
            return;
        }

        setStatus({
            type: 'success',
            message: t(
                'contact.validation.success'
            ),
        });

        setFormData({
            name: '',
            email: '',
            message: '',
        });

        setTimeout(() => {
            setStatus({
                type: '',
                message: '',
            });
        }, 5000);
    };

    const socialIcons = {
        github: FaGithub,
        linkedin: FaLinkedinIn,
        twitter: FaXTwitter,
        whatsapp: FaWhatsapp,
    };

    return (
        <section
            id="contact"
            className="relative py-20 bg-black overflow-hidden"
        >
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-300/20 opacity-30 rounded-full blur-3xl" />

                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-300/20 opacity-30 rounded-full blur-3xl" />

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-300/10 opacity-30 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <FadeIn delay={0}>
                    <div className="text-center mb-16">

                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-300/10 border border-emerald-300/30 rounded-full mb-6">
                            <MessageSquare className="w-4 h-4 text-emerald-300" />

                            <span className="text-sm text-emerald-300 font-medium tracking-wider uppercase">
                                {t('contact.badge')}
                            </span>
                        </div>

                        <h2 className="text-4xl lg:text-5xl font-normal text-white mb-4">
                            {t('contact.title')}
                        </h2>

                        <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
                            {t('contact.description')}
                        </p>
                    </div>
                </FadeIn>

                <div className="grid md:grid-cols-2 gap-12">

                    {/* Contact Form */}
                    <FadeIn delay={100}>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-6"
                            >

                                {/* Name */}
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-white/80 mb-2"
                                    >
                                        {t('contact.form.name')}
                                    </label>

                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder={t(
                                            'contact.form.namePlaceholder'
                                        )}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-300/30 focus:border-emerald-300/40 transition-all duration-300"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-white/80 mb-2"
                                    >
                                        {t('contact.form.email')}
                                    </label>

                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder={t(
                                            'contact.form.emailPlaceholder'
                                        )}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-300/30 focus:border-emerald-300/40 transition-all duration-300"
                                    />
                                </div>

                                {/* Message */}
                                <div>
                                    <label
                                        htmlFor="message"
                                        className="block text-sm font-medium text-white/80 mb-2"
                                    >
                                        {t('contact.form.message')}
                                    </label>

                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={5}
                                        placeholder={t(
                                            'contact.form.messagePlaceholder'
                                        )}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-300/30 focus:border-emerald-300/40 transition-all duration-300"
                                    />
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    className="w-full px-6 py-3.5 bg-emerald-400 text-black font-semibold rounded-xl hover:bg-emerald-300 hover:shadow-2xl hover:shadow-emerald-300/20 transition-all duration-300 flex items-center justify-center gap-2 group"
                                >
                                    <span>
                                        {t('contact.form.sendMessage')}
                                    </span>

                                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                </button>

                                {/* Status */}
                                {status.message && (
                                    <div
                                        className={`p-4 rounded-xl text-sm ${
                                            status.type === 'success'
                                                ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                                                : 'bg-red-500/10 border border-red-500/20 text-red-400'
                                        }`}
                                    >
                                        {status.message}
                                    </div>
                                )}
                            </form>
                        </div>
                    </FadeIn>

                    {/* Contact Information */}
                    <FadeIn delay={200}>
                        <div className="space-y-8">

                            {/* Intro */}
                            <div>
                                <h3 className="text-2xl font-semibold text-white mb-4">
                                    {t('contact.info.title')}
                                </h3>

                                <p className="text-white/60 leading-relaxed max-w-xl">
                                    {t('contact.info.description')}
                                </p>
                            </div>

                            {/* Contact Cards */}
                            <div className="space-y-4">

                                {/* Email Card */}
                                <a
                                    href={`mailto:${PERSONAL_INFO.email}`}
                                    className="group relative block bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-emerald-300/30 hover:bg-white/[0.07] transition-all duration-300"
                                >
                                    <div className="flex items-start gap-4">

                                        <div className="p-3 bg-emerald-300/10 border border-emerald-300/20 rounded-xl">
                                            <Mail className="w-6 h-6 text-emerald-300" />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-white/50 mb-1">
                                                {t('contact.info.email')}
                                            </p>

                                            <p className="text-white font-medium break-all group-hover:text-emerald-300 transition-colors">
                                                {PERSONAL_INFO.email}
                                            </p>
                                        </div>
                                    </div>
                                </a>

                                {/* Location Card */}
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                    <div className="flex items-start gap-4">

                                        <div className="p-3 bg-emerald-300/10 border border-emerald-300/20 rounded-xl">
                                            <MapPin className="w-6 h-6 text-emerald-300" />
                                        </div>

                                        <div>
                                            <p className="text-sm text-white/50 mb-1">
                                                {t('contact.info.location')}
                                            </p>

                                            <p className="text-white font-medium">
                                                {PERSONAL_INFO.location}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* Social Links */}
                            <div>
                                <p className="text-sm text-white/50 mb-4">
                                    {t('contact.info.connectWithMe')}
                                </p>

                                <div className="flex flex-wrap gap-3">
                                    {Object.entries(SOCIAL_LINKES).map(
                                        ([platform, url]) => {
                                            const Icon =
                                                socialIcons[platform];

                                            if (!Icon || !url) return null;

                                            return (
                                                <a
                                                    key={platform}
                                                    href={url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label={`Connect with Ali on ${platform}`}
                                                    className="flex items-center justify-center w-12 h-12 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-emerald-300/40 hover:-translate-y-1 transition-all duration-300 group"
                                                >
                                                    <Icon className="w-5 h-5 text-white/60 group-hover:text-emerald-300 transition-colors duration-300" />
                                                </a>
                                            );
                                        }
                                    )}
                                </div>
                            </div>

                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
}

export default Contact;
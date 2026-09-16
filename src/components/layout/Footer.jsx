import React from 'react';

import {
    Heart,
    Mail,
    MapPin,
} from 'lucide-react';

import {
    FaGithub,
    FaLinkedinIn,
    FaWhatsapp,
    FaXTwitter,
} from 'react-icons/fa6';

import { useTranslation } from 'react-i18next';

import {
    PERSONAL_INFO,
    SOCIAL_LINKS,
    NAV_LINKS,
} from '../../utils/constants';

import {
    scrollToSection,
} from '../../hooks/useScrollSpy';

import FadeIn from '../animations/FadeIn';


const DISPLAY_NAME = 'Ali Mehran';


function Footer() {
    const { t } = useTranslation();

    const socialIcons = {
        github: FaGithub,
        linkedin: FaLinkedinIn,
        twitter: FaXTwitter,
        whatsapp: FaWhatsapp,
    };

    return (
        <footer className="relative overflow-hidden bg-black border-t border-white/10">

            {/* ==========================================
                Background Glow
            ========================================== */}

            <div className="absolute inset-0 pointer-events-none overflow-hidden">

                <div className="absolute -top-40 left-1/4 w-96 h-96 rounded-full bg-emerald-400/10 blur-3xl" />

                <div className="absolute -bottom-40 right-1/4 w-96 h-96 rounded-full bg-emerald-400/10 blur-3xl" />

            </div>


            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">

                    {/* ==========================================
                        About
                    ========================================== */}

                    <FadeIn delay={0}>
                        <div>

                            <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-wide mb-4">

                                <span className="bg-linear-to-r from-emerald-300 via-green-400 to-emerald-700 bg-clip-text text-transparent">

                                    <span className="hidden sm:inline">
                                        {DISPLAY_NAME}
                                    </span>

                                    <span className="sm:hidden">
                                        Ali
                                    </span>

                                </span>

                            </h3>


                            <p className="text-white/55 text-sm leading-7 max-w-sm mb-6">
                                {t('hero.description')}
                            </p>


                            <div className="space-y-3">

                                {/* Email */}

                                <a
                                    href={`mailto:${PERSONAL_INFO.email}`}
                                    className="group flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-emerald-300/30 transition-all duration-300"
                                >
                                    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-300/10 shrink-0">
                                        <Mail className="w-4 h-4 text-emerald-300" />
                                    </div>

                                    <span className="font-mono-tech text-xs sm:text-sm text-white/65 group-hover:text-white transition-colors break-all">
                                        {PERSONAL_INFO.email}
                                    </span>

                                </a>


                                {/* Location */}

                                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10">

                                    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-300/10 shrink-0">
                                        <MapPin className="w-4 h-4 text-emerald-300" />
                                    </div>

                                    <span className="text-sm text-white/65">
                                        {PERSONAL_INFO.location}
                                    </span>

                                </div>

                            </div>

                        </div>
                    </FadeIn>


                    {/* ==========================================
                        Quick Links
                    ========================================== */}

                    <FadeIn delay={100}>
                        <div>

                            <h4 className="text-lg font-semibold tracking-wide text-white mb-6">
                                {t('footer.quickLinks')}
                            </h4>


                            <ul className="space-y-3">

                                {NAV_LINKS.map((link) => (
                                    <li key={link.id}>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                scrollToSection(link.id)
                                            }
                                            className="group flex items-center gap-3 text-sm text-white/55 hover:text-emerald-300 tracking-wide transition-colors duration-300"
                                        >

                                            <span className="w-1.5 h-1.5 rounded-full bg-white/25 group-hover:bg-emerald-300 transition-colors duration-300" />

                                            <span>
                                                {t(link.labelKey)}
                                            </span>

                                        </button>

                                    </li>
                                ))}

                            </ul>

                        </div>
                    </FadeIn>


                    {/* ==========================================
                        Social
                    ========================================== */}

                    <FadeIn delay={200}>
                        <div>

                            <h4 className="text-lg font-semibold tracking-wide text-white mb-6">
                                {t('footer.connectWithMe')}
                            </h4>


                            <p className="text-sm text-white/55 leading-7 max-w-sm mb-6">
                                {t('footer.connectDescription')}
                            </p>


                            <div className="flex flex-wrap gap-3">

                                {Object.entries(SOCIAL_LINKS).map(
                                    ([platform, url]) => {
                                        const Icon =
                                            socialIcons[platform];

                                        if (!Icon || !url) {
                                            return null;
                                        }

                                        return (
                                            <a
                                                key={platform}
                                                href={url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={`Connect with Ali on ${platform}`}
                                                className="group flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 hover:bg-emerald-300/10 hover:border-emerald-300/40 hover:-translate-y-1 transition-all duration-300"
                                            >
                                                <Icon className="w-5 h-5 text-white/55 group-hover:text-emerald-300 transition-colors duration-300" />
                                            </a>
                                        );
                                    }
                                )}

                            </div>

                        </div>
                    </FadeIn>

                </div>


                {/* ==========================================
                    Bottom
                ========================================== */}

                <FadeIn delay={300}>

                    <div className="mt-12 pt-7 border-t border-white/10">

                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

                            <p className="font-mono-tech text-[11px] sm:text-xs text-white/40 text-center md:text-left">
                                © {new Date().getFullYear()} {DISPLAY_NAME}.{' '}
                                {t('footer.allRightsReserved')}
                            </p>


                            <p className="font-mono-tech flex items-center gap-2 text-[11px] sm:text-xs text-white/40 text-center">

                                <span>
                                    {t('footer.builtWith')}
                                </span>

                                <Heart className="w-4 h-4 text-emerald-300 fill-emerald-300 animate-pulse" />

                            </p>

                        </div>

                    </div>

                </FadeIn>

            </div>

        </footer>
    );
}

export default Footer;

import React, { useEffect, useState } from 'react';

import {
    Code,
    Languages,
    Menu,
    X,
} from 'lucide-react';

import { useTranslation } from 'react-i18next';

import {
    NAV_LINKS,
} from '../../utils/constants';

import {
    scrollToSection,
    useScrollSpy,
} from '../../hooks/useScrollSpy';

import LiveClock from '../ui/LiveClock';

const DISPLAY_NAME = 'Ali Mehran';


function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const { t, i18n } = useTranslation();

    const activeSection = useScrollSpy(
        NAV_LINKS.map((link) => link.id)
    );

    const currentLanguage = i18n.language?.startsWith('fa')
        ? 'fa'
        : 'en';

    // ==========================================
    // Page Scroll
    // ==========================================

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        handleScroll();

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // ==========================================
    // Navigation
    // ==========================================

    const handleNavClick = (sectionId) => {
        scrollToSection(sectionId);
        setIsMenuOpen(false);
    };

    // ==========================================
    // Language Switch
    // ==========================================

    const handleLanguageChange = () => {
        const nextLanguage =
            currentLanguage === 'en'
                ? 'fa'
                : 'en';

        i18n.changeLanguage(nextLanguage);
        setIsMenuOpen(false);
    };

    return (
        <header
            className={`fixed top-0 right-0 z-[1000] w-full transition-all duration-300 ${
                isScrolled
                    ? 'bg-black/50 backdrop-blur-xl border-b border-white/10'
                    : 'bg-transparent'
            }`}
        >
            <nav className="max-w-[1320px] mx-auto px-5 py-4">
                <div className="flex items-center justify-between gap-4">

                    {/* ==========================================
                        Logo
                    ========================================== */}

                    <button
                        type="button"
                        onClick={() =>
                            window.scrollTo({
                                top: 0,
                                behavior: 'smooth',
                            })
                        }
                        className="flex items-center gap-3 shrink-0 group"
                        aria-label="Go to homepage"
                    >
                        <Code className="w-6 h-6 text-emerald-300 transition-transform duration-300 group-hover:rotate-6" />

                        <span className="font-display text-xl sm:text-2xl font-bold tracking-wide bg-linear-to-r from-emerald-300 via-green-400 to-emerald-700 bg-clip-text text-transparent">
                            <span className="hidden sm:inline">
                                {DISPLAY_NAME}
                            </span>

                            <span className="sm:hidden">
                                Ali
                            </span>
                        </span>
                    </button>


                    {/* ==========================================
                        Desktop Navigation
                        Laptop / Desktop only
                    ========================================== */}

                    <div className="hidden lg:flex items-center gap-6 lg:gap-8">

                        {NAV_LINKS.map((link) => (
                            <button
                                key={link.id}
                                type="button"
                                onClick={() =>
                                    handleNavClick(link.id)
                                }
                                className={`relative text-sm lg:text-base font-medium tracking-wide transition-colors duration-300 ${
                                    activeSection === link.id
                                        ? 'text-white'
                                        : 'text-white/65 hover:text-white'
                                }`}
                            >
                                {t(link.labelKey)}

                                {activeSection === link.id && (
                                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-300" />
                                )}
                            </button>
                        ))}

                    </div>


                    {/* ==========================================
                        Desktop Right Side
                        Laptop / Desktop only
                    ========================================== */}

                    <div className="hidden lg:flex items-center gap-3">

                        {/* Live Clock */}
                        <LiveClock />


                        {/* Language Switcher */}
                        <button
                            type="button"
                            onClick={handleLanguageChange}
                            aria-label={
                                currentLanguage === 'en'
                                    ? 'Switch to Persian'
                                    : 'Switch to English'
                            }
                            title={
                                currentLanguage === 'en'
                                    ? 'فارسی'
                                    : 'English'
                            }
                            className="group flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-emerald-300/10 hover:border-emerald-300/30 transition-all duration-300"
                        >
                            <Languages className="w-4 h-4 text-emerald-300 group-hover:rotate-6 transition-transform duration-300" />

                            <span className="font-mono-tech text-xs font-medium text-white/75 group-hover:text-white tracking-[0.14em]">
                                {currentLanguage === 'en'
                                    ? 'FA'
                                    : 'EN'}
                            </span>
                        </button>


                        {/* CTA */}
                        <button
                            type="button"
                            onClick={() =>
                                handleNavClick('contact')
                            }
                            className="px-6 lg:px-7 py-3 rounded-[16px] bg-white text-black font-medium text-sm lg:text-base tracking-wide border border-white hover:bg-white/90 transition-all duration-300"
                        >
                            {t('nav.hireMe')}
                        </button>

                    </div>


                    {/* ==========================================
                        Mobile / Tablet Menu Button
                    ========================================== */}

                    <button
                        type="button"
                        onClick={() =>
                            setIsMenuOpen((prev) => !prev)
                        }
                        className="lg:hidden p-2.5 rounded-lg text-white hover:bg-white/5 transition-colors"
                        aria-label={
                            isMenuOpen
                                ? t('common.closeMenu')
                                : t('common.openMenu')
                        }
                        aria-expanded={isMenuOpen}
                    >
                        {isMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>

                </div>
            </nav>


            {/* ==========================================
                Mobile / Tablet Menu
            ========================================== */}

            <div
                className={`lg:hidden overflow-hidden transition-all duration-300 ${
                    isMenuOpen
                        ? 'max-h-[800px] opacity-100'
                        : 'max-h-0 opacity-0'
                }`}
            >
                <div className="bg-black/95 backdrop-blur-xl border-t border-white/10 px-5 py-5">

                    {/* Mobile / Tablet Clock */}
                    <div className="flex justify-center mb-4">
                        <LiveClock />
                    </div>


                    {/* Mobile / Tablet Language Switcher */}
                    <button
                        type="button"
                        onClick={handleLanguageChange}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 mb-4 rounded-xl bg-white/5 border border-white/10 hover:bg-emerald-300/10 hover:border-emerald-300/20 transition-all duration-300"
                    >
                        <Languages className="w-4 h-4 text-emerald-300" />

                        <span className="font-mono-tech text-sm font-medium text-white/80 tracking-wide">
                            {currentLanguage === 'en'
                                ? 'فارسی'
                                : 'English'}
                        </span>
                    </button>


                    {/* Links */}
                    <div className="space-y-2">

                        {NAV_LINKS.map((link) => (
                            <button
                                key={link.id}
                                type="button"
                                onClick={() =>
                                    handleNavClick(link.id)
                                }
                                className={`w-full text-left px-4 py-3 rounded-xl font-medium tracking-wide transition-all duration-300 ${
                                    activeSection === link.id
                                        ? 'text-white bg-emerald-400/10 border border-emerald-300/10'
                                        : 'text-white/70 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                {t(link.labelKey)}
                            </button>
                        ))}

                    </div>


                    {/* Mobile / Tablet CTA */}
                    <button
                        type="button"
                        onClick={() =>
                            handleNavClick('contact')
                        }
                        className="w-full mt-4 px-6 py-3.5 rounded-xl bg-white text-black font-medium tracking-wide hover:bg-white/90 transition-colors"
                    >
                        {t('nav.hireMe')}
                    </button>

                </div>
            </div>

        </header>
    );
}

export default Navbar;


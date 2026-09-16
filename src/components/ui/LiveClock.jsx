import React, {
    useEffect,
    useRef,
    useState,
} from 'react';

import { createPortal } from 'react-dom';

import {
    CalendarDays,
    Clock3,
    X,
} from 'lucide-react';

import { useTranslation } from 'react-i18next';


function LiveClock() {
    const [currentTime, setCurrentTime] =
        useState(new Date());

    const [isOpen, setIsOpen] =
        useState(false);

    const clockRef =
        useRef(null);

    const { t, i18n } =
        useTranslation();

    // آرایه تبدیل ماه‌های ایرانی به افغانستانی
    const afghanMonthMapping = {
        'حمل': 'حمل',
        'اردیبهشت': 'ثور',
        'خرداد': 'جوزا',
        'تیر': 'سرطان',
        'مرداد': 'اسد',
        'شهریور': 'سنبله',
        'مهر': 'میزان',
        'آبان': 'عقرب',
        'آذر': 'قوس',
        'دی': 'جدی',
        'بهمن': 'دلو',
        'اسفند': 'حوت'
    };

    // ==========================================
    // Live Clock
    // ==========================================

    useEffect(() => {
        const updateTime = () => {
            setCurrentTime(new Date());
        };

        updateTime();

        const interval =
            setInterval(updateTime, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);


    // ==========================================
    // Lock Body Scroll
    // ==========================================

    useEffect(() => {
        if (!isOpen) return;

        const originalOverflow =
            document.body.style.overflow;

        const originalPaddingRight =
            document.body.style.paddingRight;

        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow =
                originalOverflow;

            document.body.style.paddingRight =
                originalPaddingRight;
        };
    }, [isOpen]);


    // ==========================================
    // Close on Outside Click
    // ==========================================

    useEffect(() => {
        if (!isOpen) return;

        const handlePointerDown = (event) => {
            if (
                clockRef.current &&
                clockRef.current.contains(event.target)
            ) {
                return;
            }

            const modal =
                document.getElementById(
                    'live-clock-modal'
                );

            if (
                modal &&
                modal.contains(event.target)
            ) {
                return;
            }

            setIsOpen(false);
        };

        document.addEventListener(
            'mousedown',
            handlePointerDown
        );

        return () => {
            document.removeEventListener(
                'mousedown',
                handlePointerDown
            );
        };
    }, [isOpen]);


    // ==========================================
    // Escape
    // ==========================================

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };

        document.addEventListener(
            'keydown',
            handleKeyDown
        );

        return () => {
            document.removeEventListener(
                'keydown',
                handleKeyDown
            );
        };
    }, [isOpen]);


    // ==========================================
    // Language
    // ==========================================

    const isRTL =
        i18n.language === 'fa';

    const timeLocale =
        isRTL
            ? 'fa-IR'
            : 'en-US';


    // ==========================================
    // Formatters
    // ==========================================

    const timeFormatter =
        new Intl.DateTimeFormat(
            timeLocale,
            {
                timeZone: 'Asia/Kabul',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
            }
        );

    const enDateFormatter =
        new Intl.DateTimeFormat(
            'en-US',
            {
                timeZone: 'Asia/Kabul',
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
            }
        );

    const formattedTime =
        timeFormatter.format(currentTime);

    // تابع تولید تاریخ افغانستانی (داینامیک و دقیق)
    const getAfghanDate = () => {
        const weekday = new Intl.DateTimeFormat('fa-IR', { weekday: 'long', timeZone: 'Asia/Kabul' }).format(currentTime);
        const day = new Intl.DateTimeFormat('fa-IR', { day: 'numeric', timeZone: 'Asia/Kabul' }).format(currentTime);
        const iranianMonth = new Intl.DateTimeFormat('fa-IR', { month: 'long', timeZone: 'Asia/Kabul' }).format(currentTime);
        const year = new Intl.DateTimeFormat('fa-IR', { year: 'numeric', timeZone: 'Asia/Kabul' }).format(currentTime);

        const afghanMonth = afghanMonthMapping[iranianMonth] || iranianMonth; // در صورت پیدا نشدن، همان ماه ایرانی برمی‌گردد

        return `${weekday}، ${day} ${afghanMonth} ${year}`;
    };

    const formattedDate = isRTL ? getAfghanDate() : enDateFormatter.format(currentTime);


    // ==========================================
    // Kabul Time
    // ==========================================

    const hours =
        Number(
            new Intl.DateTimeFormat(
                'en-US',
                {
                    timeZone: 'Asia/Kabul',
                    hour: 'numeric',
                    hour12: false,
                }
            ).format(currentTime)
        );

    const minutes =
        Number(
            new Intl.DateTimeFormat(
                'en-US',
                {
                    timeZone: 'Asia/Kabul',
                    minute: 'numeric',
                }
            ).format(currentTime)
        );

    const seconds =
        Number(
            new Intl.DateTimeFormat(
                'en-US',
                {
                    timeZone: 'Asia/Kabul',
                    second: 'numeric',
                }
            ).format(currentTime)
        );

    const hourAngle =
        (hours % 12) * 30 +
        minutes * 0.5;

    const minuteAngle =
        minutes * 6 +
        seconds * 0.1;

    const secondAngle =
        seconds * 6;


    // ==========================================
    // Analog Clock
    // ==========================================

    const AnalogClock = () => {
        return (
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 shrink-0 rounded-full border border-emerald-300/20 bg-black/70 shadow-[0_0_50px_rgba(52,211,153,0.08)]">

                {/* Inner Ring */}
                <div className="absolute inset-1 rounded-full border border-white/5 bg-emerald-300/[0.02]" />

                {/* Markers */}
                {Array.from({ length: 12 }).map(
                    (_, index) => {
                        const angle =
                            index * 30;

                        return (
                            <span
                                key={index}
                                className="absolute left-1/2 top-1/2"
                                style={{
                                    width: '3px',
                                    height:
                                        index % 3 === 0
                                            ? '9px'
                                            : '5px',
                                    borderRadius:
                                        '9999px',
                                    background:
                                        index % 3 === 0
                                            ? 'rgba(110,231,183,0.9)'
                                            : 'rgba(255,255,255,0.28)',
                                    transform: `
                                        translate(-50%, -50%)
                                        rotate(${angle}deg)
                                        translateY(-76px)
                                    `,
                                }}
                            />
                        );
                    }
                )}

                {/* Hour Hand */}
                <span
                    className="absolute left-1/2 bottom-1/2 w-[4px] h-[48px] -translate-x-1/2 rounded-full bg-white"
                    style={{
                        transformOrigin:
                            '50% 100%',
                        transform:
                            `rotate(${hourAngle}deg)`,
                    }}
                />

                {/* Minute Hand */}
                <span
                    className="absolute left-1/2 bottom-1/2 w-[3px] h-[62px] -translate-x-1/2 rounded-full bg-emerald-300"
                    style={{
                        transformOrigin:
                            '50% 100%',
                        transform:
                            `rotate(${minuteAngle}deg)`,
                    }}
                />

                {/* Second Hand */}
                <span
                    className="absolute left-1/2 bottom-1/2 w-[2px] h-[72px] -translate-x-1/2 rounded-full bg-emerald-400"
                    style={{
                        transformOrigin:
                            '50% 100%',
                        transform:
                            `rotate(${secondAngle}deg)`,
                    }}
                />

                {/* Center */}
                <span className="absolute left-1/2 top-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(110,231,183,0.7)]" />
            </div>
        );
    };


    // ==========================================
    // Modal
    // ==========================================

    const modal = isOpen ? (
        <div
            id="live-clock-modal"
            className="fixed inset-0 z-[999999] overflow-hidden"
            dir={isRTL ? 'rtl' : 'ltr'}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-[6px] animate-clock-backdrop"
                onClick={() =>
                    setIsOpen(false)
                }
            />

            {/* Center */}
            <div className="relative z-10 flex items-start justify-center w-full h-full px-4 py-6 sm:py-10">

                {/* Modal Box */}
                <div className="w-full max-w-[400px] h-[min(680px,calc(100dvh-3rem))] sm:h-[min(680px,calc(100dvh-5rem))] animate-clock-pop">

                    <div
                        className="relative flex flex-col h-full overflow-hidden rounded-3xl border border-white/10 bg-black/95 backdrop-blur-2xl shadow-[0_25px_100px_rgba(0,0,0,0.75)]"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >

                        {/* Glow */}
                        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-emerald-300/10 blur-3xl pointer-events-none" />


                        {/* Header */}
                        <div className="relative z-20 shrink-0 flex items-center justify-between px-5 py-4 border-b border-white/10 bg-black/80 backdrop-blur-xl">

                            <div className="flex items-center gap-3 min-w-0">

                                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-300/10 border border-emerald-300/20 shrink-0">
                                    <Clock3 className="w-5 h-5 text-emerald-300" />
                                </div>

                                <div className="min-w-0">
                                    <p className="text-sm font-semibold text-white">
                                        {t(
                                            'clock.currentTime'
                                        )}
                                    </p>

                                    <p className="font-mono-tech text-[11px] text-white/40 truncate">
                                        {t(
                                            'clock.kabul'
                                        )}
                                    </p>
                                </div>

                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    setIsOpen(false)
                                }
                                aria-label={t(
                                    'clock.closeDetails'
                                )}
                                className="flex items-center justify-center w-8 h-8 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors shrink-0"
                            >
                                <X className="w-4 h-4" />
                            </button>

                        </div>


                        {/* Scrollable Content */}
                        <div className="relative flex-1 min-h-0 overflow-y-auto overscroll-contain">

                            {/* Clock */}
                            <div className="flex flex-col items-center px-5 py-7">

                                <AnalogClock />

                                <p className="font-mono-tech mt-6 text-3xl sm:text-4xl font-medium text-white tabular-nums tracking-tight text-center">
                                    {formattedTime}
                                </p>

                                <div className="flex items-center gap-2 mt-3">

                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />

                                    <span className="font-mono-tech text-[11px] text-emerald-300 font-medium uppercase tracking-[0.18em]">
                                        {t(
                                            'clock.live'
                                        )}
                                    </span>

                                </div>

                            </div>


                            {/* Details */}
                            <div className="px-5 pb-6 space-y-3">

                                {/* Date */}
                                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10">

                                    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 shrink-0">
                                        <CalendarDays className="w-4 h-4 text-emerald-300" />
                                    </div>

                                    {/* اضافه کردن dir برای راست چین شدن در حالت فارسی */}
                                    <div className="min-w-0" dir={isRTL ? 'rtl' : 'ltr'}>

                                        <p className="font-mono-tech text-[10px] text-white/35 uppercase tracking-[0.14em]">
                                            {t(
                                                'clock.date'
                                            )}
                                        </p>

                                        <p className="font-mono-tech text-sm text-white/80 mt-0.5 break-words">
                                            {formattedDate}
                                        </p>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : null;


    return (
        <>
            {/* Trigger */}
            <div
                ref={clockRef}
                className="relative"
            >
                <button
                    type="button"
                    onClick={() =>
                        setIsOpen((prev) => !prev)
                    }
                    aria-expanded={isOpen}
                    aria-haspopup="dialog"
                    aria-label={t(
                        'clock.openDetails'
                    )}
                    className={`group flex items-center gap-2.5 px-4 py-2.5 rounded-xl border transition-all duration-300 ${
                        isOpen
                            ? 'bg-emerald-300/10 border-emerald-300/30'
                            : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                    }`}
                >
                    <Clock3 className="w-4 h-4 text-emerald-300 shrink-0" />

                    <time
                        dateTime={
                            currentTime.toISOString()
                        }
                        className="font-mono-tech text-sm font-medium text-white/85 tabular-nums tracking-tight"
                    >
                        {formattedTime}
                    </time>
                </button>
            </div>


            {/* Modal is rendered directly into body */}
            {typeof document !== 'undefined' &&
                createPortal(
                    modal,
                    document.body
                )}
        </>
    );
}

export default LiveClock;
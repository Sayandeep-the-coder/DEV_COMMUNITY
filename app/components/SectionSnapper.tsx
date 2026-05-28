"use client";

import { ReactNode, useEffect, useRef } from "react";

export default function SectionSnapper({ children }: { children: ReactNode }) {
    const isSnappingRef = useRef(false);
    const lastWheelTimeRef = useRef(0);

    useEffect(() => {
        const getSections = () => Array.from(document.querySelectorAll<HTMLElement>(".page-section"));
        let sections = getSections();

        const refreshSections = () => {
            sections = getSections();
        };

        // Debounce rapid wheel events
        const wheelHandler = (e: WheelEvent) => {
            if (!sections.length) return;
            const now = Date.now();
            if (now - lastWheelTimeRef.current < 80) return;
            lastWheelTimeRef.current = now;

            if (isSnappingRef.current) return;
            const delta = e.deltaY;
            const currentScroll = (document.scrollingElement && document.scrollingElement.scrollTop) || window.scrollY || window.pageYOffset;
            // find current index by nearest section top
            let currentIndex = 0;
            let minDiff = Infinity;
            for (let i = 0; i < sections.length; i++) {
                const top = sections[i].offsetTop;
                const diff = Math.abs(top - currentScroll);
                if (diff < minDiff) {
                    minDiff = diff;
                    currentIndex = i;
                }
            }

            let targetIndex = currentIndex + (delta > 0 ? 1 : -1);
            targetIndex = Math.max(0, Math.min(sections.length - 1, targetIndex));
            if (targetIndex === currentIndex) return;

            isSnappingRef.current = true;
            // prevent other scroll handlers (Lenis) from handling this wheel
            try { e.stopImmediatePropagation(); } catch (err) { }
            try { e.preventDefault(); } catch (err) { }
            // scroll using Lenis if available, otherwise native
            const target = sections[targetIndex];
            const targetTop = target.offsetTop;

            const finishSnap = () => {
                // wait for section animation signal or timeout
                let unlocked = false;
                const onDone = (ev: Event) => {
                    const detail: any = (ev as CustomEvent).detail || {};
                    if (!detail.id || detail.id === target.id || detail.selector === `#${target.id}`) {
                        if (unlocked) return;
                        unlocked = true;
                        window.removeEventListener("section:animation:done", onDone as EventListener);
                        isSnappingRef.current = false;
                    }
                };
                window.addEventListener("section:animation:done", onDone as EventListener);
                // fallback unlock after 1500ms
                setTimeout(() => {
                    if (!unlocked) {
                        unlocked = true;
                        window.removeEventListener("section:animation:done", onDone as EventListener);
                        isSnappingRef.current = false;
                    }
                }, 1500);
            };

            const lenis = (window as any).lenis;
            if (lenis && typeof lenis.scrollTo === "function") {
                lenis.scrollTo(targetTop, { duration: 0.8, easing: (t: number) => t });
                // wait for lenis to finish - approximate with timeout
                setTimeout(finishSnap, 1000);
            } else {
                window.scrollTo({ top: targetTop, behavior: "smooth" });
                setTimeout(finishSnap, 1000);
            }

            e.preventDefault();
        };

        // Touch support: detect swipe
        let touchStartY = 0;
        const touchStart = (e: TouchEvent) => {
            touchStartY = e.touches[0].clientY;
        };
        const touchEnd = (e: TouchEvent) => {
            const touchEndY = e.changedTouches[0].clientY;
            const delta = touchStartY - touchEndY;
            if (Math.abs(delta) > 40) {
                // create a fake WheelEvent-like object
                wheelHandler(new WheelEvent("wheel", { deltaY: delta }));
            }
        };

        // Recalculate sections on resize
        const resizeHandler = () => {
            refreshSections();
        };

        window.addEventListener("wheel", wheelHandler, { passive: false, capture: true });
        window.addEventListener("touchstart", touchStart, { passive: true });
        window.addEventListener("touchend", touchEnd, { passive: true });
        window.addEventListener("resize", resizeHandler);

        // Cleanup
        return () => {
            window.removeEventListener("wheel", wheelHandler as EventListener, { capture: true } as any);
            window.removeEventListener("touchstart", touchStart as EventListener);
            window.removeEventListener("touchend", touchEnd as EventListener);
            window.removeEventListener("resize", resizeHandler);
        };
    }, []);

    return <>{children}</>;
}

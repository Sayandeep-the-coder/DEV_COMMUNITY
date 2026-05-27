"use client";

import React, { useLayoutEffect, useEffect, useRef, useCallback } from 'react';
import type { ReactNode } from 'react';
import Lenis from 'lenis';

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({ children, itemClassName = '' }) => (
  <div
    className={`scroll-stack-card relative w-full my-8 p-12 rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] box-border origin-top will-change-transform ${itemClassName}`.trim()}
    style={{
      backfaceVisibility: 'hidden',
      transformStyle: 'preserve-3d'
    }}
  >
    {children}
  </div>
);

interface ScrollStackProps {
  className?: string;
  children: ReactNode;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const lastTransformsRef = useRef(new Map<number, any>());
  const isUpdatingRef = useRef(false);
  const hasMeasuredOnScrollRef = useRef(false);

  // Cached layout measurements to prevent layout thrashing
  const cardOffsetsRef = useRef<number[]>([]);
  const endElementOffsetRef = useRef<number>(0);
  const containerHeightRef = useRef<number>(0);

  // Ref to hold the latest dynamic props so callbacks don't need to rebuild
  const propsRef = useRef({
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    onStackComplete
  });

  // Keep props ref updated on every render
  propsRef.current = {
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    onStackComplete
  };

  const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value as string);
  }, []);

  const getScrollTop = useCallback(() => {
    if (useWindowScroll) {
      return window.scrollY;
    } else {
      return scrollerRef.current ? scrollerRef.current.scrollTop : 0;
    }
  }, [useWindowScroll]);

  const queryCards = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return [];
    
    const cards = Array.from(
      scroller.querySelectorAll('.scroll-stack-card')
    ) as HTMLElement[];
    
    cardsRef.current = cards;
    return cards;
  }, []);

  const getUntransformedOffset = useCallback(
    (element: HTMLElement, appliedTranslateY: number = 0) => {
      if (useWindowScroll) {
        const elementRect = element.getBoundingClientRect();
        const offsetInScroller = elementRect.top + window.scrollY;
        return offsetInScroller - appliedTranslateY;
      } else {
        return element.offsetTop;
      }
    },
    [useWindowScroll]
  );

  const measureLayout = useCallback(() => {
    const cards = queryCards();
    if (!cards.length) return;

    // Temporarily clear active styling transforms and filters so getBoundingClientRect() returns clean untransformed offsets
    // only if useWindowScroll is true (since offsetTop is unaffected by transforms!)
    let activeTransforms: string[] = [];
    let activeFilters: string[] = [];

    if (useWindowScroll) {
      activeTransforms = cards.map(card => card ? card.style.transform : '');
      activeFilters = cards.map(card => card ? card.style.filter : '');

      cards.forEach(card => {
        if (card) {
          card.style.transform = '';
          card.style.filter = '';
        }
      });
    }

    // Get container height
    let height = 0;
    if (useWindowScroll) {
      height = window.innerHeight;
    } else {
      height = scrollerRef.current ? scrollerRef.current.clientHeight : 0;
    }
    containerHeightRef.current = height;

    // Get end element offset
    const endElement = scrollerRef.current?.querySelector('.scroll-stack-end') as HTMLElement | null;

    if (endElement) {
      endElementOffsetRef.current = getUntransformedOffset(endElement, 0);
    } else {
      endElementOffsetRef.current = 0;
    }

    // Get card offsets
    cardOffsetsRef.current = cards.map((card) => {
      return card ? getUntransformedOffset(card, 0) : 0;
    });

    // Restore transforms immediately if cleared
    if (useWindowScroll) {
      cards.forEach((card, i) => {
        if (card) {
          card.style.transform = activeTransforms[i] || '';
          card.style.filter = activeFilters[i] || '';
        }
      });
    }
  }, [useWindowScroll, getUntransformedOffset, queryCards]);

  const updateCardTransforms = useCallback(() => {
    const cards = cardsRef.current;
    if (!cards.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    // Ensure layout is measured at least once (e.g. on the first scroll frame or mount)
    if (!hasMeasuredOnScrollRef.current || containerHeightRef.current === 0) {
      hasMeasuredOnScrollRef.current = true;
      measureLayout();
    }

    const scrollTop = getScrollTop();
    const containerHeight = containerHeightRef.current;
    
    const {
      itemScale,
      itemStackDistance,
      stackPosition,
      scaleEndPosition,
      baseScale,
      rotationAmount,
      blurAmount,
      onStackComplete
    } = propsRef.current;

    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);
    const endElementTop = endElementOffsetRef.current;

    cards.forEach((card, i) => {
      if (!card) return;

      const cardTop = cardOffsetsRef.current[i] || 0;
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
      const pinEnd = endElementTop - containerHeight / 2;

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < cards.length; j++) {
          const jCardTop = cardOffsetsRef.current[j] || 0;
          const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j;
          if (scrollTop >= jTriggerStart) {
            topCardIndex = j;
          }
        }

        if (i < topCardIndex) {
          const depthInStack = topCardIndex - i;
          blur = Math.max(0, depthInStack * blurAmount);
        }
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

      if (hasChanged) {
        const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';

        card.style.transform = transform;
        card.style.filter = filter;

        lastTransformsRef.current.set(i, newTransform);
      }

      if (i === cards.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    getScrollTop,
    calculateProgress,
    parsePercentage,
    measureLayout
  ]);

  const setupLenis = useCallback(() => {
    const handleScroll = () => {
      updateCardTransforms();
    };

    if (useWindowScroll) {
      const lenis = new Lenis({
        duration: 1.2,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
        infinite: false,
        wheelMultiplier: 1,
        lerp: 0.1,
        syncTouch: true,
        syncTouchLerp: 0.075
      });

      lenis.on('scroll', handleScroll);

      const raf = (time: number) => {
        lenis.raf(time);
        animationFrameRef.current = requestAnimationFrame(raf);
      };
      animationFrameRef.current = requestAnimationFrame(raf);

      lenisRef.current = lenis;
      return lenis;
    } else {
      const scroller = scrollerRef.current;
      const inner = innerRef.current;
      if (!scroller || !inner) return;

      const lenis = new Lenis({
        wrapper: scroller,
        content: inner,
        duration: 1.2,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
        infinite: false,
        gestureOrientation: 'vertical',
        wheelMultiplier: 1,
        lerp: 0.1,
        syncTouch: true,
        syncTouchLerp: 0.075
      });

      lenis.on('scroll', handleScroll);

      const raf = (time: number) => {
        lenis.raf(time);
        animationFrameRef.current = requestAnimationFrame(raf);
      };
      animationFrameRef.current = requestAnimationFrame(raf);

      lenisRef.current = lenis;
      return lenis;
    }
  }, [useWindowScroll, updateCardTransforms]);

  // Main setup effect
  useLayoutEffect(() => {
    if (!useWindowScroll && !scrollerRef.current) return;

    const cards = queryCards();

    const { itemDistance } = propsRef.current;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = 'transform, filter';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.transform = 'translateZ(0)';
      card.style.webkitTransform = 'translateZ(0)';
      card.style.perspective = '1000px';
      card.style.webkitPerspective = '1000px';
    });

    setupLenis();

    // Reset scroll measure flag so we capture accurate layouts after hydration
    hasMeasuredOnScrollRef.current = false;

    // Measure layout initially
    measureLayout();

    updateCardTransforms();

    // Setup window resize listener for robust layout updates without ResizeObserver loops
    const handleResize = () => {
      hasMeasuredOnScrollRef.current = false;
      measureLayout();
      updateCardTransforms();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      window.removeEventListener('resize', handleResize);
      stackCompletedRef.current = false;
      cardsRef.current = [];
      lastTransformsRef.current.clear();
      isUpdatingRef.current = false;
    };
  }, [useWindowScroll, setupLenis, measureLayout, updateCardTransforms, queryCards]);

  // Handle updates to itemDistance without tearing down Lenis
  useEffect(() => {
    const cards = cardsRef.current;
    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
    });
    hasMeasuredOnScrollRef.current = false;
    measureLayout();
    updateCardTransforms();
  }, [itemDistance, measureLayout, updateCardTransforms]);

  // Handle dynamic style prop updates while the scroll position is static
  useEffect(() => {
    updateCardTransforms();
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    updateCardTransforms
  ]);

  return (
    <div
      className={`relative w-full ${useWindowScroll ? 'h-auto' : 'h-full overflow-y-auto overflow-x-visible'} ${className}`.trim()}
      ref={scrollerRef}
      style={{
        overscrollBehavior: useWindowScroll ? 'auto' : 'contain',
        WebkitOverflowScrolling: 'touch',
        WebkitTransform: 'translateZ(0)',
        transform: 'translateZ(0)',
        willChange: useWindowScroll ? 'auto' : 'scroll-position'
      }}
    >
      <div className={`scroll-stack-inner px-20 ${useWindowScroll ? 'pt-4 pb-16' : 'pt-[20vh] pb-[50rem] min-h-screen'}`} ref={innerRef}>
        {children}
        {/* Spacer so the last pin can release cleanly */}
        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  );
};

export default ScrollStack;

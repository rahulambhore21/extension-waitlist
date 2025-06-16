"use client";

import { useEffect, useRef } from 'react';

export default function SplineViewer() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const updateIframeSize = () => {
      if (iframeRef.current) {
        const parent = iframeRef.current.parentElement;
        if (parent) {
          iframeRef.current.style.height = `${parent.offsetHeight}px`;
          iframeRef.current.style.width = `${parent.offsetWidth}px`;
        }
      }
    };

    window.addEventListener('resize', updateIframeSize);
    updateIframeSize();

    return () => window.removeEventListener('resize', updateIframeSize);
  }, []);

  return (
    <iframe
      ref={iframeRef}
      src="https://my.spline.design/genkubgreetingrobot-S6i4mk4BYxNnOHwAdoG9BWFI/"
      frameBorder="0"
      className="w-full h-full absolute inset-0"
      style={{ pointerEvents: 'auto' }}
    />
  );
}
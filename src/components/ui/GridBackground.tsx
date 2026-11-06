"use client";

import React from 'react';

/**
 * A solid, clean off-white background matching the aesthetic of jaimec.co.
 */
const GridBackground: React.FC = () => {
    return (
        <div className="fixed inset-0 z-0 bg-[#faf9f6] dark:bg-[#050505] transition-colors duration-300" aria-hidden="true" />
    );
};

export default GridBackground;


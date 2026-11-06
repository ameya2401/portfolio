"use client";

import React, { useRef, useEffect, useState } from 'react';

interface AsciiBadgeProps {
    children: React.ReactNode;
    accentColor?: string; // Hex color for the hover spotlight, e.g. '#facc15'
    className?: string;
}

const charSet = "010101XYZ#*+=-:/\\?%&@$".split("");

const hexToRgb = (hex: string) => {
    const cleaned = hex.replace('#', '');
    const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(cleaned);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 161, g: 161, b: 170 }; // default gray
};

const AsciiBadge: React.FC<AsciiBadgeProps> = ({
    children,
    accentColor = '#a1a1aa',
    className = ''
}) => {
    const containerRef = useRef<HTMLSpanElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef<{ x: number; y: number | null }>({ x: 0, y: null });
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let width = 0;
        let height = 0;
        let cols = 0;
        let rows = 0;
        let grid: string[] = [];

        const cellWidth = 7;
        const cellHeight = 7;

        const resize = () => {
            const rect = container.getBoundingClientRect();
            width = rect.width;
            height = rect.height;

            const dpr = window.devicePixelRatio || 1;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);

            cols = Math.ceil(width / cellWidth);
            rows = Math.ceil(height / cellHeight);

            // Populate initial grid
            grid = [];
            for (let i = 0; i < cols * rows; i++) {
                grid.push(charSet[Math.floor(Math.random() * charSet.length)]);
            }
        };

        resize();

        const resizeObserver = new ResizeObserver(() => {
            resize();
        });
        resizeObserver.observe(container);

        const render = () => {
            ctx.clearRect(0, 0, width, height);

            const isDark = document.documentElement.classList.contains('dark');
            const rgb = hexToRgb(accentColor);
            
            // Subtle ambient opacity for off-hover state
            const baseAlpha = isDark ? 0.07 : 0.04;
            
            ctx.font = "5.5px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;
            const hasMouse = my !== null;

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const idx = r * cols + c;

                    // Light shimmering by updating characters randomly
                    if (Math.random() < 0.015) {
                        grid[idx] = charSet[Math.floor(Math.random() * charSet.length)];
                    }

                    const cx = c * cellWidth + cellWidth / 2;
                    const cy = r * cellHeight + cellHeight / 2;

                    let charOpacity = baseAlpha;
                    let textColor = isDark 
                        ? `rgba(161, 161, 170, ${charOpacity})` 
                        : `rgba(113, 113, 122, ${charOpacity})`;

                    if (hasMouse) {
                        const distance = Math.hypot(cx - mx, cy - my);
                        const maxRadius = 38; // Reveal size around mouse cursor

                        if (distance < maxRadius) {
                            const factor = 1 - distance / maxRadius;
                            const easeFactor = factor * factor; // square for smoother dropoff
                            
                            // Boost opacity near cursor
                            charOpacity = baseAlpha + (0.50 - baseAlpha) * easeFactor;
                            
                            // Blend color into the accent color
                            textColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${charOpacity})`;
                        }
                    }

                    ctx.fillStyle = textColor;
                    ctx.fillText(grid[idx], cx, cy);
                }
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            cancelAnimationFrame(animationFrameId);
            resizeObserver.disconnect();
        };
    }, [accentColor]);

    const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        mouseRef.current = { x, y };
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        mouseRef.current = { x: 0, y: null };
    };

    // Calculate hover border color dynamically using inline styles
    const rgb = hexToRgb(accentColor);
    const borderStyle = isHovered 
        ? { borderColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.35)` } 
        : {};

    return (
        <span
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={borderStyle}
            className={`relative overflow-hidden px-3.5 py-1.5 rounded-full text-xs font-normal border cursor-default select-none transition-all duration-300 ${className}`}
        >
            {/* Canvas ASCII background */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
            />
            {/* Badge Content */}
            <span className="relative z-10 font-medium">
                {children}
            </span>
        </span>
    );
};

export default AsciiBadge;

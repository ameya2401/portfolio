import React from 'react';

interface BorderGridProps {
    children: React.ReactNode[];
    columns?: 1 | 2 | 3;
    className?: string;
}

const BorderGrid: React.FC<BorderGridProps> = ({ children, columns = 2, className = '' }) => {
    // Grid configuration based on columns
    const gridCols = {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-3',
    };

    return (
        <div className={`grid ${gridCols[columns]} ${className}`}>
            {children.map((child, index) => (
                <div
                    key={index}
                    className="relative border border-zinc-200/80 dark:border-white/5 p-8 group transition-colors hover:bg-black/[0.015] dark:hover:bg-white/[0.02]"
                >
                    {/* Content */}
                    {child}
                </div>
            ))}
        </div>
    );
};

export default BorderGrid;

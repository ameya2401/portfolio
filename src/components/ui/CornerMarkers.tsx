import React from 'react';

interface CornerMarkersProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    color?: string;
}

/**
 * Decorative corner crosshair markers.
 * Wrap this around any element to add + markers at each corner.
 */
const CornerMarkers: React.FC<CornerMarkersProps> = ({
    className = '',
    size = 'md',
    color = 'text-white/20'
}) => {
    const sizeMap = {
        sm: 'text-[8px]',
        md: 'text-[10px]',
        lg: 'text-xs',
    };

    const fontSize = sizeMap[size];
    const baseClass = `absolute font-mono ${fontSize} ${color} select-none pointer-events-none`;

    return (
        <>
            {/* Top Left */}
            <span className={`${baseClass} -top-2 -left-2 ${className}`}>+</span>
            {/* Top Right */}
            <span className={`${baseClass} -top-2 -right-2 ${className}`}>+</span>
            {/* Bottom Left */}
            <span className={`${baseClass} -bottom-2 -left-2 ${className}`}>+</span>
            {/* Bottom Right */}
            <span className={`${baseClass} -bottom-2 -right-2 ${className}`}>+</span>
        </>
    );
};

export default CornerMarkers;

'use client';

import React, { forwardRef } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motionTransitions } from '@/lib/motion-tokens';

export type ButtonVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'destructive'
  | 'success'
  | 'link'
  | 'gradient';

export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

export interface ButtonProps
  extends Omit<HTMLMotionProps<'button'>, 'children'> {
  /** Visual presentation style */
  variant?: ButtonVariant;
  /** Dimension scale */
  size?: ButtonSize;
  /** Loading state displaying an animated spinner */
  isLoading?: boolean;
  /** Text or element displayed during loading */
  loadingText?: string;
  /** Icon placed before the button children */
  leftIcon?: React.ReactNode;
  /** Icon placed after the button children */
  rightIcon?: React.ReactNode;
  /** Expand button to fill 100% of container width */
  fullWidth?: boolean;
  /** Button content */
  children?: React.ReactNode;
  /** Optional href to render as link */
  href?: string;
  /** Link target e.g. '_blank' */
  target?: string;
  /** Rel attribute */
  rel?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  default:
    'bg-zinc-900 text-white hover:bg-zinc-800 hover:text-white dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100 dark:hover:text-zinc-950 shadow-sm border border-transparent font-medium cursor-pointer',
  primary:
    'bg-zinc-900 text-white hover:bg-zinc-800 hover:text-white dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100 dark:hover:text-zinc-950 shadow-sm border border-transparent font-medium cursor-pointer',
  secondary:
    'bg-zinc-100 dark:bg-zinc-800/90 border border-zinc-200/90 dark:border-zinc-700/60 text-zinc-900 dark:text-zinc-100 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/80 dark:hover:bg-zinc-700 cursor-pointer',
  outline:
    'bg-transparent border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer',
  ghost:
    'bg-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-transparent cursor-pointer',
  destructive:
    'bg-rose-500/10 border border-rose-500/30 text-rose-500 dark:text-rose-400 hover:bg-rose-500 hover:text-white cursor-pointer',
  success:
    'bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white cursor-pointer',
  link:
    'bg-transparent text-inherit underline-offset-4 hover:underline p-0 h-auto border-0 focus-ring shadow-none inline-flex cursor-pointer',
  gradient:
    'bg-zinc-900 text-white hover:text-white dark:bg-white dark:text-zinc-950 dark:hover:text-zinc-950 border border-white/10 dark:border-zinc-300 relative overflow-hidden cursor-pointer shadow-sm',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 px-3.5 text-xs rounded-full gap-1.5',
  md: 'h-9 px-4.5 text-sm rounded-full gap-2',
  lg: 'h-11 px-6 text-base rounded-full gap-2.5',
  icon: 'h-9 w-9 p-0 rounded-full justify-center shrink-0',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      loadingText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      className,
      children,
      type = 'button',
      href,
      target,
      rel = target === '_blank' ? 'noreferrer noopener' : undefined,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    const content = (
      <>
        {/* Subtle shimmer gradient for gradient variant */}
        {variant === 'gradient' && (
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"
            aria-hidden="true"
          />
        )}

        {/* Loading Spinner or Left Icon */}
        {isLoading ? (
          <Loader2 className={cn('animate-spin shrink-0', size === 'sm' ? 'w-3 h-3' : 'w-4 h-4')} />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}

        {/* Button Content */}
        {isLoading && loadingText ? (
          <span>{loadingText}</span>
        ) : (
          children && <span>{children}</span>
        )}

        {/* Right Icon */}
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </>
    );

    const commonClasses = cn(
      'relative inline-flex items-center justify-center font-medium select-none focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors duration-150',
      variantStyles[variant],
      variant !== 'link' && sizeStyles[size],
      variant !== 'link' && '!no-underline hover:!no-underline',
      fullWidth && 'w-full',
      isDisabled && 'opacity-30 cursor-not-allowed pointer-events-none',
      className
    );

    if (href) {
      return (
        <motion.a
          href={href}
          target={target}
          rel={rel}
          data-button="true"
          data-variant={variant}
          whileTap={isDisabled ? undefined : { scale: 0.97 }}
          whileHover={isDisabled ? undefined : { y: -1 }}
          transition={motionTransitions.springSnappy}
          className={commonClasses}
        >
          {content}
        </motion.a>
      );
    }

    return (
      <motion.button
        ref={ref}
        type={type}
        data-button="true"
        data-variant={variant}
        disabled={isDisabled}
        whileTap={isDisabled ? undefined : { scale: 0.97 }}
        whileHover={isDisabled ? undefined : { y: -1 }}
        transition={motionTransitions.springSnappy}
        aria-busy={isLoading}
        className={commonClasses}
        {...props}
      >
        {content}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;

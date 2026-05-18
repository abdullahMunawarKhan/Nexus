import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

const Input = forwardRef(({ label, error, className, ...props }, ref) => {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="block text-sm font-semibold text-slate-700 ml-1">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={twMerge(
          'w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-500/20 focus:border-black transition-all placeholder:text-slate-400',
          error ? 'border-black ring-1 ring-black' : '',
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-xs font-bold text-black ml-1">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;

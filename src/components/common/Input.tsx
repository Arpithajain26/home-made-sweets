import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input: React.FC<InputProps> = ({ label, error, hint, id, className = '', ...rest }) => {
  const inputId = id ?? `input-${rest.name ?? Math.random().toString(36).slice(2)}`;

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-amber-900">
          {label}
          {rest.required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 ${
          error ? 'border-red-400 bg-red-50' : 'border-amber-200 bg-white'
        } ${className}`}
        {...rest}
      />
      {hint && !error && <p className="text-xs text-gray-400">{hint}</p>}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default Input;

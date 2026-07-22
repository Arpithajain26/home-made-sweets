import React, { useRef } from 'react';
import type { KeyboardEvent, ClipboardEvent } from 'react';

interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
}

const OtpInput: React.FC<OtpInputProps> = ({ length = 6, value, onChange, disabled }) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Always produce exactly `length` slots.
  // NOTE: ''.padEnd(6, '') returns '' per JS spec (empty fill = no padding),
  // so we use Array.from instead to guarantee 6 boxes are always rendered.
  const digits = Array.from({ length }, (_, i) => value[i] ?? '');

  const focus = (idx: number) => {
    inputRefs.current[idx]?.focus();
    inputRefs.current[idx]?.select();
  };

  const updateDigit = (idx: number, char: string) => {
    const arr = digits.map((d) => d);
    arr[idx] = char.slice(-1);
    const next = arr.join('');
    onChange(next);
    if (char && idx < length - 1) focus(idx + 1);
  };

  const handleKeyDown = (idx: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (digits[idx]) {
        updateDigit(idx, '');
      } else if (idx > 0) {
        focus(idx - 1);
        updateDigit(idx - 1, '');
      }
    } else if (e.key === 'ArrowLeft' && idx > 0) {
      focus(idx - 1);
    } else if (e.key === 'ArrowRight' && idx < length - 1) {
      focus(idx + 1);
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    // Build a full-length string by padding with empty chars correctly
    const padded = pasted.split('');
    while (padded.length < length) padded.push('');
    onChange(padded.join(''));
    focus(Math.min(pasted.length, length - 1));
  };

  return (
    <div className="flex gap-2 justify-center" aria-label="OTP input">
      {digits.map((digit, idx) => (
        <input
          key={idx}
          ref={(el) => { inputRefs.current[idx] = el; }}
          id={`otp-digit-${idx}`}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          disabled={disabled}
          onChange={(e) => updateDigit(idx, e.target.value.replace(/\D/g, ''))}
          onKeyDown={(e) => handleKeyDown(idx, e)}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
          className="w-11 h-12 text-center text-xl font-bold border-2 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all disabled:opacity-50 bg-white border-amber-200 text-amber-900"
        />
      ))}
    </div>
  );
};

export default OtpInput;

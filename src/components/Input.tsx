import React from 'react';
import { Search } from 'lucide-react';

/**
 * 공통 Input 컴포넌트
 * @param {object} props - 표준 input 엘리먼트의 모든 속성을 받을 수 있습니다.
 */

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({
  type = 'text',
  placeholder,
  value,
  onChange,
  ...rest
}: InputProps) {
  return (
    <div className="relative w-full">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="
          text-body
          w-full
          pl-5 pr-12 py-3
          bg-card-background
          text-primary-text
          border-primary-text border-[1.5px]
          rounded-[20px]
          placeholder-secondary-text
          transition-colors duration-300 ease-in-out
          focus:outline-none
          focus:border-accent-primary1
        "
        {...rest} // name, disabled, readOnly 등 나머지 props를 전달합니다.
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-5">
        <Search className="text-secondary-text" />
      </div>
    </div>
  );
}

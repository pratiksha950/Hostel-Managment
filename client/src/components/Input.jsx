import React from "react";

function Input({
  type,
  placeholder,
  value,
  name,
  onChange,
  autoComplete,
  onKeyDown
}) {
  return (
    <div className="relative w-full">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        autoComplete={autoComplete}
        onKeyDown={onKeyDown}
        className="border rounded-xl h-8 w-full text-sm text-center
        focus:outline-none focus:border-pink-700 pl-8"
      />

      <i className="fa-solid fa-magnifying-glass absolute left-6 top-1/2 -translate-y-1/2 text-black-400"></i>
    </div>
  );
}

export default Input;
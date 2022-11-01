import React from 'react';

const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={"w-full h-full rounded bg-purple-500 text-center py-2 text-zinc-100 font-light text-2xl transition-all " + className}
      {...props}>
      {children}
    </button>
  );
};
export default Button;

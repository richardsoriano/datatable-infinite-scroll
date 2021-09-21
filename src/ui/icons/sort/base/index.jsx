import React from "react";

export default function Icon({ children, size = 16, active = false, onClick }) {
  return (
    <svg
      onClick={onClick}
      style={{ width: size, height: size }}
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      stroke={active ? "blue" : "grey"}
    >
      {children}
    </svg>
  );
}

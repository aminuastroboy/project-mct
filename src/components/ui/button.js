import React from "react";

export function Button({ className = "", children, ...props }) {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded-xl bg-pink-500 text-white font-medium hover:bg-pink-600 transition ${className}`}
    >
      {children}
    </button>
  );
}

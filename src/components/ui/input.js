import React from "react";

export function Input({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={`w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 ${className}`}
    />
  );
}

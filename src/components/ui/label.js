import React from "react";

export function Label({ className = "", children, ...props }) {
  return (
    <label
      {...props}
      className={`block text-sm font-medium text-gray-700 mb-1 ${className}`}
    >
      {children}
    </label>
  );
}

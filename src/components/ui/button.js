
import React from 'react';
export function Button({children,className='',...props}){
  return <button {...props} className={`px-4 py-2 rounded-xl bg-petal3 text-white font-medium hover:bg-petal4 transition ${className}`}>{children}</button>
}

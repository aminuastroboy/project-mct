import React from 'react';
export function Avatar({src,alt='avatar',className=''}){
  return <div className={`w-10 h-10 rounded-full overflow-hidden bg-gray-100 ${className}`}>{src? <img src={src} alt={alt} className="w-full h-full object-cover"/> : <div className="flex items-center justify-center h-full">👤</div>}</div>
}

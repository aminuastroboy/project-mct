import React from 'react'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Clean UI - Removed Welcome & Home text */}
      <Button
        className="mt-4 px-6 py-3 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-lg"
      >
        Click Me
      </Button>
    </div>
  )
}

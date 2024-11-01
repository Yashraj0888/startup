import React from 'react'

/**
 * Ping component renders a small ping animation, typically used for notifications
 * or status indicators.
 */
const Ping = () => {
  return (
    <div className='relative'>
      {/* Container for the animated ping effect, positioned absolutely */}
      <div className='absolute -left-4 -top-1'> 
        {/* Wrapper for the ping animation */}
        <span className='flex size-[11px]'>
          {/* Outer circle with animation */}
          <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-100'></span>
          {/* Inner static circle */}
          <span className='relative inline-flex size-[11px] rounded-full bg-primary'></span>
        </span>
      </div>
    </div>
  )
}

export default Ping

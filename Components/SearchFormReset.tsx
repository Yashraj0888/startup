'use client'
import Link from 'next/link';
import React from 'react'

const SearchFormReset = () => {
    // Function to reset the search form by selecting it through the class name
    const reset = () => {
        const form = document.querySelector('.search-form') as HTMLFormElement;
        if (form) form.reset();
    }

    return (
        <div>
            {/* Reset button with an onClick event to call the reset function */}
            <button type='reset' className='search-button' onClick={reset}>
                <Link href='/' className='search-btn text-white'>
                    X {/* Link to the home page */}
                </Link>
            </button>
        </div>
    )
}

export default SearchFormReset

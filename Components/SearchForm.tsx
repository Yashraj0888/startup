import React from 'react'
import Form from 'next/form' // Importing Next.js form for handling form submission
import SearchFormReset from './SearchFormReset' // Importing component to reset the search form
import { Search } from 'lucide-react' // Importing the search icon

/**
 * SearchForm component renders a search input form that takes an optional query as a prop.
 * If a query is provided, it displays a reset button to clear the search.
 * On submission, the form triggers a search action.
 */
const SearchForm = ({ query }: { query?: string }) => {

  return (
    <Form action='/' scroll={false} className='search-form'>
      {/* Search input field with a default value from the query prop */}
      <input 
        name='query'
        defaultValue={query}
        className='search-input'
        placeholder='Search StartUps'
      />

      {/* Container for the reset button and search submit button */}
      <div className='flex gap-2'>
        {/* Conditionally render the reset button if a query exists */}
        {query && 
          <SearchFormReset/>
        }
        
        {/* Submit button for executing the search */}
        <button type='submit' className='search-btn text-white'>
          <Search/> {/* Search icon */}
        </button>
      </div>
    </Form>
  )
}

export default SearchForm

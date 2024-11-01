// Importing necessary utilities from clsx and tailwind-merge libraries
import { clsx, type ClassValue } from "clsx"; // clsx is used for conditionally joining class names
import { twMerge } from "tailwind-merge"; // tailwind-merge helps to merge Tailwind CSS class names, handling conflicting styles

/**
 * A utility function to combine class names conditionally and merge Tailwind CSS classes
 * 
 * @param inputs - A variable number of class names or class conditions
 * @returns A single string of merged class names
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs)); // Merges and resolves class names into a single string
}

/**
 * Parses a server action response to ensure it's in a serializable format
 * 
 * @param response - The response object to be parsed
 * @returns The parsed response object
 */
export function parseServerActionResponse<T>(response: T) {
    return JSON.parse(JSON.stringify(response)); // Converts the response to a JSON string and then back to an object
}

/**
 * Formats a date string into a more readable format
 * 
 * @param date - The date string to be formatted
 * @returns A formatted date string in "Month Day, Year" format
 */
export function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-US", {
        month: "long", // Full month name
        day: "numeric", // Numeric day
        year: "numeric", // Numeric year
    });
}

/**
 * Formats a number into a human-readable string, converting to 'k' for thousands and 'M' for millions
 * 
 * @param number - The number to be formatted
 * @returns A formatted string representation of the number
 */
export function formatNumber(number: number) {
    // Check if the number is in the millions
    if (number >= 1000000) {
        return (number / 1000000).toFixed(1).replace(/\.0$/, "") + "M"; // Convert to millions
    } 
    // Check if the number is in the thousands
    else if (number >= 1000) {
        return (number / 1000).toFixed(1).replace(/\.0$/, "") + "k"; // Convert to thousands
    } 
    // Return the number as is if below 1000
    else {
        return number.toString(); // Return the number as a string
    }
}

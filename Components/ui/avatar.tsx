"use client"; // Indicates that this file should only run on the client side, ensuring it won't be executed during server-side rendering

// Importing necessary modules and components
import * as React from "react"; // Importing React library for creating components
import * as AvatarPrimitive from "@radix-ui/react-avatar"; // Importing Avatar components from Radix UI for accessible UI components
import { cn } from "@/lib/util"; // Importing a utility function for conditional class name handling

// Avatar Component
const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>, // Type for the ref that will point to the AvatarPrimitive.Root element
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> // Type for the props that can be passed to the AvatarPrimitive.Root component
>(({ className, ...props }, ref) => (
  // Defining the Avatar component with a forwarded ref
  <AvatarPrimitive.Root
    ref={ref} // Forwarding the ref to the root component
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", // Setting default styles for the avatar (relative positioning, flex layout, size, overflow handling, and rounded shape)
      className // Merging additional classes provided via props
    )}
    {...props} // Spreading other props onto the AvatarPrimitive.Root component
  />
));

// Setting display name for debugging purposes in React DevTools
Avatar.displayName = AvatarPrimitive.Root.displayName; 

// AvatarImage Component
const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>, // Type for the ref pointing to the AvatarPrimitive.Image element
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> // Type for the props that can be passed to the AvatarPrimitive.Image component
>(({ className, ...props }, ref) => (
  // Defining the AvatarImage component with a forwarded ref
  <AvatarPrimitive.Image
    ref={ref} // Forwarding the ref to the image component
    className={cn("aspect-square h-full w-full", className)} // Ensuring the image maintains a square aspect ratio and occupies full dimensions of the parent avatar
    {...props} // Spreading other props onto the AvatarPrimitive.Image component
  />
));

// Setting display name for debugging purposes
AvatarImage.displayName = AvatarPrimitive.Image.displayName; 

// AvatarFallback Component
const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>, // Type for the ref pointing to the AvatarPrimitive.Fallback element
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> // Type for the props that can be passed to the AvatarPrimitive.Fallback component
>(({ className, ...props }, ref) => (
  // Defining the AvatarFallback component with a forwarded ref
  <AvatarPrimitive.Fallback
    ref={ref} // Forwarding the ref to the fallback component
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted", // Styling for the fallback avatar (flex layout, full dimensions, centered content, rounded shape, and muted background)
      className // Allowing additional classes to be merged
    )}
    {...props} // Spreading other props onto the AvatarPrimitive.Fallback component
  />
));

// Setting display name for debugging purposes
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName; 

// Exporting the components for use in other parts of the application
export { Avatar, AvatarImage, AvatarFallback };

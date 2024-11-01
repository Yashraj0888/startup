'use client'
import React, { useActionState, useState } from 'react'
import { Input } from './ui/input'
import MDEditor from '@uiw/react-md-editor'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Send } from 'lucide-react'
import { formSchema } from '@/lib/validation'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { createPitch } from '@/lib/actions'
import { z } from 'zod'

const StartupForm = () => {
    // State to store validation errors for each form field
    const [errors, setErrors] = useState<Record<string, string>>({})
    
    // State to store the startup pitch content in markdown format
    const [pitch, setPitch] = useState('')
    
    // Toast for showing success/error messages to the user
    const { toast } = useToast()
    
    // Next.js router for redirecting after successful submission
    const router = useRouter()

    /**
     * Handles form submission and validates data against formSchema.
     * On successful validation, it submits the form data by calling createPitch().
     * If validation fails, errors are displayed for each field with invalid data.
     */
    const handleFormSubmit = async (prevState: any, formData: FormData) => {
        try {
            // Extract form values and assign them to an object
            const formValues = {
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                link: formData.get("link") as string,
                pitch,  // markdown editor pitch value
            }

            // Validate form values using zod schema (formSchema)
            await formSchema.parseAsync(formValues)

            // Call the createPitch function to submit form data
            const result = await createPitch(prevState, formData, pitch)

            if (result.status === "SUCCESS") {
                // Show a success toast message
                toast({
                    title: "Success",
                    description: "Your startup pitch has been created successfully",
                })

                // Redirect to the new startup pitch page
                router.push(`/startup/${result._id}`)
            }

            return result
        } catch (error) {
            if (error instanceof z.ZodError) {
                // Handle validation errors and update the `errors` state
                const fieldErrors = error.flatten().fieldErrors
                setErrors(fieldErrors as unknown as Record<string, string>)

                // Show an error toast message
                toast({
                    title: "Error",
                    description: "Please check your inputs and try again",
                    variant: "destructive",
                })

                // Return updated state with error details
                return { ...prevState, error: "Validation failed", status: "ERROR" }
            }

            // General error handling for unexpected errors
            toast({
                title: "Error",
                description: "An unexpected error has occurred",
                variant: "destructive",
            })

            return {
                ...prevState,
                error: "An unexpected error has occurred",
                status: "ERROR",
            }
        }
    }

    // Manage form action and submission state
    const [state, formAction, isPending] = useActionState(handleFormSubmit, {
        error: "",
        status: "INITIAL",
    })

    return (
        <form action={formAction} className='startup-form'>
            {/* Title Input Field */}
            <div>
                <label htmlFor="title" className='startup-form_label'>Title</label>
                <Input
                    id='title'
                    name='title'
                    className='startup-form_input'
                    required
                    placeholder='Enter Startup title'
                />
                {errors.title && <p className='startup-form_errors'>{errors.title}</p>}
            </div>

            {/* Description Textarea Field */}
            <div>
                <label htmlFor="description" className='startup-form_label'>Description</label>
                <Textarea
                    id='description'
                    name='description'
                    className='startup-form_textarea'
                    required
                    placeholder='Enter Startup Description'
                />
                {errors.description && <p className='startup-form_errors'>{errors.description}</p>}
            </div>

            {/* Category Input Field */}
            <div>
                <label htmlFor="category" className='startup-form_label'>Category</label>
                <Input
                    id='category'
                    name='category'
                    className='startup-form_input'
                    required
                    placeholder='Enter category (e.g., Tech, Sports, Education...)'
                />
                {errors.category && <p className='startup-form_errors'>{errors.category}</p>}
            </div>

            {/* Image URL Input Field */}
            <div>
                <label htmlFor="link" className='startup-form_label'>Image URL</label>
                <Input
                    id='link'
                    name='link'
                    className='startup-form_input'
                    required
                    placeholder='Image URL'
                />
                {errors.link && <p className='startup-form_errors'>{errors.link}</p>}
            </div>

            {/* Pitch Markdown Editor Field */}
            <div data-color-mode='light'>
                <label htmlFor="pitch" className='startup-form_label'>Pitch</label>
                <MDEditor
                    value={pitch}
                    onChange={(value) => setPitch(value as string)}
                    preview='edit'
                    id='pitch'
                    height={300}
                    style={{ borderRadius: 20, overflow: 'hidden' }}
                    textareaProps={{
                        placeholder: 'Brief description of the pitch and what problem it solves',
                    }}
                    previewOptions={{
                        disallowedElements: ['style'],
                    }}
                />
                {errors.pitch && <p className='startup-form_errors'>{errors.pitch}</p>}
            </div>

            {/* Submit Button */}
            <Button type='submit' className='startup-form_btn text-white-100' disabled={isPending}>
                {isPending ? " Hang on, you're going live very soon... " : 'Submit your Pitch...'}
                <Send className='size-9 ml-1'/>
            </Button>
        </form>
    )
}

export default StartupForm

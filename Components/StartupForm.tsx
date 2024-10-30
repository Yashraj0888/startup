'use client'
import React, { useActionState, useState } from 'react'
import { Input } from './ui/input'
import MDEditor from '@uiw/react-md-editor'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Send } from 'lucide-react'
import { formSchema } from '@/lib/validation'
import { zIndexContextDefaults } from 'sanity/_singletons'
import {unknown, z} from 'zod'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { createPitch } from '@/lib/actions'


const StartupForm = () => {
    const [errors, setErrors]=useState<Record<string, string>>({})
    const [pitch,setPitch] = useState('')
    const {toast}=useToast()
    const router =useRouter()

    const handleFormSubmit = async (prevState: any, formData: FormData) => {
        try {
          const formValues = {
            title: formData.get("title") as string,
            description: formData.get("description") as string,
            category: formData.get("category") as string,
            link: formData.get("link") as string,
            pitch,
          };
    
          await formSchema.parseAsync(formValues);
    
          const result = await createPitch(prevState, formData, pitch);
    
          if (result.status == "SUCCESS") {
            toast({
              title: "Success",
              description: "Your startup pitch has been created successfully",
            });
    
            router.push(`/startup/${result._id}`);
          }
    
          return result;
        } catch (error) {
          if (error instanceof z.ZodError) {
            const fieldErorrs = error.flatten().fieldErrors;
    
            setErrors(fieldErorrs as unknown as Record<string, string>);
    
            toast({
              title: "Error",
              description: "Please check your inputs and try again",
              variant: "destructive",
            });
    
            return { ...prevState, error: "Validation failed", status: "ERROR" };
          }
    
          toast({
            title: "Error",
            description: "An unexpected error has occurred",
            variant: "destructive",
          });
    
          return {
            ...prevState,
            error: "An unexpected error has occurred",
            status: "ERROR",
          };
        }
      };
    
      const [state, formAction, isPending] = useActionState(handleFormSubmit, {
        error: "",
        status: "INITIAL",
      });
    
    
  return (
        <form action={formAction} className='startup-form'>
        <div>
           <label htmlFor="title" className='startup-form_lable'>
                Title
            </label>
            <Input
                id='title'
                name='title'
                className='startup-form_input'
                required
                placeholder='Enter Startup title'

            />
            {errors.title && <p className='startup-form_errors'>{errors.title}</p>} 

            
             
        </div> 
        <div>
           <label htmlFor="description" className='startup-form_lable'>
                Description
            </label>
            <Textarea
                id='description'
                name='description'
                className='startup-form_textarea'
                required
                placeholder='Enter Startup Description'

            />
            {errors.description && <p className='startup-form_errors'>{errors.description}</p>} 

            
             
        </div> 
        <div>
           <label htmlFor="category" className='startup-form_lable'>
                Category
            </label>
            <Input
                id='category'
                name='category'
                className='startup-form_input'
                required
                placeholder='Enter category (eg Tech, Sports, Education ....)'

            />
            {errors.category && <p className='startup-form_errors'>{errors.category}</p>} 

            
             
        </div> 
        <div>
            {/* do it for choose from local storage */}
           <label htmlFor="link" className='startup-form_lable'>
                Image URL
            </label>
            <Input
                id='link'
                name='link'
                className='startup-form_input'
                required
                placeholder='Image URL'

            />
            {errors.link && <p className='startup-form_errors'>{errors.link}</p>} 

            
             
        </div> 
        <div data-color-mode='light'>
           <label htmlFor="pitch" className='startup-form_lable'>
                Pitch
            </label>
            <MDEditor
                value={pitch}
                onChange={(value)=>setPitch( value as string)}
                preview='edit'
                id='pitch'
                height={300}
                style={{borderRadius:20, overflow: 'hidden'}}
                textareaProps={{
                    placeholder:'Brief Description of the pitch and what problem it solves'
                }}
                previewOptions={{
                    disallowedElements:['style']
                }}
                
            ></MDEditor>
            {errors.pitch && <p className='startup-form_errors'>{errors.pitch}</p>} 

            
             
        </div> 
        <Button type='submit' className='startup-form_btn text-white-100'
        disabled={isPending}>
            {isPending ? " Hang on your going live very soon... ":'Submit your Pitch...'}
            <Send className='size-9 ml-1'/>

        </Button>
        </form> 

  )
}

export default StartupForm

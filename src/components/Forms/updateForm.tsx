import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Label } from '../ui/label'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { updateUserProfile } from '@/functions/user'

/* eslint-disable */

  
  const SigninformSchema = z.object({
    username: z.string().regex(/^\S+$/, "Spaces are not allowed"),
  });

  

const UpdateForm = ({email} : {email: string}) => {
    const router = useRouter();

    const [signinFormData, setSigninFormData] = useState([
      {
        name: "username",
        type: "test",
        placeHolder: "johndoe",
        label: "johndoe",
      },
    ]);

    const signinForm = useForm<z.infer<typeof SigninformSchema>>({
        resolver: zodResolver(SigninformSchema),
        defaultValues: {
          username: ""
        },
      });
    const handleSignInForm = async (data: z.infer<typeof SigninformSchema>) => {
        const input = data.username;
        
        // Call the updateUserProfile function with the email and input
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response = await updateUserProfile(email, input);
        
        if (response.success) {
          toast.success(response.message);
  
        } else{  
          toast.error(response.message);
        }
        
      };


      
  return (
    <div>
    <Dialog>
      <DialogTrigger>
        Edit
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit your name</DialogTitle>
        </DialogHeader>
        <Form {...signinForm}>
          <form
            onSubmit={signinForm.handleSubmit(handleSignInForm)}
          >
            {signinFormData.map((formField, index) => (
              <FormField
                key={index}
                //control={signinForm.control}
                name={(formField.name as "username")}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs">
                      {formField.label}
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="rounded-full text-md bg-gray-200/80 p-6"
                        type={formField.type}
                        placeholder={formField.placeHolder}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button
              size={"lg"}
              className="rounded-full py-6 bg-linear-[135deg,#f75959_0%,#f35587_100%] cursor-pointer"
              type="submit"
            >
              Sign In
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
      
</div>
  )
}

export default UpdateForm
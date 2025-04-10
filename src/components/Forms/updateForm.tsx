import React from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { updateUserProfile } from '@/functions/user'

const signinFormData = [
    {
      name: "username",
      type: "text",
      placeHolder: "johndoe",
      label: "Username",
    },
  ];
  
  const SigninformSchema = z.object({
    email: z.string().regex(/^\S+$/, "Spaces are not allowed"),
  });

  

const UpdateForm = () => {
    const router = useRouter();
    const signinForm = useForm<z.infer<typeof SigninformSchema>>({
        resolver: zodResolver(SigninformSchema),
        defaultValues: {
          email: ""
        },
      });
    const handleSignInForm = async (data: z.infer<typeof SigninformSchema>) => {
        const input =
        const response = await updateUserProfile(data.email, data.input, mode.no);
        
        if (response.success) {
          toast.success(response.message);
    
          router.replace("/user_dashboard");
        } else {
          toast.error(response.message);
        }
      };
  return (
    <div><Button asChild>
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
                control={signinForm.control}
                name={(formField.name as "password") || "email"}
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
            <Label className="text-pink-500">
              <Checkbox className="bg-gray-100" id="agree" />
              <span>Remember Me</span>
            </Label>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
      
  </Button></div>
  )
}

export default UpdateForm
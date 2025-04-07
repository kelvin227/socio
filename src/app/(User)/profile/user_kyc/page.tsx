import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Button } from '@/components/ui/button'
import React from 'react'
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu'

const UKyc = () => {
  return (
    <div className='shadow-lg shadow-gray-800 w-full'>
    <div>
          <div className="flex flex-box p-2">
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-full"
            >
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />

                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Button>
            <div className="grid grid-box">
               <div>
                Profile
              </div>
              <div>
                Trustgain@gmail.com
              </div>
            </div>
          </div>
          <DropdownMenuSeparator />
          
      </div>
    </div>
  )
}

export default UKyc
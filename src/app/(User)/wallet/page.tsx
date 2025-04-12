import { Card, CardContent } from '@/components/ui/card'
import React from 'react'

export default function Wallet () {
  return (
    <Card>
      <CardContent>
        <div className='flex flex-box gap-4 w-full jusify-center items-center'>
             USDT
        </div>

        <div className="flex flex-box">
          <div className="flex flex-col w-full gap-4">
            <div className="flex flex-row justify-between items-center">
              <div className="text-sm font-medium text-gray-700">Total Balance</div>
              <div className="text-lg font-bold text-gray-900">$0.00</div>
            </div>
            <div className="flex flex-row justify-between items-center">
              <div className="text-sm font-medium text-gray-700">Available Balance</div>
              <div className="text-lg font-bold text-gray-900">$0.00</div>
            </div>
          </div>
        </div>
        <div className="flex flex-cols-4 mt-2 w-full gap-4">
          <div className="flex flex-col justify-between items-center bg-gray-100 p-4 rounded-lg mb-2 w-full">
            <div className="text-sm font-medium text-gray-700 w-full">Deposit</div>
          </div>
          <div className="flex flex-col justify-between items-center bg-gray-100 p-4 rounded-lg mb-2 w-full">
            <div className="text-sm font-medium text-gray-700 w-full">Withdraw</div>
          </div>
          <div className="flex flex-col justify-between items-center bg-gray-100 p-4 rounded-lg mb-2 w-full">
            <div className="text-sm font-medium text-gray-700 w-full" >Transfer</div>
          </div>
          <div className="flex flex-col justify-between items-center w-full bg-gray-100 p-4 rounded-lg mb-2">
            <div className="text-sm font-medium text-gray-700 w-full">Receive</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

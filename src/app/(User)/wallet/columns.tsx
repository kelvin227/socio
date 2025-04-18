"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  Coins: number
  Balance: number
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "Coins",
    header: "Coins",
  },
  {
    accessorKey: "Balance",
    header: "Balance",
  },
  
]

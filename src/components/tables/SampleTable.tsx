import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";



const SampleTable = ( ) => {
  return (
    <>
    <Table id="sample-table">
    <TableCaption>A list of your recent invoices.</TableCaption>
    <TableHeader>
      <TableRow className='border'>
        <TableHead className="w-[100px] border">Invoice</TableHead>
        <TableHead className='border'>Status</TableHead>
        <TableHead className='border'>Method</TableHead>
        <TableHead className="text-right border">Amount</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell className="font-medium border">INV001</TableCell>
        <TableCell className='border'>Paid</TableCell>
        <TableCell className='border'>Credit Card</TableCell>
        <TableCell className="text-right border">$250.00</TableCell>
      </TableRow>
    </TableBody>
  </Table>
  </>
  )
}

export default SampleTable
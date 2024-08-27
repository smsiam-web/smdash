import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
  } from '../../../../components/ui/card';

const EditCustomer = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='scroll-m-20 text-2xl sm:text-3xl font-bold tracking-tight lg:text-4xl'>Edit Customers</CardTitle>
        <CardDescription>Edit customers name address contact and their orders.</CardDescription>
      </CardHeader>
      <CardContent>
        </CardContent>
        </Card>
  )
}

export default EditCustomer
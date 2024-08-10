'use client'
import React, { useContext, useEffect, useState } from 'react'
import { Button } from '../components/ui/button';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../components/ui/dropdown-menu';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setUserDetails } from '../redux/slices/userSlice';
import SummaryApi from 'common';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export function User() {

  const user = useSelector(selectUser);
  const dispatch = useDispatch()
  const router = useRouter();

  const fetchUserDetails = async()=>{
    const dataResponse = await fetch(SummaryApi.current_user.url,{
      method : SummaryApi.current_user.method,
      credentials : 'include'
    })

    const dataApi = await dataResponse.json()

    if(dataApi.success){
      dispatch(setUserDetails(dataApi.data))
    }
}
useEffect(()=>{
  /**user Details */
  fetchUserDetails()
  /**user Details cart product */
  // fetchUserAddToCart()

},[])

  const handleLogout = async() => {
    const fetchData = await fetch(SummaryApi.logout_user.url,{
      method : SummaryApi.logout_user.method,
      credentials : 'include'
    })

    const data = await fetchData.json()

    if(data.success){
      toast.success(data.message)
      dispatch(setUserDetails(null))
      router.push('/')
    }

    if(data.error){
      toast.error(data.message)
    }

  }


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <Image
            src={user ? user.profilePic : `/placeholder-user.jpg`}
            width={36}
            height={36}
            alt="Avatar"
            className="overflow-hidden rounded-full"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        {user?._id ? (
          <DropdownMenuItem>
            <span onClick={handleLogout} className='block'>Logout</span>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem>
            <Link href="/login" className='block'>Sign In</Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

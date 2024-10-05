import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "../../../components/ui/card";

const CourierCard = () => {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <Link className="col-span-1" href={"/courier/partner/stead-fast"}>
          <Card className="w-fit cursor-pointer">
            <CardHeader>
              <div className="flex gap-4">
                <Image
                  src="/courier/sfcs.png"
                  alt="Picture of the author"
                  className="rounded-lg"
                  width={80}
                  height={80}
                />
                <div>
                  <CardTitle className="text-3xl">SteadFast</CardTitle>
                  <CardTitle className="text-xl">Courier Service</CardTitle>
                  <CardDescription>Configure now</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </Link>
        <Link className="col-span-1" href={"/courier/partner/pathao"}>
          <Card className="w-fit cursor-pointer">
            <CardHeader>
              <div className="flex gap-4">
                <Image
                  src="/courier/pathao.png"
                  alt="Picture of the author"
                  className="rounded-lg"
                  width={80}
                  height={80}
                />
                <div>
                  <CardTitle className="text-3xl">Pathao</CardTitle>
                  <CardTitle className="text-xl">Courier Service</CardTitle>
                  <CardDescription>Configure now</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </Link>
        <Link className="col-span-1" href={"/courier/partner/red-x"}>
          <Card className="w-fit cursor-pointer">
            <CardHeader>
              <div className="flex gap-4">
                <Image
                  src="/courier/redx.png"
                  alt="Picture of the author"
                  className="rounded-lg"
                  width={80}
                  height={80}
                />
                <div>
                  <CardTitle className="text-3xl">Red-X</CardTitle>
                  <CardTitle className="text-xl">Courier Service</CardTitle>
                  <CardDescription>Configure now</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </Link>
        </div>
  )
}

export default CourierCard
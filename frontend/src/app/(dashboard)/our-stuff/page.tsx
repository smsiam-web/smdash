import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
  } from '../../components/ui/card';

const OurStuff = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='scroll-m-20 text-2xl sm:text-3xl font-bold tracking-tight lg:text-4xl'>Our Stuff</CardTitle>
        <CardDescription>View all stuff and their role.</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  )
}

export default OurStuff
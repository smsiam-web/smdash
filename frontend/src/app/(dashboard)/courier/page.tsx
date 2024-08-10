import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
  } from '../../components/ui/card';

const Courier = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='scroll-m-20 text-2xl sm:text-3xl font-bold tracking-tight lg:text-4xl'>Courier</CardTitle>
        <CardDescription>View all courier and their API.</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  )
}

export default Courier
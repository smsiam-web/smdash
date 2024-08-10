import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '../../components/ui/card';

export default function CustomersPage() {

  return (
    <Card>
      <CardHeader>
        <CardTitle className='scroll-m-20 text-2xl sm:text-3xl font-bold tracking-tight lg:text-4xl'>Customers</CardTitle>
        <CardDescription>View all customers and their orders.</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}

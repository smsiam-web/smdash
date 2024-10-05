import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import CourierCard from "./partner/card";

const Courier = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="scroll-m-20 text-2xl sm:text-3xl font-bold tracking-tight lg:text-4xl">
          Courier
        </CardTitle>
        <CardDescription>View all courier and their API.</CardDescription>
      </CardHeader>
      <CardContent>
        <CourierCard />  
      </CardContent>
    </Card>
  );
};

export default Courier;

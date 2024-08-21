"use client";
import React, { use, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../components/ui/alert-dialog";
import { Input } from "src/app/components/ui/input";
import { Button } from "@radix-ui/themes";
import { Loader2 } from "lucide-react";
import { Label } from "../../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group";
import { Textarea } from "src/app/components/ui/textarea";
import SummaryApi from "common";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectUser } from "src/app/redux/slices/userSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { RiDeleteBin7Line } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
type Product = {
  _id: string;
  category: string;
  description: string;
  price: string;
  productImage: string[];
  productName: string;
  sellingPrice: string;
  sku: string;
  slug: string;
  stock: string;
  unit: string;
  quantity: string;
  totalAmount: number;
};
interface Items {
  _id: string;
  category: string;
  productName: string;
  sellingPrice: string;
  sku: string;
  slug: string;
  unit: string;
  quantity: string;
  totalAmount: number;
}

const phoneRegex = new RegExp(/^(?:\+?88)?01[3-9]\d{8}$/);
// Define a schema for an array of objects
const productSchema = z.object({
  _id: z.string(),
  category: z.string(),
  productName: z.string(),
  sellingPrice: z.string(),
  sku: z.string(),
  slug: z.string(),
  unit: z.string(),
  quantity: z.string(),
  totalAmount: z.number(),
});

const formSchema = z.object({
  deliveryType: z
    .enum(["home", "point", "hub"], {
      required_error: "You need to select a delivery type.",
    })
    .default("home"),
  contact: z.string().regex(phoneRegex, "Invalid Number!"),
  name: z.string().min(3, {
    message: "Name is a required field",
  }),
  address: z.string().min(4, {
    message: "Address is a required field",
  }),
  items: z
    .array(productSchema)
    .min(0, "Must have at least one product")
    .optional(),
  totalAmount: z.string().min(0, {
    message: "Total Amount amount is a required field.",
  }),
  paidAmount: z.string().min(0, {
    message: "Paid amount is a required field.",
  }),
  discount: z.string().min(0, {
    message: "Discount amount is a required field.",
  }),
  conditionAmount: z.string().min(0, {
    message: "Paid amount is a required field.",
  }),
  shippingCost: z.string().min(0, {
    message: "Shipping Cost is a required field.",
  }),
  courier: z
    .string({
      required_error: "Please select a courier to display.",
    })
    .default("SteadFast"),
  status: z
    .string({
      required_error: "Please select a courier to display.",
    })
    .default("pending"),
  note: z.string().default("Note"),
  createdBy: z
    .string()
    .min(3, {
      message: "User must be at least 3 characters",
    })
    .default("Admin"),
});

const OrderFrom = () => {
  const [loading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [autoUp, setAutoUp] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [searchActive, setSearchActive] = useState(true);
  const [filterProduct, setFilterProduct] = useState<Product[]>([]);
  const [selectProduct, setSelectProduct] = useState<Product | null>(null); // Use null initially to indicate no selection
  const [product, setProduct] = useState<Items[]>([]);
  const [query, setQuery] = useState(null);
  const [grandTotal, setGrandTotal] = useState(0);
  const [order, setOrder] = useState({
    deliveryType: "home",
    contact: "",
    items: [],
    name: "",
    address: "",
    totalAmount: "",
    paidAmount: "",
    discount: "",
    conditionAmount: "",
    shippingCost: "",
    courier: "SteadFast",
    status: "pending",
    note: "Note",
    createdBy: "",
  });
  const user = useSelector(selectUser);

  const router = useRouter();
  const searchParams = useSearchParams();

  const fullPath = searchParams.toString();
  const path = fullPath.replace(/=/g, "");

  //fetch Single Order
  const fetchOrderByID = async (path: any) => {
    setLoading(true);
    const response = await fetch(SummaryApi.singleOrder.url, {
      method: SummaryApi.singleOrder.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        orderId: path,
      }),
    });
    setLoading(false);
    const dataReponse = await response.json();
    if (dataReponse.success) {
      setAutoUp(true);
      form.reset(dataReponse?.data);
      setOrder(dataReponse?.data);
      setProduct(dataReponse?.data?.items);
      setSearchActive(false);
      setIsUpdate(true);
    }
  };

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      deliveryType: "home",
      contact: "",
      items: [],
      name: "",
      address: "",
      totalAmount: "0",
      paidAmount: "0",
      discount: "-0",
      conditionAmount: "0",
      shippingCost: "110",
      courier: "SteadFast",
      status: "pending",
      note: "Note",
      createdBy: `${user?.name}`,
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    if (isUpdate) {
      const data = { ...order, ...values, items: product };
      const dataResponse = await fetch(SummaryApi.updateOrder.url, {
        method: SummaryApi.updateOrder.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        form.reset();
        toast.success(dataApi.message);
        router.push(`/orders/id?${dataApi?.data?._id}`);
        // fetchOrderByID(path);
      }

      if (dataApi.error) {
        toast.error(dataApi.message);
      }
    } else {
      const data = { ...values, items: product };
      const dataResponse = await fetch(SummaryApi.uploadOrder.url, {
        method: SummaryApi.uploadOrder.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(dataApi?.message);
        form.reset();
        router.push(`/orders/id?${dataApi?.data?._id}`);
      }

      if (dataApi.error) {
        toast.error(dataApi.message);
      }
    }
    setLoading(false);
  };

  const handleReset = async () => {
    if (isUpdate) {
      fetchOrderByID(path);
    } else {
      form.reset(); // Resets the form fields to their default values
      setProduct([]);
      setSearchActive(true);
      setGrandTotal(0);
    }
  };

  useEffect(() => {
    fetchOrderByID(path);
  }, [path]);

  const searchProduct = async () => {
    setFilterProduct([]);
    if (!query) return; // Prevent fetching if search query is not available
    setLoading(true);
    const response = await fetch(`${SummaryApi.searchProduct.url}?q=${query}`);
    const dataResponse = await response.json();
    setLoading(false);

    setFilterProduct(dataResponse.data);
  };

  useEffect(() => {
    searchProduct();
  }, [query]);

  const searchItem = async (e: any) => {
    const value = e.target.value;
    setSearchVal(value);
    setQuery(value);
  };

  const handelSelect = (item: Product) => {
    setSearchVal("");
    setFilterProduct([]);
    setIsOpen(true);
    setSelectProduct(item);
  };

  const handelQuantity = (e: any) => {
    e.preventDefault();
    setQuantity(e.target.value);
  };
  const handelQuantitySubmit = (e: any) => {
    e.preventDefault();
    if (!selectProduct) return; // Handle the case where no product is selected
    let amount = 0;
    !!product.length &&
      product.map((i) => {
        amount += i.totalAmount;
      });

    const totalAmount =
      Number(selectProduct.sellingPrice) * Number(quantity) || 1;
    const grandTotal = totalAmount + amount;
    setGrandTotal(grandTotal);
    const item: Items = {
      _id: selectProduct._id,
      category: selectProduct.category,
      productName: selectProduct.productName,
      sellingPrice: selectProduct.sellingPrice,
      sku: selectProduct.sku,
      slug: selectProduct.slug,
      unit: selectProduct.unit,
      quantity,
      totalAmount,
    };

    setProduct([...product, item]);
    setIsOpen(false);
    setQuantity("1");
    setSearchActive(false);
  };

  const removeItem = (i: Items) => {
    const filter: Items[] = [];
    let setGrand = 0;
    product.filter((item: Items) => {
      if (item._id === i._id) return;
      setGrand += item.totalAmount;
      filter.push(item);
    });
    setGrandTotal(setGrand);
    setProduct(filter);
    if (!filter.length) setSearchActive(true);
  };

  const deliveryType = form.watch("deliveryType");
  useEffect(() => {
    // if(autoUp) return;
    if (deliveryType === "home") {
      form.setValue("shippingCost", "110");
    } else if (deliveryType === "point") {
      form.setValue("shippingCost", "80");
    } else {
      form.setValue("shippingCost", "50");
    }
  }, [deliveryType]);

  const totalAmount = form.watch("totalAmount");
  const tAmonutNum: number = parseFloat(totalAmount);
  const paidAmount = form.watch("paidAmount");
  const paidAmountNumber: number = parseFloat(paidAmount);
  const shippingCost = form.watch("shippingCost");
  const sCost: number = parseFloat(shippingCost);
  const conditionAmount = form.watch("conditionAmount");
  const cAmountNum: number = parseFloat(conditionAmount);

  useEffect(() => {
    setAutoUp(false);
    const totalAmount = String(grandTotal);
    form.setValue("totalAmount", totalAmount);
    const sCost: number = parseFloat(shippingCost);
    const cAmount = grandTotal + sCost;
    const cAmountStr = String(cAmount);
    form.setValue("conditionAmount", cAmountStr);
    form.setValue("discount", "-0");
    form.setValue("paidAmount", "0");
  }, [grandTotal]);

  //paid Condition
  useEffect(() => {
    if (autoUp) return;
    if (!tAmonutNum) return;
    const conditionAmount = tAmonutNum - paidAmountNumber + sCost;
    const cAmount = String(conditionAmount);
    form.setValue("conditionAmount", cAmount);
  }, [paidAmount, shippingCost]);

  //totalAmount Condition
  useEffect(() => {
    if (autoUp) return;
    if (totalAmount == "0") {
      form.setValue("conditionAmount", "0");
      form.setValue("discount", "-0");
    }
    if (!!tAmonutNum) {
      const cAmount = grandTotal + sCost;
      const cAmountStr = String(cAmount);
      form.setValue("conditionAmount", cAmountStr);
    }

    form.setValue("paidAmount", "0");
  }, [totalAmount]);
  //cAmountNum Condition
  useEffect(() => {
    if (autoUp) return;
    if (!tAmonutNum) return;
    const total = cAmountNum + paidAmountNumber;
    const dis = total - tAmonutNum - sCost;
    const disStr = String(dis);
    console.log(disStr);
    form.setValue("discount", disStr);
  }, [cAmountNum, sCost]);

  console.log(order);

  return (
    <>
      <AlertDialog open={isOpen}>
        <AlertDialogContent>
          <form onSubmit={handelQuantitySubmit} className="space-y-2">
            <AlertDialogHeader>
              <AlertDialogTitle>Enter product quantity</AlertDialogTitle>
              <Input
                onChange={(e) => handelQuantity(e)}
                defaultValue={1}
                placeholder="Product quantity"
                min="1"
                type="number"
              />
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setIsOpen(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction type="submit">Continue</AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="deliveryType"
            render={({ field }) => (
              <FormItem className="space-y-2 pb-3">
                <FormLabel>Delivery type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="grid grid-cols-2 sm:flex gap-4"
                  >
                    <FormItem className="flex items-center space-x-1 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="home" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Home Delivery
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-1 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="point" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Point Delivery
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-1 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="hub" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Hub Delivery
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem className="pb-3">
                <Label>Contact Number</Label>
                <FormControl>
                  <Input
                    placeholder="+880"
                    className="hide-stepper"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="pb-3">
                <Label>Customer Name</Label>
                <FormControl>
                  <Input placeholder="name" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="pb-3">
                <Label>Customer Address</Label>
                <FormControl>
                  <Textarea
                    placeholder="address"
                    {...field}
                    className="resize-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* search field  */}
          <div className="relative pb-3">
            {!product?.length && <Label>Search Product</Label>}

            <div className="w-full flex flex-col justify-between">
              {!!product?.length && (
                <>
                  <Label className="pb-2">Product</Label>
                  <table className="w-full mb-3 whitespace-nowrap table-auto border">
                    <thead className="text-xs sm:text-base font-semibold tracking-wide text-left  uppercase bg-slate-800 border-slate-800 border-2 text-slate-50">
                      <tr>
                        <th className="px-2 sm:px-4 sm:py-1 ">SL</th>
                        <th className="px-2 sm:px-4 sm:py-1 ">Item</th>
                        <th className="px-2 sm:px-4 sm:py-1 ">Qty</th>
                        <th className="px-2 sm:px-4 sm:py-1 ">Price</th>
                        <th className="px-2 sm:px-4 sm:py-1 ">Total</th>
                        <th className="px-2 sm:px-4 sm:py-1 ">RMV</th>
                      </tr>
                    </thead>
                    <tbody className=" divide-y">
                      {product &&
                        product?.map((i, index) => (
                          <tr key={index}>
                            <td className="px-2 sm:px-4 sm:py-1 font-bold">
                              <span className="text-xs sm:text-base">
                                {index + 1 <= 9 ? `0${index + 1}` : index + 1}
                              </span>
                            </td>
                            <td className="px-2 sm:px-4 sm:py-1 font-medium">
                              <span className="text-xs sm:text-base truncate">
                                {i?.productName}
                              </span>
                            </td>

                            <td className="px-2 sm:px-4 py-1">
                              <span className="text-xs sm:text-base font-semibold ">
                                {i?.quantity}
                                {i?.unit}
                              </span>
                            </td>
                            <td className="px-2 sm:px-4 sm:py-1">
                              <span className="text-xs sm:text-base font-semibold ">
                                {i.sellingPrice}
                              </span>
                            </td>
                            <td className="px-2 sm:px-4 sm:py-1">
                              <span className="text-xs sm:text-base font-semibold ">
                                {i.totalAmount}/-
                              </span>
                            </td>
                            <td className="px-11 py-1">
                              <span
                                className="text-base cursor-pointer hover:text-red-600 font-semibold"
                                onClick={() => removeItem(i)}
                              >
                                <RiDeleteBin7Line />
                              </span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </>
              )}

              {searchActive && (
                <Input
                  onChange={searchItem}
                  value={searchVal}
                  placeholder="Search"
                  type="text"
                />
              )}
            </div>
            {!!filterProduct && (
              <ul className="border w-fit mt-2">
                {filterProduct?.map((i) => (
                  <li
                    key={i?._id}
                    className="justify-between cursor-pointer font-serif font-medium py-2 transition-colors duration-150 hover:bg-gray-100 hover:text-green-500 border-b-2 last:border-none px-4"
                    onClick={() => handelSelect(i)}
                  >
                    <span className="flex items-center gap-3 text-xs sm:text-sm">
                      <span>Title: </span>
                      <span>{i.productName} ({i.sku})</span>
                      <span>Unit:</span>
                      <span>
                        {i.slug}
                        {i.unit}
                      </span>
                      <span>Price: </span>
                      <span className="font-sans font-bold">
                        {i.sellingPrice}/-
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <div className="flex gap-2 justify-end">
              {autoUp && (
                <div className="flex justify-end py-2">
                  <Button
                    className="cursor-pointer"
                    onClick={() => setAutoUp(false)}
                  >
                    <FaRegEdit />
                    Edit Amount
                  </Button>
                </div>
              )}
              {!searchActive && (
                <div className="flex justify-end py-2">
                  <Button
                    className="cursor-pointer"
                    onClick={() => setSearchActive(true)}
                  >
                    <IoMdAdd />
                    Add
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="grid pb-3 grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-6">
            <FormField
              control={form.control}
              name="totalAmount"
              render={({ field }) => (
                <FormItem>
                  <Label>Total Amount</Label>
                  <FormControl>
                    <Input
                      placeholder="product price"
                      className="hide-stepper"
                      min="0"
                      type="number"
                      disabled
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="paidAmount"
              render={({ field }) => (
                <FormItem>
                  <Label>Paid Amount</Label>
                  <FormControl>
                    <Input
                      placeholder="paid amount"
                      className="hide-stepper"
                      min="0"
                      type="number"
                      disabled={autoUp}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shippingCost"
              render={({ field }) => (
                <FormItem>
                  <Label>
                    Shipping Cost:{" "}
                    <span className="uppercase text-xs font-semibold">
                      ({deliveryType})
                    </span>
                  </Label>
                  <FormControl>
                    <Input
                      placeholder="shipping cost"
                      className="hide-stepper"
                      min="0"
                      type="number"
                      disabled={autoUp}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid pb-3 grid-cols-2 gap-2 sm:gap-6">
            <FormField
              control={form.control}
              name="conditionAmount"
              render={({ field }) => (
                <FormItem className="pb-3">
                  <Label>Condition Amount</Label>
                  <FormControl>
                    <Input
                      placeholder="COD amount"
                      className="hide-stepper"
                      min="0"
                      type="number"
                      disabled={autoUp}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem className="pb-3">
                  <Label>Discount</Label>
                  <FormControl>
                    <Input
                      placeholder="-0"
                      className="hide-stepper"
                      max="0"
                      type="number"
                      disabled
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="courier"
            render={({ field }) => (
              <FormItem className="pb-3">
                <FormLabel>Delivery pratner</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select courier" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Courier</SelectLabel>
                      <SelectItem value="SteadFast">SteadFast</SelectItem>
                      <SelectItem value="Pathao">Pathao</SelectItem>
                      <SelectItem value="RED-X">RED-X</SelectItem>
                      <SelectItem value="Sundorbon">Sundorbon</SelectItem>
                      <SelectItem value="HUB">HUB</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem className="pb-3">
                <Label>Note</Label>
                <FormControl>
                  <Textarea
                    placeholder="note"
                    {...field}
                    className="resize-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="button"
            onClick={handleReset}
            className="w-full !mt-6 bg-orange-500 cursor-pointer"
          >
            Reset
          </Button>
          <Button
            type="submit"
            className="w-full !mt-6 cursor-pointer bg-green-500"
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isUpdate ? "Update" : "Submit"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default OrderFrom;

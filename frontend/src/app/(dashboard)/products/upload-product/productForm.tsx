"use client";
import React, { useEffect, useState } from "react";
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
import { Input } from "src/app/components/ui/input";
import { Button } from "@radix-ui/themes";
import { Loader2 } from "lucide-react";
import { Label } from "../../../components/ui/label";
import { Textarea } from "src/app/components/ui/textarea";
import SummaryApi from "common";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectUser } from "src/app/redux/slices/userSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import uploadImage from "../../../utils/uploadImage";

const formSchema = z.object({
  sku: z.string().min(2, {
    message: "product sku is a required field",
  }),
  slug: z.string().min(0, {
    message: "product sku is a required field",
  }),
  unit: z.string().min(0, {
    message: "product sku is a required field",
  }),
  productName: z.string().min(1, {
    message: "product name is a required field",
  }),
  stock: z.string().min(1, {
    message: "product stock is a required field",
  }),
  productImage: z.array(z.string()).optional(),
  price: z.string().min(0, {
    message: "product price is a required field",
  }),
  sellingPrice: z.string().min(0, {
    message: "product selling Price is a required field",
  }),
  category: z.string({
    required_error: "Please select a category to display.",
  }),
  description: z.string().min(0, {
    message: "description is a required field",
  }),
});

const ProductForm = () => {
  const [loading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");
  const [product, setProduct] = useState({
    slug: "",
    stock: "",
    sku: "",
    productName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });

  const user = useSelector(selectUser);

  const router = useRouter();

  const searchParams = useSearchParams();
  const fullPath = searchParams.toString();
  const path = fullPath.replace(/=/g, "");

  //fetch Single Order
  const fetchProductByID = async (path: any) => {
    setLoading(true);
    const response = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productId: path,
      }),
    });
    setLoading(false);
    const dataReponse = await response.json();
    if (dataReponse.success) {
      form.reset(dataReponse?.data);
      setProduct(dataReponse?.data);
      setIsUpdate(true);
    }
  };

  const handleUploadProduct = async (e: any) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);

    setProduct((preve: any) => {
      return {
        ...preve,
        productImage: [...preve.productImage, uploadImageCloudinary.url],
      };
    });
  };

  const handleDeleteProductImage = async (index: any) => {
    const newProductImage = [...product.productImage];
    newProductImage.splice(index, 1);

    setProduct((preve) => {
      return {
        ...preve,
        productImage: [...newProductImage],
      };
    });
  };

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      slug: "",
      stock: "",
      sku: "",
      unit: "",
      productName: "",
      category: "",
      productImage: [],
      description: "",
      price: "",
      sellingPrice: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    console.log(product, product.productImage)

    if (isUpdate) {
      const data = { ...product, ...values, productImage: product.productImage };
      const dataResponse = await fetch(SummaryApi.updateProduct.url, {
        method: SummaryApi.updateProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(dataApi.message);
        form.reset();
        router.push(`/products/id?${dataApi?.data?._id}`);
      }

      if (dataApi.error) {
        toast.error(dataApi.message);
      }
    } else {
      const productData = { ...values, productImage: product?.productImage };
      const dataResponse = await fetch(SummaryApi.uploadProduct.url, {
        method: SummaryApi.uploadProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(productData),
      });
      const dataApi = await dataResponse.json();
      if (dataApi.success) {
        toast.success(dataApi?.message);
        form.reset();
        router.push(`/products/id?${dataApi?.data?._id}`);
      }
      if (dataApi.error) {
        toast.error(dataApi.message);
      }
    }
    setLoading(false);
  };

  const handleReset = async () => {
    if (isUpdate) {
      fetchProductByID(path);
    } else {
      form.reset(); // Resets the form fields to their default values
    }
  };

  useEffect(() => {
    fetchProductByID(path);
  }, [path]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="sku"
          render={({ field }) => (
            <FormItem className="pb-3">
              <Label>Product SKU</Label>
              <FormControl>
                <Input placeholder="sku" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="productName"
          render={({ field }) => (
            <FormItem className="pb-3">
              <Label>Product Name</Label>
              <FormControl>
                <Input placeholder="Product title" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="pb-3">
              <FormLabel>Product Category</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
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
          name="description"
          render={({ field }) => (
            <FormItem className="pb-3">
              <Label>Descriptions</Label>
              <FormControl>
                <Textarea
                  placeholder="About product"
                  {...field}
                  className="resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <label htmlFor="productImage" className="mt-3">
          Product Image :
        </label>
        <label htmlFor="uploadImageInput">
          <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
            <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
              <span className="text-4xl">
                <FaCloudUploadAlt />
              </span>
              <p className="text-sm">Upload Product Image</p>
              <input
                type="file"
                id="uploadImageInput"
                className="hidden"
                onChange={handleUploadProduct}
              />
            </div>
          </div>
        </label>
        <div>
          {product?.productImage[0] ? (
            <div className="flex items-center gap-2">
              {product.productImage.map((el, index) => {
                return (
                  <div className="relative group" key={index}>
                    <img
                      src={el}
                      alt={el}
                      width={80}
                      height={80}
                      className="bg-slate-100 border cursor-pointer"
                      onClick={() => {
                        setOpenFullScreenImage(true);
                        setFullScreenImage(el);
                      }}
                    />

                    <div
                      className="absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer"
                      onClick={() => handleDeleteProductImage(index)}
                    >
                      <MdDelete />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-red-600 text-xs">*Please upload product image</p>
          )}
        </div>
        <FormField
          control={form.control}
          name="productImage"
          render={({ field }) => (
            <FormItem>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <Label>Product Slug</Label>
              <FormControl>
                <Input
                  placeholder="Slug"
                  className="hide-stepper"
                  min="0"
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
          name="unit"
          render={({ field }) => (
            <FormItem>
              <Label>Unit</Label>
              <FormControl>
                <Input placeholder="Unit" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid pb-3 grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-6">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <Label>Price</Label>
                <FormControl>
                  <Input
                    placeholder="Price"
                    className="hide-stepper"
                    min="0"
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
            name="sellingPrice"
            render={({ field }) => (
              <FormItem>
                <Label>Selling Price</Label>
                <FormControl>
                  <Input
                    placeholder="Selling price"
                    className="hide-stepper"
                    min="0"
                    type="number"
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
          name="stock"
          render={({ field }) => (
            <FormItem>
              <Label>Product Stock</Label>
              <FormControl>
                <Input
                  placeholder="Stock"
                  className="hide-stepper"
                  min="0"
                  type="number"
                  {...field}
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
          className="w-full !mt-6 cursor-pointer"
          disabled={loading}
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isUpdate ? "Update" : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;

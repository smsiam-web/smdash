"use client";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation"; // Use Next.js search
import SummaryApi from "../../../../common";

const SearchProduct = () => {
  const search = useSearchParams();
  console.log(search) // Get the 'search' query parameter
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(search);

  const fetchProduct = async () => {
    if (!search) return; // Prevent fetching if search query is not available
    setLoading(true);
    const response = await fetch(`${SummaryApi.searchProduct.url}?${search}`);
    const dataResponse = await response.json();
    setLoading(false);
    
    console.log(dataResponse.data)

    setData(dataResponse.data);
  };

  useEffect(() => {
    fetchProduct();
  }, [search]);

  return (
    <div className="container mx-auto p-4">
      {loading && <p className="text-lg text-center">Loading ...</p>}

      <p className="text-lg font-semibold my-3">
        Search Results: {data.length}
      </p>

      {data.length === 0 && !loading && (
        <p className="bg-white text-lg text-center p-4">No Data Found....</p>
      )}

      {/* Uncomment and use when you have the VerticalCard component */}
      {/* {data.length !== 0 && !loading && (
        <VerticalCard loading={loading} data={data} />
      )} */}
    </div>
  );
};

export default SearchProduct;

import React, { ReactElement, useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { useRouter } from "next/router";
import GlobalLayout from "../../components/layouts/GlobalLayout";
import axiosClient from "../../library/axiosClient";
import { productCart } from "../../configs/product";
import Menu from "../../components/NavMenu/NavMenu";
import PageProductContent from "../../components/PageProductContent/PageProductContent";

interface Props {
  category: [];
}
export default function Products() {
  const router = useRouter();
  const { slugCategory,name,description }= router.query;
  console.log('data nhận vào ',{ slugCategory,name,description });
  
  const [listProducts, setListProducts] = useState<Array<productCart>>([]);
  useEffect(() => {
    async function getProductsByCate() {
      const products = await axiosClient.get(
        `/api/products?category=${slugCategory}`
      );
      setListProducts(products.data);
    }
    getProductsByCate();
  }, [slugCategory]);

  return (
    <>
    <PageProductContent data={listProducts} pageName={name} pageTitle={description} handlePaging={() => {}} />
    </>
  );
}

Products.getLayout = function getLayout(page: ReactElement) {
  return <GlobalLayout>{page}</GlobalLayout>;
};

import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import type { ReactElement } from "react";
const inter = Inter({ subsets: ["latin"] });
import GlobalLayout from "../components/layouts/GlobalLayout";
import ImageC from "../components/Image";
import ProductCard from "../components/ProductCard";

export default function Home() {
  return (
    <>
      <Head>
        <title>Smart Device</title>
        <meta name="description" content="Phụ kiện thông minh" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className="text-3xl font-bold underline">Hello world!2</h1>
        <div className="flex flex-row">
          <ProductCard
            data={{
              _id: "ikdgfakjf",
              name: "Tên Sản phẩmTên Sản phẩmTên Sản phẩmTên Sản phẩmTên Sản phẩmTên Sản phẩmTên Sản phẩmTên Sản phẩmTên Sản phẩmTên Sản phẩmTên Sản phẩmTên Sản phẩmTên Sản phẩmTên Sản phẩmTên Sản phẩmTên Sản phẩmTên Sản phẩmTên Sản phẩmTên Sản phẩmTên Sản phẩmTên Sản phẩmTên Sản phẩmTên Sản phẩmTên Sản phẩmTên Sản phẩmTên Sản phẩmTên Sản phẩmTên Sản phẩmTên Sản phẩmTên Sản phẩm",
              code: "Sp0001",
              price: 120000,
              discount: 12,
              priceDiscount: 110000,
              slug: "string",
              coverImageUrl: "uploads/products/63f6d8b9f8a2dee91af79bb8/a57_1.png",
            }}
          />
          <ProductCard
            data={{
              _id: "ikdgfakjf",
              name: "Tên Sản phẩm",
              code: "Sp0001",
              price: 120000,
              discount: 12,
              priceDiscount: 110000,
              slug: "string",
              coverImageUrl: "/",
            }}
          />
          <ProductCard
            data={{
              _id: "ikdgfakjf",
              name: "Tên Sản phẩm",
              code: "Sp0001",
              price: 120000,
              discount: 12,
              priceDiscount: 110000,
              slug: "string",
              coverImageUrl: "/",
            }}
          />
          <ProductCard
            data={{
              _id: "ikdgfakjf",
              name: "Tên Sản phẩm",
              code: "Sp0001",
              price: 120000,
              discount: 0,
              priceDiscount: 110000,
              slug: "string",
              coverImageUrl: "/",
            }}
          />
          <p>Thêm dòng này thêm dòng này lần 2</p>
        </div>
      </main>
    </>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <GlobalLayout>{page}</GlobalLayout>;
};

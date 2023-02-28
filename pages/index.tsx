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
    </>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <GlobalLayout>{page}</GlobalLayout>;
};

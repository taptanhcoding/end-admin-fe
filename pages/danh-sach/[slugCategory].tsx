import React, { useState } from "react";
import ProductCard from "../../components/ProductCard";
import { useRouter } from "next/router";
import classNames from "classnames/bind";
import styles from "../../styles/danhsach.module.scss";

interface Props {
  category: [];
}
const cx = classNames.bind(styles);
export default function Products() {
  const router = useRouter();
  const category = [
    {
      _id: "sd127gdsa71d",
      name: "Tai nghe Gaming Remax TWS-48",
      code: "p000000123123",
      price: 13000,
      discount: 3,
      priceDiscount: 71000,
      slug: "/iphone",
      coverImageUrl:
        "https://choihay.vn/images/products/2022/08/16/large/untitled-2_1660626162.jpg",
    },
    {
      _id: "sd127gdsa71d",
      name: "Tai nghe XY-70 chống ồn chủ động (ANC)",
      code: "p000000123123",
      price: 13000,
      discount: 5,
      priceDiscount: 71000,
      slug: "category2",
      coverImageUrl:
        "https://choihay.vn/images/products/2022/05/21/large/x-70_1653124704.jpg",
    },
    {
      _id: "sd127gdsa71d",
      name: "Tai nghe Ipod2 Rep 1:1",
      code: "p000000123123",
      price: 13000,
      discount: 10,
      priceDiscount: 71000,
      slug: "category3",
      coverImageUrl:
        "https://choihay.vn/images/products/2021/03/22/large/mrxj2-2_1616383497.jpg",
    },
    {
      _id: "sd127gdsa71d",
      name: "HiTune X5 TWS 2021",
      code: "p000000123123",
      price: 13000,
      discount: 9,
      priceDiscount: 71000,
      slug: "category4",
      coverImageUrl:
        "https://choihay.vn/images/products/2021/10/12/large/1_1634009946.png",
    },
    {
      _id: "sd127gdsa71d",
      name: "Tai nghe XY-80 TWS ",
      code: "p000000123123",
      price: 13000,
      discount: 7,
      priceDiscount: 71000,
      slug: "category5",
      coverImageUrl:
        "https://choihay.vn/images/products/2022/08/10/large/untitled1_1660097995.jpg",
    },
    {
      _id: "sd127gdsa71d",
      name: "Tai nghe I27 ProMax",
      code: "p000000123123",
      price: 13000,
      discount: 3,
      priceDiscount: 71000,
      slug: "category6",
      coverImageUrl:
        "https://choihay.vn/images/products/2020/01/03/large/i27-pro-max_1578050502.jpg",
    },
    {
      _id: "sd127gdsa71d",
      name: "Tai nghe XY-5 TWS",
      code: "p000000123123",
      price: 13000,
      discount: 6,
      priceDiscount: 71000,
      slug: "category7",
      coverImageUrl:
        "https://choihay.vn/images/products/2020/02/28/large/xy5_1582862884.jpg",
    },
    {
      _id: "sd127gdsa71d",
      name: "Tai nghe True Wireless - EDIFIER HECATE GM4 ",
      code: "p000000123123",
      price: 13000,
      discount: 8,
      priceDiscount: 71000,
      slug: "category8",
      coverImageUrl:
        "https://choihay.vn/images/products/2021/08/03/large/gm4-1_1628008173.jpg",
    },
  ];
  return (
    <>
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        width: "100%",
      }}
    >
      {category.map((item) => (
        <div key={item.name}>
          <ProductCard data={item} />
        </div>
      ))}
    </div>
    <div className={styles.pagination}>
        <a href="#">&laquo;</a>
        <a href="#">1</a>
        <a href="#">2</a>
        <a href="#">3</a>
        <a href="#">4</a>
        <a href="#">5</a>
        <a href="#">6</a>
        <a href="#">&raquo;</a>
      </div>
    </>
  );
}

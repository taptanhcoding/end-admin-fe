import React from "react";
import Link from "next/link";
import ImageC from "../Image/ImageC";
import classNames from "classnames/bind";
import styles from "./ProductCard.module.scss";
import { ImFire } from "react-icons/im";
import money from "../../library/formatMoney";

interface Props {
  data: {
    _id: string;
    name: string;
    code: string;
    price: number;
    discount: number;
    priceDiscount: number;
    slug: string;
    coverImageUrl: string;
  };
}

const cx = classNames.bind(styles);
export default function ProductCard({ data }: Props) {
  return (
    <Link
      href={`/san-pham/${data.slug}`}
      className={cx("wrapper", "flex flex-col border border-low-gray m-3 pb-4")}
    >
      <div className={cx("wrap-img", "relative overflow-hidden")}>
        <ImageC
          className={cx("object-contain hover:scale-125 ease-in duration-300 w-full")}
          // src={`${process.env.NEXT_PUBLIC_API_URL}/${data.coverImageUrl}`}
          src={data.coverImageUrl}
        />
        <p
          className={cx(
            "discount",
            "bg-yellow rounded-xl w-fit p-1 font-bold absolute bottom-0 left-4"
          )}
        >
          <span className={cx("text-main")}>
            <ImFire className={cx("inline")} />
          </span>
          <span> Giảm </span>
          <span className={cx("text-main")}>{data.discount} %</span>
        </p>
      </div>
      <div className={cx("wrap-content", "text-center")}>
        <p className={cx("wrap-content_name","px-4 pt-4 text-[13px] text-center limit-text")} title={data.name}>{data.name}</p>
        <p
          className={cx(
            "wrap-price",
            "flex flex-row items-center justify-center px-4 pt-4"
          )}
        >
          {data.discount > 0 ? (
            <>
              <span className={cx("wrap-price_new", "text-main text-2xl")}>
                {money(data.priceDiscount)}
              </span>
              <span className={cx("wrap-price_old", "line-through text-[13px] ml-5")}>
                {money(data.price)}
              </span>
            </>
          ) : (
            <span className={cx("wrap-price_new", "text-main text-2xl")}>
              {money(data.price)}
            </span>
          )}
        </p>
      </div>
    </Link>
  );
}

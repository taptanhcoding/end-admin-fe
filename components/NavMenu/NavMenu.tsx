import React, { useEffect, useState } from "react";
import Link from "next/link";
import classNames from "classnames/bind";
import styles from "./NavMenu.module.scss";
import { BsHeadphones, BsPhone, BsWatch, BsApple } from "react-icons/bs";
import { GiBatteryPack, GiCharging } from "react-icons/gi";
import { MdOutlineSurroundSound } from "react-icons/md";
import { AiFillAndroid, AiOutlineMenu } from "react-icons/ai";
import axiosClient from "../../library/axiosClient";
import ImageC from "../Image/ImageC";
import Slider from "react-slick";

interface MenuProps {
  type: string;
}

interface PropsItem {
  name: string;
  slug: string;
  description: string;
  coverImgUrl: string;
}

const cx = classNames.bind(styles);
function NavItem({ name, slug, coverImgUrl, description }: PropsItem) {
  return (
    <Link
      href={`/danh-sach/${slug}?name=${name}&description=${description}`}
      className={cx(
        "wrap-nav",
        "flex text-[15px] bg-white w-full p-[7px] hover:bg-main hover:text-white "
      )}
    >
      <span style={{ marginRight: "20px" }}>
        <ImageC
          src={`${process.env.NEXT_PUBLIC_API_URL}/${coverImgUrl}`}
          width="20"
          height="20"
        />
      </span>
      <span>{name}</span>
    </Link>
  );
}

export default function Menu({ type }: MenuProps) {
  const [categories, setCategory] = useState<Array<PropsItem>>([]);

  useEffect(() => {
    async function getCategories() {
      const rsCate = await axiosClient.get(`/api/categories`);
      setCategory(rsCate.data);
    }

    getCategories();
  }, []);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  switch (type) {
    case "1":
      return (
        <div className={cx("bg-white w-full")}>
          {categories?.map((item, i) => (
            <NavItem
              key={i}
              name={item.name}
              slug={item.slug}
              description={item.description}
              coverImgUrl={item.coverImgUrl}
            />
          ))}
        </div>
      );
      break;
    case "2":
      return (
        <>
          <button className={cx("dropdown", "relative")}>
            <div
              className={cx(
                "flex flex-row items-center bg-main p-4  w-[226px]"
              )}
            >
              <AiOutlineMenu />
              DANH SÁCH SẢN PHẨM
            </div>
            <div
              className={cx("dropdowncontent2", "absolute !bg-white w-[226px]")}
            >
              {categories?.map((item, i) => (
                <NavItem
                  description={item.description}
                  key={i}
                  name={item.name}
                  slug={item.slug}
                  coverImgUrl={item.coverImgUrl}
                />
              ))}
            </div>
          </button>
        </>
      );
      break;
    case "3":
      return (
        <div className={cx("bg-transparent w-full")}>
          <Slider {...settings}>
            {categories?.map((item, i) => (
              // <NavItem
              //   key={i}
              //   name={item.name}
              //   slug={item.slug}
              //   description={item.description}
              //   coverImgUrl={item.coverImgUrl}
              // />
              <Link
                className={cx(
                  "block text-center border border-main rounded-md py-2 px-10 text-14 whitespace-nowrap"
                )}
                key={i}
                href={`/danh-sach/${item.slug}?name=${item.name}&description=${item.description}`}
              >
                {item.name}
              </Link>
            ))}
          </Slider>
        </div>
      );
      break;
    default:
      return (
        <>
          <div>ERROR 404</div>
        </>
      );
      break;
  }
}

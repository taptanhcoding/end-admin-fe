import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import classNames from "classnames/bind";
import type { ReactElement } from "react";
const inter = Inter({ subsets: ["latin"] });
import GlobalLayout from "../components/layouts/GlobalLayout";
import ImageC from "../components/Image";
import ProductCard from "../components/ProductCard";
import axiosClient from "../library/axiosClient";
import Slider from "react-slick";
import { GetServerSideProps } from "next";

interface propsData {
  data: Array<{
    title: string;
    data: Array<{
      _id: string;
      name: string;
      code: string;
      price: number;
      discount: number;
      priceDiscount: number;
      slug: string;
      coverImgUrl: string;
    }>;
  }>;
}

const cx = classNames.bind(styles);
function Home({ data }: propsData) {
  console.log(data);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <Head>
        <title>Phụ kiện điện thoại, máy tính bảng - Smart Device</title>
        <meta name="description" content="Phụ kiện thông minh" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={cx("container mt-[15px!important]")}>
        <div className={cx("content-top")}></div>
        <div className={cx("content-center")}>
          <div className={cx("products-slide")}>
            {data.map((vl, index) => (
              <>
                <div key={index} className={cx("products-slide_top")}>
                  <h2
                    className={cx(
                      "product-slide-title",
                      "block relative uppercase text-white bg-main text-[1.8rem] leading-none"
                    )}
                  >
                    {vl.title}
                    <div className={cx("flag", "absolute bg-main")}></div>
                  </h2>
                </div>
                <div className={cx("products-slide_content", "p-[15px]")}>
                  <Slider {...settings}>
                    {vl.data.map((pr, i) => (
                      <ProductCard key={i} data={pr} />
                    ))}
                  </Slider>
                </div>
              </>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  let data = [];

  try {
    const spBc = await axiosClient.get("/api/products", {
      params: {
        category: "",
        position: "Bán chạy",
        page: 1,
        number: 16,
      },
    });
    const spTn = await axiosClient.get("/api/products", {
      params: {
        category: "tai-nghe",
        position: "Nổi bật",
        page: 1,
        number: 16,
      }
    });
    const spPn = await axiosClient.get("/api/products", {
      params: {
        category: "pin-du-phong",
        position: "Nổi bật",
        page: 1,
        number: 16,
      },
    });
    const spCs = await axiosClient.get("/api/products", {
      params: {
        category: "cu-sac-cap",
        position: "Nổi bật",
        page: 1,
        number: 16,
      },
    });
    const spAt = await axiosClient.get("/api/products", {
      params: {
        category: "am-thanh",
        position: "Nổi bật",
        page: 1,
        number: 16,
      },
    });

    let sp_ban_chay = {
      title: "Sản phẩm bán chạy",
      data: spBc.data,
    };
    data.push(sp_ban_chay);
    let tai_nghe = {
      title: "tai nghe nổi bật",
      data: spTn.data,
    };
    data.push(tai_nghe);
    let pin = {
      title: "pin dự phòng nổi bật",
      data: spPn.data,
    };
    data.push(pin);
    let cu_sac = {
      title: "củ, cáp sạc nổi bật",
      data: spCs.data,
    };
    data.push(cu_sac);
    let am_thanh = {
      title: "thiết bị âm thanh nổi bật",
      data: spAt.data,
    };
    data.push(am_thanh);
  } catch (error) {}

  return { props: { data } };
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <GlobalLayout>{page}</GlobalLayout>;
};

export default Home;

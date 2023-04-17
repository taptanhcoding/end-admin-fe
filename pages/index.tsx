import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import classNames from "classnames/bind";
const inter = Inter({ subsets: ["latin"] });
import ImageC from "../components/Image";
import ProductCard from "../components/ProductCard";
import axiosClient from "../library/axiosClient";
import Slider from "react-slick";
import { GetServerSideProps } from "next";
import Menu from "../components/NavMenu/NavMenu";
import { objectSlider } from "../configs/slider";
import { productCart } from "../configs/product";
import Sliders from "../components/Sliders/Slider";
import Link from "next/link";
import LinkByType from "../library/linkByType";

interface propsData {
  data: Array<{
    title: string;
    data: Array<productCart>;
  }>;
  sliders: {
    slider_main: Array<objectSlider>;
    slider_left: Array<objectSlider>;
    slider_right: Array<objectSlider>;
    banner: Array<objectSlider>;
  };
}

const cx = classNames.bind(styles);
function Home({ data, sliders }: propsData) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    slidesPerRow: 1,
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
      </Head>
      <main className={cx("container mt-[15px!important]")}>
        <div className={cx("content-top", "bg-white mb-4")}>
          <div className={cx("flex flex-col lg:flex-row")}>
            <div className={cx("content-top_nav", "w-1/6 hidden lg:block")}>
              <Menu type="1" />
            </div>
            <div className={cx("content-top_slide", "w-full lg:w-5/6 mb-2")}>
              <Sliders
                sliderMain={sliders.slider_main}
                sliderLeft={sliders.slider_left}
                sliderRight={sliders.slider_right}
                className={""}
              />
            </div>
            <div
              className={cx("content-top_nav", "w-full block lg:hidden mb-4")}
            >
              <Menu type="3" />
            </div>
          </div>
          <div className={cx("banner")}>
            <Link
              href={LinkByType({
                type: sliders.banner[0].to.type,
                to: sliders.banner[0].to.link,
              })}
            >
              <ImageC
                className={cx("w-full")}
                src={`${process.env.NEXT_PUBLIC_API_URL}/${sliders.banner[0].coverImgUrl}`}
                alt={sliders.banner[0].title}
              />
            </Link>
          </div>
        </div>
        <div className={cx("content-center")}>
          <div className={cx("products-slide")}>
            {data.map((vl, index) => (
              <div key={index} className={cx("bg-white mb-4")}>
                <div className={cx("products-slide_top", " bg-white")}>
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
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  let data = [];
  let sliders = {};

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
      },
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
    const slidersMain = await axiosClient.get("/api/sliders?type=slider");
    const slidersRight = await axiosClient.get(
      "/api/sliders?type=slider_right"
    );
    const slidersLeft = await axiosClient.get("/api/sliders?type=slider_left");
    const banner = await axiosClient.get("/api/sliders?type=banner");
    sliders = {
      slider_main: slidersMain.data,
      slider_left: slidersLeft.data,
      slider_right: slidersRight.data,
      banner: banner.data,
    };

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
  } catch (error) {
    console.log('Lỗi lấy data',error);
  }

  return { props: { data, sliders } };
};

export default Home;

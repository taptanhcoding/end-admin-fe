import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axiosClient from "../../library/axiosClient";
import { productDetail, productInOrder } from "../../configs/product";
import styles from "./detailProduct.module.scss";
import classNames from "classnames/bind";
import Slider from "react-slick";
import ImageC from "../../components/Image/ImageC";
import { TbShoppingCartPlus } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../redux/cart";
import Head from "next/head";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import Link from "next/link";
import Menu from "../../components/NavMenu/NavMenu";
import { AiFillCheckCircle } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);
export default function ProductDetail() {
  const ref = useRef();
  const route = useRouter();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [showDesc, setShowDesc] = useState(false);

  const { slugProduct } = route.query;
  const [productInfo, setProductInfo] = useState<productDetail>();
  const [optionProduct, setOptionProduct] = useState<{
    color?: string | undefined;
    quanity?: number;
    plus?: number;
  }>();
  useEffect(() => {
    async function getDetailProduct() {
      const detail = await axiosClient.get(`/api/products/${slugProduct}`);
      setProductInfo(detail.data);
    }
    getDetailProduct();
  }, [slugProduct]);
  useEffect(() => {
    if (productInfo) {
      ref.current.innerHTML = productInfo.description;
    }
  }, [productInfo]);

  function handleAddToCart() {
    dispatch(
      update({
        data: {
          productCode: productInfo?.code,
          price: productInfo?.price,
          name: productInfo?.name,
          discount: productInfo?.discount,
          coverImgUrl: productInfo?.coverImgUrl,
          slug: productInfo?.slug,
          option: optionProduct || {
            color: productInfo?.options[0].color,
            plus: productInfo?.options[0].plus,
            quanity: 1,
          },
        },
      })
    );
    
  }
  return (
    productInfo && (
      <>
        <Head>
          <title>{productInfo.name}</title>
        </Head>

        <main>
          <Breadcrumb
            items={[
              {
                title: <Link href={"/"}>Home</Link>,
              },
              {
                title: productInfo.name,
              },
            ]}
          />
          <div className={cx("container min-h-screen mb-10")}>
            <Menu type="2" />
            <div className={cx("pb-6 mb-4 text-[2.3rem]")}>
              {" "}
              <h1 className={cx("")}>{productInfo.name}</h1>
            </div>
            <div className={cx("content", "bg-white mt-10")}>
              <div className={cx("content-top", "grid grid-cols-1 lg:grid-cols-3")}>
                <div className={cx("slider", "pr-8")}>
                  <Slider
                    dots={false}
                    arrows={false}
                    slidesToShow={1}
                    slidesToScroll={1}
                  >
                    {productInfo.sliderImageUrl.map((vl, i) => (
                      <div key={i}>
                        {" "}
                        <ImageC
                          className={cx("object-contain !w-full")}
                          src={`${process.env.NEXT_PUBLIC_API_URL}/${vl}`}
                        />
                      </div>
                    ))}
                  </Slider>
                </div>
                <div className={cx("info", "mt-6  text-14  font-semibold pr-5")}>
                  <div className={cx("price", "border-b", "mb-8")}>
                    {productInfo.priceDiscount ? (
                      <>
                        <span className={cx("main-price", "text-main")}>
                          {Intl.NumberFormat().format(
                            productInfo.priceDiscount
                          )}{" "}
                          đ
                        </span>
                        <span
                          className={cx(
                            "disable-price",
                            "opacity-70 line-through"
                          )}
                        >
                          {Intl.NumberFormat().format(productInfo.price)} đ
                        </span>
                      </>
                    ) : (
                      <p className={cx("main-price", "text-main")}>
                        {Intl.NumberFormat().format(productInfo.price)} đ
                      </p>
                    )}
                  </div>
                  <div className={cx("option")}>
                    <p className={cx("flex flex-row")}>
                      Tình trạng :{" "}
                      {productInfo?.stock > 0 ? (
                        <span className={cx("status")}>
                          Còn hàng{" "}
                          <AiFillCheckCircle
                            className={cx("inline-block text-green")}
                          />
                        </span>
                      ) : (
                        <span className={cx("status")}>
                          Hêt hàng{" "}
                          <MdCancel className={cx("inline-block text-main")} />{" "}
                        </span>
                      )}
                    </p>
                    <div className={cx("flex flex-row")}>
                      {" "}
                      Chọn màu :
                      {productInfo.options.map((op, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            setOptionProduct({
                              color: op.color,
                              plus: Number.parseInt(op.plus),
                              quanity: 1,
                            });
                          }}
                          className={cx(
                            ` w-10 h-10 border mr-5`,
                            "option-color",
                            optionProduct?.color == op.color && "border-main"
                          )}
                          style={{ background: op.codeColor }}
                          title={`+ ${op.plus} đ`}
                        ></div>
                      ))}
                    </div>
                  </div>
                  <div
                    className={cx(
                      "promotion text-13 relative border border-[#ddd] mt-16 p-4 pt-9 mb-4 rounded-md"
                    )}
                  >
                    <p
                      className={cx(
                        "title bg-main text-white block py-1 px-4 rounded-md absolute top-[-13px]"
                      )}
                    >
                      Khuyến mãi
                    </p>
                    <ul className={cx("list-promo")}>
                      {[
                        { title: "Cam kết chính hãng" },
                        { title: "Miễn phí giao hàng toàn quốc" },
                      ].map((tt, i) => (
                        <li
                          className={cx("flex flex-row items-center")}
                          key={i}
                        >
                          <span className={cx("text-green text-base")}>
                            <FontAwesomeIcon
                              className=" w-[15px] h-[15px] mr-3"
                              icon={faCircleCheck}
                            />
                          </span>
                          {tt.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={cx("buttons")}>
                    <button
                      className={cx(
                        "button-add",
                        " text-white bg-main rounded-lg w-full p-4 flex flex-row"
                      )}
                      onClick={() => handleAddToCart()}
                    >
                      <TbShoppingCartPlus
                        className={cx("w-[37px] h-[37px] w-1/3 font-thin")}
                      />
                      <div className={cx("text-left flex-1")}>
                        <p className={cx("text-[1.8rem]")}>Mua ngay</p>
                        <p className={cx("text-14 font-thin")}>
                          Giao hàng toàn quốc
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
                <div className={cx("care",'hidden lg:block')}>
                  <div className={cx("bg-main text-white text-center px-5 py-2 text-[1.6rem]")}>Có thể bạn quan tâm</div>
                </div>
              </div>
              <div className={cx("wrap-desc", "p-5 pb-10")}>
                {" "}
                <div className={cx("content-bot",!showDesc ? "h-[300px] overflow-hidden": "")} ref={ref}></div>
                <div className={cx("w-full flex items-center justify-center")}>
                  <button
                    className={cx(
                      "mt-4 border border-[#e9e9e98a] p-5 px-10 text-2xl whitespace-pre rounded-md bg-[#f9f9f9] hover:bg-main hover:text-white"
                    )}
                    onClick={() => setShowDesc((prev) => !prev)}
                  >
                    {showDesc ? "Thu gọn" : "Xem tiếp"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    )
  );
}

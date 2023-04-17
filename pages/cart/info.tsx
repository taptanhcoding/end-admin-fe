import React, { ReactElement } from "react";
import { useForm } from "react-hook-form";
import classNames from "classnames/bind";
import styles from "./cart.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin2Line } from "react-icons/ri";
import { productCart, productInOrder } from "../../configs/product";
import axiosClient from "../../library/axiosClient";
import { useRouter } from "next/router";
import Head from "next/head";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import Link from "next/link";
import Menu from "../../components/NavMenu/NavMenu";
import { deleteAll, updateFromCart } from "../../redux/cart";
import { userState } from "../../configs/user";

type FormData = {
  fullname: string;
  phoneNumber: string;
  address: string;
  email?: string;
  description?: string;
  payment: string;
};

const cx = classNames.bind(styles);
export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useRouter();

  const {orderDetail,user} = useSelector(
    (state: { products: productInOrder[] ,user: userState}) => ({orderDetail: state.products,user: state.user})
  );
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues : user.data
  });

  async function handleOrder(value: FormData) {
    try {
      let orderInfo = {
        status: "ORDER",
        description: value.description,
        contactInformation: {
          fullname: value.fullname,
          phoneNumber: value.phoneNumber,
          email: value?.email,
        },
        shippingInformation: {
          address: value.address,
        },
        paymentInformation: {
          type: value.payment,
          status: false,
        },
        orderDetails: orderDetail,
      };
      console.log(orderInfo);
      
      let rs:{status: boolean};
      if(user.isLogin) {
        rs = await axiosClient.patch(`api/order/update`, orderInfo);
      }else {

        rs = await axiosClient.patch(`api/order/update-wallin`, orderInfo);
      }
      if (rs.status) {
        dispatch(deleteAll())
        navigate.push("/cart/success");
      }
    } catch (error) {
      console.log(error);
      
      console.log("Lỗi thêm đơn hàng");
    }
  }


  function handleChange(value:productInOrder,quanity:number) {
    dispatch(updateFromCart({data : value,quanity}))
  }
  return (
    <>
      <Head>
        <title>Thanh toán đơn hàng</title>
      </Head>
      <main className={cx("mb-8")}>
        <Breadcrumb
          items={[
            {
              title: <Link href={"/"}>Home</Link>,
            },
            {
              title: "Đơn hàng",
            },
          ]}
        />
        <div className={cx("detail-order")}>
          <Menu type="2" />
          <div className={cx("text-main border-b-2 border-b-[#EEE] mb-8")}>
            <h4 className={cx("w-fit text-[1.7rem] uppercase border-b-2")}>
              đơn hàng
            </h4>
          </div>
        </div>
        <div className={cx("total"," overflow-x-scroll")}>
          {orderDetail.length > 0 ? (
            <>
              <table
                className={cx(
                  "",
                  "w-full border-collapse border-2 border-[#EEE] text-14 min-w-[720px]"
                )}
              >
                <thead className={cx("head-tb")}>
                  <td className={cx("td", "border-2 border-[#EEE]")}> stt</td>
                  <td className={cx("td", "border-2 border-[#EEE]")}>
                    tên sản phẩm
                  </td>
                  <td className={cx("td", "border-2 border-[#EEE]")}>
                    số lượng
                  </td>
                  <td className={cx("td", "border-2 border-[#EEE]")}>
                    đơn giá (vnd)
                  </td>
                  <td className={cx("td", "border-2 border-[#EEE]")}>
                    tổng giá
                  </td>
                  <td className={cx("td", "border-2 border-[#EEE]")}>xóa</td>
                </thead>
                <tbody>
                  {orderDetail.map((pr, index) => (
                    <tr key={index}>
                      <td className={cx("td", "border-2 border-[#EEE]")}>
                        {index + 1}
                      </td>
                      <td className={cx("td", "border-2 border-[#EEE]")}>
                        <Link className={cx("hover:text-[#288ad6]")} href={`/san-pham/${pr.slug}`}>
                          {pr.name}
                        </Link>
                        <p>Màu:{pr.option.color}</p>
                      </td>
                      <td className={cx("td", "border-2 border-[#EEE]")}>
                        <input
                          type="number"
                          defaultValue={pr.option.quanity}
                          min={1}
                          onChange={(e) => {
                            handleChange(pr,Number.parseInt(e.target.value))
                          }}
                        />
                      </td>
                      <td className={cx("td", "border-2 border-[#EEE]")}>
                        {Intl.NumberFormat().format(pr.price)}
                      </td>
                      <td className={cx("td", "border-2 border-[#EEE]")}>
                        {Intl.NumberFormat().format(
                          (Number.parseFloat(pr?.price) +
                            Number.parseFloat(pr.option.plus)) *
                            pr.option.quanity
                        )}
                      </td>
                      <td className={cx("td", "border-2 border-[#EEE]")}>
                        <RiDeleteBin2Line className={cx("mx-auto")} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className={cx("text-right text-[1.5rem] mt-6")}>
                Thành tiền :{" "}
                <span className={cx("text-main")}>
                  {Intl.NumberFormat().format(
                    orderDetail.reduce(
                      (prev, pr) =>
                        prev +
                        (Number.parseFloat(pr?.price) +
                          Number.parseFloat(pr.option.plus)) *
                          pr.option.quanity,
                      0
                    )
                  )}{" "}
                  VNĐ
                </span>
              </div>
            </>
          ) : (
            <p className={cx("text-14")}>
              Giỏ hàng hiện tại chưa có sản phẩm nào
            </p>
          )}
        </div>
        <div className={cx("user-info mt-14 text-14 ")}>
          <h5 className={cx('font-bold')}>Thông tin đặt hàng</h5>
          <form onSubmit={handleSubmit((value) => handleOrder(value))}>
            {/* register your input into the hook by invoking the "register" function */}
            <div className={cx("form-item")}>
              <label>Họ và tên</label>
              <input
                defaultValue=""
                {...register("fullname", {
                  required: "Không được để trống tên !",
                })}
              />
              {errors.fullname && <span className={cx('ml-2 text-main')}>{errors.fullname?.message}</span>}
            </div>
            <div className={cx("form-item")}>
              <label>Điện thoại</label>
              <input
                defaultValue=""
                {...register("phoneNumber", {
                  required: "Số điện thoại là bắt buộc !",
                })}
              />
              {errors.phoneNumber && <span className={cx('ml-2 text-main')}>{errors.phoneNumber?.message}</span>}
            </div>
            <div className={cx("form-item")}>
              <label>Địa chỉ</label>
              <input
                defaultValue=""
                {...register("address", { required: "Địa chỉ là bắt buộc !" })}
              />
              {errors.address && <span className={cx('ml-2 text-main')}>{errors.address?.message}</span>}
            </div>
            <div className={cx("form-item")}>
              <label>Email</label>
              <input
                type="email"
                defaultValue=""
                {...register("email", {
                  pattern: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,required: "Vui lòng nhập email !"
                })}
              />
              {errors.email && <span className={cx('ml-2 text-main')}>{errors.email?.message}</span>}
            </div>
            <div className={cx("form-item")}>
              <label>Phương thức thanh toán</label>
              <input
                id="cash"
                type="radio"
                value={"Cash"}
                defaultValue=""
                {...register("payment")}
              />
              <label htmlFor="cash">Thanh toán khi nhận hàng</label>
              <input
                id="visa"
                type="radio"
                value={"Visa"}
                defaultValue=""
                {...register("payment")}
              />
              <label htmlFor="visa">Chuyển khoản</label>
            </div>
            <div className={cx("form-item")}>
              <label>Ghi chú cho shop</label>
              <textarea defaultValue="" {...register("description")} />
            </div>
            <input type="submit" value="Tiến hành đặt hàng" className={cx('bg-main block text-white px-4 py-3 rounded-lg cursor-pointer')} />
          </form>
        </div>
      </main>
    </>
  );
}

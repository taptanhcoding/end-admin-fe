import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { productCart } from "../../configs/product";
import { userState } from "../../configs/user";
import styles from "./profile.module.scss";
import classNames from "classnames/bind";
import Head from "next/head";
import axiosClient from "../../library/axiosClient";
import { login } from "../../redux/customer";
import { useRouter } from "next/router";

const cx = classNames.bind(styles);
export default function Profile() {
  const route = useRouter()
  const dispatch = useDispatch()
  const userInfo = useSelector(
    (state: { products: productCart; user: userState }) => state.user
  );
  console.log(userInfo);
  if(!userInfo.isLogin) {
    route.push('/user/login')
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues:userInfo.data
  });
  const onSubmit = async (data) => {
    try {
      let path = '/api/customer/update'
      console.log(data);
      if(data.password && data.new_password && data.new_password_confirm) {
        path += '?changepass=true'
      }
      const rsUp = await axiosClient.patch(path,data)
      console.log(rsUp);
      if(rsUp.status){
        dispatch(login({data: rsUp.data}))
      }
      
    } catch (error) {
      
    }
  };

  const [tab, setTab] = useState<number>(0);
  return (
    <>
      <Head>
        <title>Thông tin tài khoản</title>
      </Head>
      <div
        className={cx(
          "wrapper",
          "py-5 px-3 grid grid-cols-12 text-14 bg-white my-2 rounded-sm"
        )}
      >
        <div className={cx("sidebar", "col-span-3 flex flex-col")}>
          <div
            className={cx("pr-tab", `${tab === 0 && "!bg-[#ccc] text-white"}`)}
            onClick={() => setTab(0)}
          >
            Thông tin chung
          </div>
          <div
            className={cx("pr-tab", `${tab === 1 && "!bg-[#ccc] text-white"}`)}
            onClick={() => setTab(1)}
          >
            Đổi mật khẩu
          </div>
          <div
            className={cx("pr-tab", `${tab === 2 && "!bg-[#ccc] text-white"}`)}
            onClick={() => setTab(2)}
          >
            Lịch sử mua hàng
          </div>
        </div>
        <div className={cx("content", "col-span-9 p-3")}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {tab === 0 && (
              <div className={cx("w-full")}>
                <div className={cx("form-item")}>
                  <label>first name</label>
                  <input
                    className={cx("border rounded-sm")}
                    // defaultValue={userInfo.firstName}
                    {...register("firstName")}
                  />
                </div>
                <div className={cx("form-item")}>
                  <label>last name</label>
                  <input
                    className={cx("border rounded-sm")}
                    // defaultValue={userInfo.lastName}
                    {...register("lastName")}
                  />
                </div>
                <div className={cx("form-item")}>
                  <label>địa chỉ</label>
                  <input
                    className={cx("border rounded-sm")}
                    // defaultValue={userInfo.address}
                    {...register("address")}
                  />
                </div>
                <div className={cx("form-item")}>
                  <label>email</label>
                  <input
                    className={cx("border rounded-sm")}
                    // defaultValue={userInfo.email}
                    {...register("email")}
                  />
                </div>
                <div className={cx("form-item")}>
                  <label>địa chỉ</label>
                  <input
                    className={cx("border rounded-sm")}
                    // defaultValue={userInfo.address}
                    {...register("address")}
                  />
                </div>
                <div className={cx("form-item")}>
                  <label>điện thoại</label>
                  <input
                    className={cx("border rounded-sm")}
                    // defaultValue={userInfo.phoneNumber}
                    {...register("phoneNumber")}
                  />
                </div>
                <div className={cx("form-item")}>
                  <label>sinh nhật</label>
                  <input
                    className={cx("border rounded-sm")}
                    // defaultValue={userInfo.birthday}
                    {...register("birthday")}
                  />
                </div>
                <div className={cx("form-item")}>
                  <input
                    type="submit"
                    value={"Cập nhật thông tin "}
                    className={cx("bg-main text-white mt-5 cursor-pointer")}
                  />
                </div>
              </div>
            )}
            {tab === 1 && (
              <div className={cx("")}>
                <div className={cx("form-item")}>
                  <label>mật khẩu cũ</label>
                  <input
                    className={cx("border rounded-sm")}
                    {...register("password")}
                  />
                </div>
                <div className={cx("form-item")}>
                  <label>mật khẩu mới</label>
                  <input
                    className={cx("border rounded-sm")}
                    {...register("new_password")}
                  />
                </div>
                <div className={cx("form-item")}>
                  <label>mật khẩu mới(nhập lại)</label>
                  <input
                    className={cx("border rounded-sm")}
                    {...register("new_password_confirm")}
                  />
                </div>
                <div className={cx("form-item")}>
                  <input
                    type="submit"
                    value={"Đổi mật khẩu"}
                    className={cx("bg-main text-white mt-5 cursor-pointer")}
                  />
                </div>
              </div>
            )}
          </form>
          {tab === 2 && <div className={cx("")}>Các đơn hàng đã mua</div>}
        </div>
      </div>
    </>
  );
}

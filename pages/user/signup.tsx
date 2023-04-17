import React from "react";
import { useForm } from "react-hook-form";
import classNames from "classnames/bind";
import styles from "./login.module.scss";
import Link from "next/link";
import Head from "next/head";
import axiosClient from "../../library/axiosClient";
import { useRouter } from 'next/router';

const cx = classNames.bind(styles);
export default function Signup() {
  const route = useRouter()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  async function handleSignup(value) {
    try {
      const rs = await axiosClient.post('/api/customer/register',value)
      console.log('đăng ký ',rs);
      if(rs.status) {
        route.push('/user/login')
      }
    } catch (error) {
      
    }
  }

  return (
    <>
      <Head>
        <title>Đăng ký </title>
      </Head>
      <div
        className={cx(
          "wrap-signup",
          "bg-white w-[500px] max-w-full mx-auto p-5"
        )}
      >
        <h3 className={cx("title")}>Signup</h3>
        <form onSubmit={handleSubmit(handleSignup)}>
          <div className={cx("form-item")}>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Vui lòng nhập trường này",
              })}
              placeholder=" "
            />
            {errors.email && (
              <span className={cx("absolute left-0 bottom-0")}>
                {errors?.email?.message}
              </span>
            )}
            <label htmlFor="email">Email</label>
          </div>
          <div className={cx("form-item")}>
            <input
              id="username"
              {...register("username", {
                required: "Vui lòng nhập trường này",
              })}
              placeholder=" "
            />
            {errors.username && (
              <span className={cx("absolute left-0 bottom-0")}>
                {errors?.username?.message}
              </span>
            )}
            <label htmlFor="username">User</label>
          </div>
          <div className={cx("form-item")} onSubmit={handleSignup}>
            <input
              id="password"
              {...register("password", {
                required: "Mật khẩu không được bỏ trống",
              })}
              placeholder=" "
            />
            {errors.password && (
              <span className={cx("absolute left-0 bottom-0")}>
                {errors?.password?.message}
              </span>
            )}

            <label htmlFor="password">Password</label>
          </div>
          <div className={cx("form-item")} onSubmit={handleSignup}>
            <input
              id="confirm_password"
              {...register("confirm_password", {
                required: "Mật khẩu không được bỏ trống",
              })}
              placeholder=" "
            />
            {errors.confirm_password && (
              <span className={cx("absolute left-0 bottom-0")}>
                {errors?.confirm_password?.message}
              </span>
            )}

            <label htmlFor="confirm_password">Confirm Password</label>
          </div>
          <div className={cx("form-item")} onSubmit={handleSignup}>
            <input
              className={cx("!border-none bg-main text-white !w-fit !px-10")}
              type="submit"
              value={"Signup"}
            />
          </div>
        </form>
        <div className={cx("text-14")}>
          Bạn đã có tài khoản ?{" "}
          <Link href={"/user/login"} className="text-main">
            Đăng nhập
          </Link>
        </div>
      </div>
    </>
  );
}

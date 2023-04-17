import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";
import styles from "./login.module.scss";
import classNames from "classnames/bind";
import Link from "next/link";
import Head from "next/head";
import axiosClient from "../../library/axiosClient";
import { useDispatch } from "react-redux";
import { login } from "../../redux/customer";

const cx = classNames.bind(styles);
const LoginPage = () => {
  const dispatch = useDispatch()
  const route = useRouter()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const router = useRouter();
  const handleLogin = async (value) => {
    console.log(value);
    try {
      const rs = await axiosClient.post('api/customer/login',value)
      if(rs.status) {
        localStorage.setItem('token', rs.token)
        localStorage.setItem('refreshToken',rs.refreshToken)
        route.push('/')
      }
      
    } catch (error) {
      console.log(error);
      
    }
    
  };

  return (
    <>
    <Head>
      <title>Đăng nhập</title>
    </Head>
      <div className={cx('container')}>
        <div className={cx('wrap-login','mx-auto max-w-full w-[500px] px-5 py-10 min-h-[300px] flex flex-col justify-center')}>
          <h2 className={cx('title')}>Login</h2>
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className={cx("form-item")}>
              <input
                id="email"
                {...register("email", { required: "Vui lòng nhập trường này" })}
                placeholder=" "
              />
              {errors.email && <span className={cx('absolute left-0 bottom-0')}>{errors?.email?.message}</span>}
              <label htmlFor="email">User</label>
            </div>
            <div className={cx("form-item")} onSubmit={handleLogin}>
              <input
                id="password"
                {...register("password", { required: "Mật khẩu không được bỏ trống" })}
                placeholder=" "
              />
              {errors.password && <span  className={cx('absolute left-0 bottom-0')}>{errors?.password?.message}</span>}
    
              <label htmlFor="password">Password</label>
            </div>
            <div className={cx("form-item")} onSubmit={handleLogin}>
              <input
              className={cx('!border-none bg-main text-white !w-fit !px-10 cursor-pointer')}
                type="submit"
                value={'Login'}
              />
              
    
            </div>
          </form>
          <div className={cx('text-14 ')}>Bạn chưa có tài khoản ? <Link className="text-main" href={'/user/signup'}>Đăng ký</Link></div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;

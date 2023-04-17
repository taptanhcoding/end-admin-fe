import Head from "next/head";
import React from "react";

export default function Success() {
  return (
    <>
      <Head>
        <title>Thông báo đơn hàng</title>
      </Head>{" "}
      <div className="py-10 text-14">Đơn hàng đã được xử lý thành công, kiểm tra email của bạn !</div>
    </>
  );
}

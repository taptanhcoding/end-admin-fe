import React from "react";
import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import Link from "next/link";
import imgs from './img/imgs'
import ImageC from "../../../Image/ImageC";
import Image from "next/image";

const cx = classNames.bind(styles);
export default function Footer() {
  return (
    <div className={cx("container ")}>
      <div className={cx("bg-main rounded-2xl p-16 text-white")}>
        <div className={cx("footer-top", "flex  flex-col md:flex-row")}>
          <div
            className={cx(
              "footer-top_menu",
              " flex  sm:flex-col md:flex-row w-full md:w-2/4"
            )}
          >
            <div className={cx("menu-item", "w-full sm:mb-4 md:w-2/4 ")}>
              <p className={cx("text-[17px] font-bold mb-6")}>SMARTDEVICE</p>
              <ul className={cx("text-14")}>
                {[
                  {
                    label: "Giới thiệu",
                    link: "/",
                  },
                  {
                    label: "Thời gian làm việc( 8h30-17h từ T2-T7 )",
                    link: false,
                  },
                ].map(
                  (vl, index): JSX.Element => (
                    <li key={index} className={cx("mb-6")}>
                      {vl.link ? <Link href={"/"}>{vl.label}</Link> : vl.label}
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className={cx("menu-item", "w-full sm:mb-4 md:w-2/4 ")}>
              <p className={cx("text-[17px] font-bold mb-6")}>
                HỖ TRỢ KHÁCH HÀNG
              </p>
              <ul className={cx("text-14")}>
              {[
                  {
                    label: "Chính sách, quy định chung",
                    link: "/",
                  },
                  {
                    label: "Chính sách vận chuyển",
                    link: '/',
                  },
                  {
                    label: "Chính sách bảo hành",
                    link: '/',
                  },
                  {
                    label: "Chính sách đổi trả",
                    link: '/',
                  },
                ].map(
                  (vl, index): JSX.Element => (
                    <li key={index} className={cx("mb-6")}>
                      {vl.link ? <Link href={"/"}>{vl.label}</Link> : vl.label}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
          <div className={cx("footer-top_address", " w-full md:w-2/4")}>
            <p className={cx("text-[17px] font-bold mb-6")}>
              HỆ THỐNG CỦA HÀNG
            </p>
            <ul className={cx("text-14")}>
              <li className={cx("mb-6")}>
                <b>- Địa chỉ mua hàng:</b> Số 2 Lê Văn Thiêm, Nhân Chính, Thanh
                Xuân, Hà Nội{" "}
                <p>
                  <b>Hotline</b>: 0366696660
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div className={cx("footer_im", "flex  sm:flex-col md:flex-row")}>
          <div
            className={cx(
              "footer-top_menu",
              " flex flex-col sm:w-full md:w-2/4"
            )}
          >
            <div className={cx("menu-item", "sm:w-full sm:mb-4 md:w-full ")}>
              <p className={cx("text-[17px] font-bold mb-6")}>
                PHƯƠNG THỨC THANH TOÁN
              </p>
              <ul className={cx("text-14 mb-6 flex flex-row")}>
                {Object.values(imgs.payType).map((vl,index):JSX.Element => <li key={index} className={cx("mb-6 mr-5 rounded-t-2xl rounded-b-xl overflow-hidden")}>
                  <ImageC src={vl} width={50} height={40} alt='' />
                </li>)}
              </ul>
            </div>
            <div className={cx("menu-item", "sm:w-full sm:mb-4 md:w-full ")}>
              <p className={cx("text-[17px] font-bold mb-6")}>
                HÌNH THỨC VẬN CHUYỂN
              </p>
              <ul className={cx("text-14")}>
                <li className={cx("mb-6 rounded-t-2xl rounded-b-xl overflow-hidden w-fit")}>
                  <ImageC src={imgs.deliver} width={50} height={40} alt=''/>
                </li>
              </ul>
            </div>
          </div>
          <div className={cx("footer-top_address", "md:w-2/4")}>
            page FB
          </div>
        </div>
        <div className={cx("copy", "text-14 text-center")}>
          © CHOIHAY. All Rights Reserved
        </div>
      </div>
    </div>
  );
}

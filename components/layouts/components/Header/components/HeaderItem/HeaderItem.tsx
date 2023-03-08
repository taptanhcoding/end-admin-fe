import React from "react";
import classNames from "classnames/bind";
import Link from "next/link";
import styles from "./HeaderItem.module.scss";

interface Props {
  icon: JSX.Element;
  content: JSX.Element | string;
  quanity: number | null | undefined;
  type: string;
  link: string;
}
const cx = classNames.bind(styles);
function WrapTag({
  children,
  type,
  link,
  className,
}: {
  children: JSX.Element | JSX.Element[];
  type: string;
  link: string;
  className: string;
}) {
  switch (type) {
    case "link":
      return (
        <Link href={link} className={className}>
          {children}
        </Link>
      );
      break;

    default:
      return <div className={className}>{children}</div>;
      break;
  }
}
export default function HeaderItem({
  icon,
  content,
  quanity,
  type,
  link = "",
}: Props) {
  return (
    <WrapTag
      link={link}
      type={type}
      className={cx(
        "sm:m-[26px] lg:m-[5px] m-[7px] flex flex-row items-center"
      )}
    >
      <div
        className={cx(
          "lg:text-[20px] w-[36px] h-[36px] rounded-[12px] text-main bg-white p-[5px] sm:rounded-[24px]  md:text-[17px] md:text-main p-[8px] relative"
        )}
      >
        {icon}
        {quanity !== null && (
          <p
            className={cx(
              "absolute text-main top-[40%] left-[50%] text-[1.4rem] translate-y-[-60%] translate-x-[-50%] leading-none"
            )}
          >
            {quanity}
          </p>
        )}
      </div>
      <div
        className={cx(
          "text-white lg:text-[15px]  md:text-[8px] ml-[7px] mt-[3px]"
        )}
      >
        {content}
      </div>
    </WrapTag>
  );
}

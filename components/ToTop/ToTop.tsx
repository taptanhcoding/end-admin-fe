import classNames from "classnames/bind";
import styles from "./ToTop.module.scss";
import { ArrowTop } from "../IconD/IconDs";

const cx = classNames.bind(styles);
function ToTop() {
  return (
    <div
      className={cx(
        "fixed w-[42px] h-[42px] right-10 bottom-40 bg-main text-white p-6 rounded-full cursor-pointer opacity-60 border border-white"
      )}
      onClick={() => {
        
        window.scrollTo({top: 0 ,behavior: 'smooth'})  
      }}
    >
      <ArrowTop fill='white' />
    </div>
  );
}

export default ToTop;

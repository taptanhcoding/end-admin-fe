import React, { ReactElement, useState, useRef, useEffect } from "react";
import { objectSlider } from "../../configs/slider";
import Slider from "react-slick";
import classNames from "classnames/bind";
import styles from "./Sliders.module.scss";
import Link from "next/link";
import ImageC from "../Image/ImageC";
import LinkByType from "../../library/linkByType";
import { useRouter } from "next/router";

interface sliderProps {
  sliderMain: Array<objectSlider>;
  sliderLeft: Array<objectSlider>;
  sliderRight: Array<objectSlider>;
  className: string;
}

function setWidth({ ...prop }: sliderProps) {
  let widths = {
    widthLeft: "w-0",
    widthMain: "w-full",
    widthRight: "w-0",
  };
  let wLeft = false;
  let wRight = false;
  if (prop.sliderLeft.length > 0) {
    (widths.widthLeft = "w-1/4"), (wLeft = true);
  }
  if (prop.sliderRight.length > 0) {
    widths.widthRight = "w-1/4";
    wRight = true;
  }
  if (wLeft || wRight) {
    if (wLeft && wRight) {
      widths.widthMain = "w-1/2";
    } else {
      widths.widthMain = "md:w-3/4";
    }
  }

  return widths;
}

const cx = classNames.bind(styles);
export default function Sliders({ ...props }: sliderProps) {
  const navigate = useRouter();
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const slide1 = useRef();
  const slide2 = useRef();
  const widths = setWidth(props);
  const [main, setMain] = useState<Array<objectSlider>>(props.sliderMain);
  const [activeSl, setActiveSl] = useState<Number>(0);
  const [isMove, setMove] = useState(false);
  const [mouseP, setMouseP] = useState(0);
  const settings = {
    adaptiveHeight: true,
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (current: number) => {
      setActiveSl(current);
    },
    beforeChange: (current: number) => {
      setActiveSl(current);
    },
    customPaging: (i: number) => (
      <div
        className={cx(
          ` w-4 h-4 rounded-full bg-[#ccc] ${
            i == activeSl && "!bg-main"
          } text-14 p-2`,
          ""
        )}
      ></div>
    ),
    appendDots: (dots: ReactElement) => (
      <div
        style={{
          width: "fit-content",
          bottom: "20px",
          right: "30px",
        }}
      >
        <ul>{dots}</ul>
      </div>
    ),
  };
  const settings2 = {
    dots: false,
    arrows: false,
    swipeToSlide: true,
    focusOnSelect: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    infinite: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
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
  useEffect(() => {
    document.addEventListener("mouseup", function (e) {
      setMouseP((prev) => {
        if (prev == e.clientX) {
          setMove(false);
        } else {
          setMove(true);
        }
        return prev;
      });
    });
    setNav1(slide1.current);
    setNav2(slide2.current);
  }, []);
  return (
    <div className={cx("wrap-sliders", "flex w-full h-auto")}>
      <ul className={cx("sliders-left", "sliders", `hidden md:block ${widths.widthLeft}`)}></ul>
      <div
        className={cx("slider-main", "sliders", "h-fit px-2 w-full", `${widths.widthMain}`)}
        onMouseDown={(e) => {
          setMouseP(e.clientX);
        }}
      >
        <Slider
          asNavFor={nav2}
          ref={slide1}
          className={cx("w-full h-auto")}
          {...settings}
        >
          {props.sliderMain.map((sl, index) => (
            <div
              onClick={() => {
                console.log("move", isMove);
                if (!isMove) {
                  navigate.push(
                    LinkByType({
                      type: sl.to.type,
                      to: sl.to.link,
                    })
                  );
                  setMouseP(0);
                }
              }}
              className={cx("h-fit outline-none")}
              key={index}
            >
              <ImageC
                className={cx("w-full object-contain")}
                src={`${process.env.NEXT_PUBLIC_API_URL}/${sl.coverImgUrl}`}
                alt={sl.title}
              />
            </div>
          ))}
        </Slider>
        <Slider
          asNavFor={nav1}
          ref={slide2}
          className={cx("w-full bg-white")}
          {...settings2}
        >
          {props.sliderMain.map((sl, index) => (
            <div
              className={cx(
                ` cursor-pointer text-14 p-2 ${
                  index == activeSl && "text-main"
                }`
              )}
              key={index}
            >
              {sl.title}
            </div>
          ))}
        </Slider>
      </div>
      <div
        className={cx(
          "slider-right",
          "sliders",
          "flex-col hidden",
          `md:flex ${widths.widthRight}`
        )}
      >
        {props.sliderRight.map((sl, index) => (
          <Link
            key={index}
            className={cx("slider-side", "h-[100px] w-full")}
            href={LinkByType({
              type: sl.to.type,
              to: sl.to.link,
            })}
          >
            <ImageC
              className={cx("h-full w-full object-fill")}
              src={`${process.env.NEXT_PUBLIC_API_URL}/${sl.coverImgUrl}`}
              lt={sl.title}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

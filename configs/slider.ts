import { InnerSlider  } from "react-slick";

export interface objectSlider {
    title: string;
    to: {
      type: string;
      link: string;
    };
    typeSlide: Array<string>;
    coverImgUrl: string;
  }


export type SliderElement = InnerSlider 
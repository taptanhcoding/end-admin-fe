export interface productCart {
  _id: string;
  name: string;
  code: string;
  price: number;
  discount: number;
  priceDiscount: number;
  slug: string;
  coverImgUrl: string;
}

export interface productDetail {
  _id: string;
  name?: string;
  code?: string;
  slug: string;
  price: number;
  discount?: number;
  description?: string;
  options: Array<{
    color?: string ;
    codeColor?: string;
    plus?: number;
    stock?: string;
  }>;
  coverImgUrl?: string;
  sliderImageUrl: Array<string>;
  stock?: number;
  priceDiscount?: number;
}


export interface productInOrder {
  productCode?: string,
  price?: number,
  slug?: string;
  name?: string,
  discount?: number ,
  coverImgUrl?: string;
  option: {
    color: string,
    quanity: number,
    plus: number
  }
}


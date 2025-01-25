export interface ISliders {
  slides: ISlide[];
  className: string;
}

interface ISlide {
  img: IImg[];
  title: string;
  description: string;
  price: number;
}

interface IImg {
  alt: string;
  src: string;
}

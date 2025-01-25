export interface ISliders {
  slides: ISlide[];
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

export interface ICart {
  click: boolean;
  setClick: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IProduct {
  id: string; // или number, в зависимости от типа id
  name: string;
  price: number;
  img: string; // Путь к изображению товара
  stickers:any;
  
}

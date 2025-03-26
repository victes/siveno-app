import img1 from "../../../../public/images/MainPage/catalog1.jpg";
import img3 from "../../../../public/images/MainPage/catalog2.jpg";
import img2 from "../../../../public/images/MainPage/catalog3.jpg";
import img4 from "../../../../public/images/MainPage/catalog4.jpg";
import Image from "next/image";
import Link from "next/link";
import "../style/catalog.scss";

function Catalog() {
  return (
    <div className="mt-10 containers px-[40px]">
      <div className="w-full flex mt-[40px] mb-[40px]">
        <h2 className="text-3xl title-h1 text-start uppercase tracking-wide lineyka">Каталог</h2>
      </div>
      <div className="catalog__container">
        <Link href={"/"}>
          <div>
            <h2 className="mb-5 text-[20px]">Вязаные изделия</h2>
            <Image src={img1} alt="..." className="img"></Image>
          </div>
        </Link>
        <Link href={"/"}>
          <div>
            <h2 className="mb-5 text-[20px]">Базовые изделия</h2>
            <Image src={img2} alt="..." className="img"></Image>
          </div>
        </Link>
        <Link href={"/"}>
          <div>
            <h2 className="mb-5 text-[20px]">Деловые и вечерние</h2>
            <Image src={img3} alt="..." className="img"></Image>
          </div>
        </Link>
        <Link href={"/"}>
          <div>
            <h2 className="mb-5 text-[20px]">Нижнее бельё</h2>
            <Image src={img4} alt="..." className="img"></Image>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Catalog;

import React from "react";

const ProductCarePage = () => {
  return (
    <div className="flex flex-col mx-auto items-center max-w-[1200px] w-full text-text p-6 bona">
      <h1 className="title-h1 text-3xl font-bold text-center">Уход за изделиями</h1>
      <div className="mt-10 space-y-6 text-lg text-gray-700">
        <section>
          <h2 className="text-xl font-semibold">1. Общие рекомендации</h2>
          <ul className="list-disc list-inside">
            <li>Соблюдайте рекомендации по уходу, указанные на ярлыке изделия.</li>
            <li>Стирать вещи следует в соответствии с указанными температурными режимами.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">2. Стирка</h2>
          <ul className="list-disc list-inside">
            <li>Рекомендуется ручная или деликатная стирка при температуре не выше 30°C.</li>
            <li>Используйте мягкие моющие средства, избегайте отбеливателей.</li>
            <li>Стирайте одежду наизнанку, чтобы избежать повреждений ткани.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">3. Сушка</h2>
          <ul className="list-disc list-inside">
            <li>Не используйте машинную сушку, дайте изделиям высохнуть естественным образом.</li>
            <li>Развешивайте одежду на плечики или раскладывайте горизонтально на полотенце.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">4. Глажка</h2>
          <ul className="list-disc list-inside">
            <li>Гладьте одежду при низких температурах, следуя рекомендациям на ярлыке.</li>
            <li>Используйте паровой режим для деликатных тканей.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">5. Хранение</h2>
          <ul className="list-disc list-inside">
            <li>Храните одежду в сухом и проветриваемом месте.</li>
            <li>Для сохранения формы используйте плечики для верхней одежды.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default ProductCarePage;

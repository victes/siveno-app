import React, { Suspense } from "react";
import AllProductsPage from "@/widgets/AllProductsPage";
import { Container } from "@/shared/ui/Container";

// Компонент-заглушка для загрузки
const Loading = () => <div className="p-4 text-center">Загрузка...</div>;

const page = () => {
  return (
    <Container>
      <Suspense fallback={<Loading />}>
        <AllProductsPage />
      </Suspense>
    </Container>
  );
};

export default page;

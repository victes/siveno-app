import React, { Suspense } from "react";
import AllProductsPage from "@/widgets/AllProductsPage";
import { Container } from "@/shared/ui/Container";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const seo = await fetch(BASE_URL + '/seo/catalogProducts')
    .then((res) => res.json())

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
  }
}

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

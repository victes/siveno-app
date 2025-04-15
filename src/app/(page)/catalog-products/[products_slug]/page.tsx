import React from "react";

import CatalogProductsPage from "@/widgets/CatalogProductsPage";
import { Container } from "@/shared/ui/Container";
import { Metadata } from "next";

type Props = {
  params: Promise<{ products_slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { products_slug } = await params

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const seo = await fetch(BASE_URL + '/seo/category?category_slug=' + products_slug )
    .then((res) => res.json())

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
  }
}

const page = (params: Props) => {
  return (
    <Container>
      <CatalogProductsPage />
    </Container>
  );
};

export default page;

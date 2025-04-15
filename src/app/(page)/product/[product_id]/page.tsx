import React from "react";

import ProductPage from "@/widgets/ProductPage";
import { Container } from "@/shared/ui/Container";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ product_id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { product_id } = await params

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const seo = await fetch(BASE_URL + '/seo/product?product_id=' + product_id )
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
      <ProductPage />
    </Container>
  );
};

export default page;

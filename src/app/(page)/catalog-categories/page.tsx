import { Container } from "@/shared/ui/Container";
import CatalogPage from "@/widgets/CatalogPage";
import React from "react";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const seo = await fetch(BASE_URL + '/seo/catalog')
    .then((res) => res.json())

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
  }
}

const page = () => {
  return (
    <Container>
      <CatalogPage />
      <hr />
    </Container>
  );
};

export default page;

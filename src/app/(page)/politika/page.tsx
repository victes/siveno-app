import { Container } from "@/shared/ui/Container";
import PolitikaPage from "@/widgets/PolitikaPage";
import React from "react";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const seo = await fetch(BASE_URL + '/seo/politika')
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
      <PolitikaPage />
    </Container>
  );
};

export default page;

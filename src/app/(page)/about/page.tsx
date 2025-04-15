import React from "react";

import { Container } from "@/shared/ui/Container";
import AboutPage from "@/widgets/AboutPage";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const seo = await fetch(BASE_URL + '/seo/about')
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
      <AboutPage />
    </Container>
  );
};

export default page;

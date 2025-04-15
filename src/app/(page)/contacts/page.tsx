import { ContactsPage } from "@/widgets/ContactsPage";
import React from "react";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const seo = await fetch(BASE_URL + '/seo/contacts')
    .then((res) => res.json())

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
  }
}

const page = () => {
  return (
    <>
      <ContactsPage />
    </>
  );
};

export default page;

import { Metadata } from "next";
import HomePage from "@/widgets/Home";

export async function generateMetadata(): Promise<Metadata> {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const seo = await fetch(BASE_URL + '/seo/main')
    .then((res) => res.json())

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
  }
}

export default function Home() {
  return (
    <HomePage/>
  )
}



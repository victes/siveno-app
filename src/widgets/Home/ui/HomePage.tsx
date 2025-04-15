"use client";

import { useEffect, useState } from "react";
import { MainPage } from "@/widgets/MainPage";
import PopUp from "@/widgets/PopUp";

export default function HomePage() {
  const [active, setActive] = useState<boolean>(false)
  useEffect(() => {
    setTimeout(() => {
      setActive(true)
    },15000)
  },[])
  return (
    <div className="">
      <MainPage />
      <PopUp setActive={setActive} active={active} />
    </div>
  );
}
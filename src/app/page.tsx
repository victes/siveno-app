"use client";

import { MainPage } from "@/widgets/MainPage";
import PopUp from '@/widgets/PopUp'
import { useState, useEffect } from 'react'

export default function Home() {
  const [active, setActive] = useState<boolean>(false)
  useEffect(() => {
    setTimeout(() => {
      setActive(true)
    },10000)
  },[])
  return (
    <div className="">
      <MainPage />
      {/* {active && <PopUp setActive={setActive} />} */}
    </div>
  );
}

"use client";
import { useGetLoyaltyLevelQuery, useGetLoyaltyPointsQuery } from "@/shared/api/LoyaytyApi/Loyayti";
import React from "react";

const LoayltyLevel = () => {
  const { data, isSuccess } = useGetLoyaltyLevelQuery();
  // console.log(data);
  return <p>Уровень программы лояльности: {isSuccess ? data.level : ""}</p>;
};

const LoyaytiPoints = () => {
  const { data, isSuccess } = useGetLoyaltyPointsQuery();
  // console.log(data);
  return <p>Баллы лояльности: {isSuccess ? data.total_points : 0}</p>;
};

const LoyaytiPointsHistory = () => {
  // const { data } = useGetLoyaltyPointsHistoryQuery();
  // console.log(data);
  return <p>История Баллов: Истории нет</p>;
};

const PartnerProgramm = () => {
  return (
    <div className="mt-[100px] max-w-[700px] w-full flex flex-col gap-[50px] h-[350px]">
      <LoayltyLevel />
      <LoyaytiPoints />
      <LoyaytiPointsHistory />
    </div>
  );
};

export default PartnerProgramm;

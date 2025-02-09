import {
  useGetLoyaltyLevelQuery,
  useGetLoyaltyPointsHistoryQuery,
  useGetLoyaltyPointsQuery,
} from "@/shared/api/LoyaytyApi/Loyayti";
import React from "react";

const LoayltyLevel = () => {
  const { data, isSuccess } = useGetLoyaltyLevelQuery();
  console.log(data);
  return <p>Уровень программы лояльности: {isSuccess ? data.level : ""}</p>;
};

const LoyaytiPoints = () => {
  const { data } = useGetLoyaltyPointsQuery();
  console.log(data);
  return <p>Баллы лояльности: </p>;
};

const LoyaytiPointsHistory = () => {
  const { data } = useGetLoyaltyPointsHistoryQuery();
  console.log(data);
  return <p>История Баллов: </p>;
};

const PartnerProgramm = () => {
  return (
    <div className="mt-[100px] max-w-[600px] w-full flex flex-col gap-[50px]">
      <LoayltyLevel />
      <LoyaytiPoints />
      <LoyaytiPointsHistory />
    </div>
  );
};

export default PartnerProgramm;

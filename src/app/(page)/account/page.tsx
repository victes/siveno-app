"use client";
import { Container } from "@/shared/ui/Container";
import { AccountPage } from "@/widgets/AccountPage";
import React from "react";

const page = () => {
  return (
    <div>
      <Container className="px-[180px]">
        <AccountPage />
      </Container>
    </div>
  );
};

export default page;

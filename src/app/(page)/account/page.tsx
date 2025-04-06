'use client'

import { useAuth } from '@/shared/hook/AuthContext/ui/AuthContext'
import { Container } from "@/shared/ui/Container";
import { AccountPage } from "@/widgets/AccountPage";
import { useRouter } from 'next/navigation'
import React from "react";

const page = () => {
  const { token } = useAuth();
  const { push } = useRouter();
  if (!token) return push('/')
  return (
    <div>
      <Container className="">
        <AccountPage />
      </Container>
    </div>
  );
};

export default page;

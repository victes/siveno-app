"use client";
import React from "react";
import { Container } from "../Container";
import Link from "next/link";
import {FaTelegram, FaWhatsapp} from "react-icons/fa";
import {FaVk} from "react-icons/fa6";
import { useAuth } from "@/shared/hook/AuthContext/ui/AuthContext";
import {useParams} from "next/navigation";

const Footer = () => {
  const { token } = useAuth();
  return (
    <footer className="border-t border-gray-200 pt-16 pb-8 mt-20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-sm font-normal mb-6 uppercase tracking-wide">О компании</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/about" className="text-sm text-gray-500 hover:text-black transition-colors">
                  О нас
                </Link>
              </li>
              <li>
                <Link href="/contacts" className="text-sm text-gray-500 hover:text-black transition-colors">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-normal mb-6 uppercase tracking-wide">Покупателям</h3>
            <ul className="space-y-4">
              <li>
                {token ? (
                  <Link href="/account" className="text-sm text-gray-500 hover:text-black transition-colors">
                    Личный кабинет
                  </Link>
                ) : (
                  <Link href="/login" className="text-sm text-gray-500 hover:text-black transition-colors">
                    Личный кабинет
                  </Link>
                )}
              </li>
              <li>
                <Link href="/shipping" className="text-sm text-gray-500 hover:text-black transition-colors">
                  Доставка
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-sm text-gray-500 hover:text-black transition-colors">
                  Возврат
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-gray-500 hover:text-black transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/product-care" className="text-sm text-gray-500 hover:text-black transition-colors">
                  Уход за изделиями
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-normal mb-6 uppercase tracking-wide">Документы</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/politika" className="text-sm text-gray-500 hover:text-black transition-colors">
                  Политика конфиденциальности
                </Link>
              </li>
              <li>
                <Link href="/oferta" className="text-sm text-gray-500 hover:text-black transition-colors">
                  Публичная оферта
                </Link>
              </li>
            </ul>
          </div>

          <div>
            {/* Временно скрыто - будет реализовано позже */}
            {/* <h3 className="text-sm font-normal mb-6 uppercase tracking-wide">Подписка</h3>
            <p className="text-sm text-gray-500 mb-4">Подпишитесь на нашу рассылку, чтобы первыми узнавать о новых коллекциях и акциях</p>
            <form className="mb-6">
              <div className="flex border-b border-gray-300 pb-1">
                <input 
                  type="email" 
                  placeholder="Ваш email" 
                  className="w-full bg-transparent text-sm focus:outline-none"
                  suppressHydrationWarning
                />
                <button 
                  type="submit" 
                  className="text-sm font-normal whitespace-nowrap"
                >
                  Подписаться
                </button>
              </div>
            </form> */}

            <div className="flex gap-6">
              <a href="https://t.me/+pnsEBODRdPJiNmNi" className="text-gray-500 hover:text-black transition-colors">
                <FaTelegram className='text-[35px] max-md:text-[25px] ' />
              </a>
              <a href="https://vk.com/siveno.store" className="text-gray-500 hover:text-black transition-colors">
                <FaVk  className='text-[35px] max-md:text-[25px]'/>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400"> SIVENO 2025 | Все права защищены</p>
          <div className="flex gap-6">
            <Link href="/politika" className="text-xs text-gray-400 hover:text-black transition-colors">
              Политика
            </Link>
            <Link href="/oferta" className="text-xs text-gray-400 hover:text-black transition-colors">
              Публичная оферта
            </Link>
            <Link href="/contacts" className="text-xs text-gray-400 hover:text-black transition-colors">
              Контакты
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

"use client";
import React from "react";
import { Container } from "../Container";
import Link from "next/link";
import { FaTelegram, FaWhatsapp } from "react-icons/fa";
import { useAuth } from "@/shared/hook/AuthContext/ui/AuthContext";

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
                <FaTelegram size={18} />
              </a>
              <a href="https://vk.com/siveno.store" className="text-gray-500 hover:text-black transition-colors">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 448 512"
                  height="18"
                  width="18"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M31.4907 63.4907C0 94.9813 0 145.671 0 247.04V264.96C0 366.329 0 417.019 31.4907 448.509C62.9813 480 113.671 480 215.04 480H232.96C334.329 480 385.019 480 416.509 448.509C448 417.019 448 366.329 448 264.96V247.04C448 145.671 448 94.9813 416.509 63.4907C385.019 32 334.329 32 232.96 32H215.04C113.671 32 62.9813 32 31.4907 63.4907ZM75.6 168.267H126.747C128.427 253.76 166.133 289.973 196 297.44V168.267H244.16V242C273.653 238.827 304.64 205.227 315.093 168.267H363.253C359.313 187.435 351.46 205.583 340.186 221.579C328.913 237.574 314.461 251.071 297.733 261.227C316.41 270.499 332.907 283.63 346.132 299.751C359.357 315.873 369.01 334.618 374.453 354.747H321.44C316.555 337.262 306.614 321.61 292.865 309.754C279.117 297.899 262.173 290.368 244.16 288.107V354.747H238.373C136.267 354.747 78.0267 284.747 75.6 168.267Z" />
                </svg>
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

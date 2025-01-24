"use client"
import React from 'react'
import { Container } from '../Container'

const Footer = () => {
  return (
    <footer className='flex flex-col bg-white mt-auto'>
      <Container>
        <div className='flex justify-between'>
            <ul className='flex gap-[10px]'>
              <li>Доставка</li>
              <li>Оплата</li>
              <li>Возврат и Обмен</li>
              <li>Таблица Размеров</li>
              <li>Точки Продаж</li>
              <li>Карьера</li>
              <li>Программа Лояльности</li>
            </ul>
            <input/>
        </div>
        <div className='flex justify-between'>
          <ul className='flex'>
            <li>Политика</li>
            <li> Обработка персональных данных</li>
            <li> Публичная Оферта</li>
          </ul>
          <p>@ Somebody company 2025 | Все права защищены</p>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
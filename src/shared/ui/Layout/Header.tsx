'use client'
import React from 'react'
import { Container } from '../Container';

const Header = () => {
  return (
    <header className='bg-white'>
        <Container>
            <div className='flex flex-row text-center items-center h-[90px] justify-between'>
                <div className='flex justify-center items-center text-center gap-5'>
                    <p>=</p>
                    <h1 className=''>Logo</h1>
                    <p>Каталог</p>
                    <p>Магазины</p>
                </div>
                <div className='flex '>
                    <p>8 (800) 555-25-23</p>
                    <div className='flex gap-5 ml-20'>
                        <p>Search</p>
                        <p>Favourite</p>
                        <p>Cart</p>
                    </div>
                </div>
            </div>
        </Container>
    </header>
  )
}

export default Header;
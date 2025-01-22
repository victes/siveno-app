'use client'
import React from 'react'
import { IContainer } from '../types/types'

const Container = ({children}: IContainer) => {
  return (
    <div className='max-w-[1500px] w-full m-auto tw-bg-white'>{children}</div>
  )
}

export default Container
'use client'
import React from 'react'
import { IContainer } from '../types/types'

const Container = ({children}: IContainer) => {
  return (
    <div className='max-w-[1700px] w-full m-auto px-[60px]'>{children}</div>
  )
}

export default Container
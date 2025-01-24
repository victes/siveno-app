'use client'
import React from 'react'
import { IContainer } from '../types/types'

const Container = ({children,className}: IContainer) => {
  return (
    <div className={`max-w-[1700px] w-full m-auto px-[60px] ${className}`}>{children}</div>
  )
}

export default Container
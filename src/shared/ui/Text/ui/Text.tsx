import React from 'react'
import { IText } from '../types/types'

const Text = ({text}: IText) => {
  return (
    <p>{text}</p>
  )
}

export default Text
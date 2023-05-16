import React, { FC } from "react"
import { CartList } from "../CartList/CartList"
import { Link } from "react-router-dom"

export const Cart: FC = (): JSX.Element => {
  return (
    <div>
      <Link to="/">Back</Link>
      <CartList/>
    </div>
  )
}
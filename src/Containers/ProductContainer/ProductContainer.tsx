import React from 'react'
import style from "../ProductContainer/style.module.css"
import ProductTitle from '../../components/Product-Section/Section-Title/ProductTitle'
import Navbar from '../../components/Product-Section/Navbar/Navbar'
export default function ProductContainer() {
  return (
    <div className={style.ProductContainer}>
    <ProductTitle/>
    <Navbar/>
    </div>
  )
}

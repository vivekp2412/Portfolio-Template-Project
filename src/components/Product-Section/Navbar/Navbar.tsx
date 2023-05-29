import React from 'react'
import style from "../Navbar/style.module.css"
export default function Navbar() {
  return (
    <div className={style.Product_Navbar_container}>
        <ul className={style.navoptions}>
            <li className={style.navoption}><a href="#">Type 1</a></li>
            <li className={style.navoption}><a href="#">Type 2</a></li>
            <li className={style.navoption}><a href="#">Type 3</a></li>
            <li className={style.navoption}><a href="#">Type 4</a></li>
        </ul>
        <div className={style.searchbar}>
            <input type="text" placeholder='Search Your Product Here'></input>
        </div>
    </div>
  )
}

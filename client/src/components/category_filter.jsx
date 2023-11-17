import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faWheatAwn, faTractor,faLeaf,faTrowel,faSeedling , faCow, faBasketShopping} from '@fortawesome/free-solid-svg-icons'

const CategoryFilter = ()=> {
  return (
    <div className='category-filters-container'>
        <div className='category-filter'>
          <button className="catergory-icon"><FontAwesomeIcon icon={faBasketShopping} /></button>
          <button className="category-name">ALL</button>
        </div>
        <div className='category-filter'>
          <button className="catergory-icon"><FontAwesomeIcon icon={faWheatAwn} /></button>
          <button className="category-name">Grains</button>
        </div>
        <div className='category-filter'>
          <button className="catergory-icon"><FontAwesomeIcon icon={faSeedling} /></button>
          <button className="category-name">Inputs</button>
        </div>
        <div className='category-filter'>
          <button className="catergory-icon"><FontAwesomeIcon icon={faLeaf} /></button>
          <button className="category-name">Vegitables</button>
        </div>
        <div className='category-filter'>
          <button className="catergory-icon"><FontAwesomeIcon icon={faCow} /></button>
          <button className="category-name">Meats</button>
        </div>
        <div className='category-filter'>
          <button className="catergory-icon"><FontAwesomeIcon icon={faTrowel} /></button>
          <button className="category-name">Gardening</button>
        </div>
        <div className='category-filter'>
          <button className="catergory-icon"><FontAwesomeIcon icon={faTractor} /></button>
          <button className="category-name">Machinery</button>
        </div>
    </div>
  )
}

export default CategoryFilter
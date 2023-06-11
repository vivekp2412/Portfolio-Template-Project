import React, { useState } from 'react';
import { useAppSelector } from '../../../Hooks/Hooks';
import Loader from '../../Comman/Loader/Loader';
import style from '../CardContainer/style.module.css';
import ProductCard from '../Cards/ProductCard';
import ReactPaginate from 'react-paginate';
import {faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function CardContainer() {
  const productList = useAppSelector((state) => state.product.productList);
  const searchQuery = useAppSelector((state) => state.product.searchQuery);
  const searchedProducts = useAppSelector(
    (state) => state.product.searchedProducts
  );
  let loading = useAppSelector((state) => state.product.pending);
  const filterCategory = useAppSelector(
    (state) => state.product.filteredCategory
  );

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3; // Number of cards per page

  // Apply filtering based on category
  let visibleProducts;
  if (filterCategory === 'all') {
    visibleProducts = productList;
  } else {
    visibleProducts = productList.filter(
      (product) => product.productCategory === filterCategory
    );
  }

  // Apply searching based on search query
  let filteredProducts = visibleProducts;
  if (searchQuery !== '') {
    filteredProducts = visibleProducts.filter((product) =>
      searchedProducts.includes(product)
    );
  }

  // Calculate pagination
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <>
    <div className={style.cardContainer}>
      {loading && <Loader />}
      {!loading && !currentProducts.length ? (
        <h1 style={{ color: 'white' }}>No Data Found</h1>
      ) : (
        <>
          {currentProducts.map((product) => (
            <ProductCard key={product.id} data={product} />
          ))}
        
        </>
      )}
    </div>
    <ReactPaginate
    className={style.paginate}
            previousLabel={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>}
            nextLabel={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={'pagination'}
            activeClassName={style.active}
          />
      </>
  );
}

export default CardContainer;
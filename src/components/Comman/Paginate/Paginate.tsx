import  { useState } from 'react';
import ReactPaginate from 'react-paginate';
import CardContainer from '../../Product-Section/CardContainer/CardContainer';
import { useAppSelector } from '../../../Hooks/Hooks';
import ProductCard from '../../Product-Section/Cards/ProductCard';
import style from "../../Product-Section/CardContainer/style.module.css";
function Paginate({ itemsPerPage }) {
    const productList =useAppSelector((state)=>state.product.productList) ;
    console.log(productList);
    const [itemOffset, setItemOffset] = useState(0);
    
    const searchQuery = useAppSelector((state) => state.product.searchQuery);
    const searchedProducts = useAppSelector(
      (state) => state.product.searchedProducts
    );
    let loading = useAppSelector((state) => state.product.pending);
    const filterCategory = useAppSelector(
      (state) => state.product.filteredCategory
    );
  
    let AllCards;
    let visibleProducts;
    if (filterCategory == "all") {
      visibleProducts = productList;
    } else {
      visibleProducts = productList.filter(
        (product) => product.productCategory == filterCategory
      );
    }
  
    let commonProduct = visibleProducts.filter(function (element) {
      return searchedProducts.includes(element);
    });
    if (searchQuery !== "") {
      AllCards = commonProduct.map((x) => {
        return <ProductCard data={x} />;
      });
    } else {
      AllCards = visibleProducts.map((x) => {
        return <ProductCard data={x} />;
      });
    }
  
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = AllCards.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(AllCards.length / itemsPerPage);
  
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % AllCards.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };
  
    return (
      <>
        {/* <Items currentItems={currentItems} /> */}
        {/* <div className={style.cardContainer}>
      {loading && <Loader />}
      {!loading && !AllCards.length ? (
        <h1 style={{ color: "white" }}>No Data Found</h1>
      ) : (
        AllCards
      )}
    </div> */}
        
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />
      </>
    );
}
export default Paginate;
  
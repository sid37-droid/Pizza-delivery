import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss'

type PaginationProps = {
  onChangePage:any;
  curentPage:number;
}

const Pagination:React.FC<PaginationProps> = ({onChangePage, curentPage})=> {
    return ( 
        <div>
            <ReactPaginate
              className={styles.root}
              breakLabel="..."
              nextLabel=">"
              previousLabel="<"
              onPageChange={event => onChangePage(event.selected + 1)}
              pageRangeDisplayed={4}
              pageCount={3}
              renderOnZeroPageCount={null}
              forcePage={curentPage - 1}
            />
        </div>
        
     );
}

export default Pagination;
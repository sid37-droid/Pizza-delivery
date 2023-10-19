//React
import { useState, useEffect, useContext, useRef } from 'react';

import { useNavigate } from 'react-router-dom';

// axios
// import axios from 'axios';
import qs from 'qs'

//Components
import Categories from '../../components/Categories';
import { list } from '../../components/Sort';
import Sort  from '../../components/Sort';
import ProductBlock from '../../components/ProductBlock';
import Skeleton from '../../components/ProductBlock/Skeleton';
import Pagination from '../../components/Pagination';

//Context
import { AppContext } from '../../App';

//Redux
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryID, setSort, setCurentPage, setFilters} from '../../redux/slices/filterSlice';


import { fetchProduct } from '../../redux/slices/productSlice';
import NotFound from '../notFound';



function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isSearch = useRef(false);
  const isMount = useRef(false);

  //Context import
  const {searchValue} = useContext(AppContext)

  //redux selectors
  const categoryId = useSelector(state => state.filter.categoryId)
  const sortType = useSelector(state => state.filter.sort)
  const curentPage = useSelector(state => state.filter.curentPage)

  const {items, status} = useSelector(state => state.product)

  // const [isLoading, setIsLoading] = useState(true);


  const getProduct = async ()=>{
    // setIsLoading(true);

    // Сортировка по категориям
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    // Фильтрация
    const order = sortType.sortProperty.includes("-") ? 'asc' : 'desc';
    const sortBy = sortType.sortProperty.replace('-', '')
    // Поиск
    const search = searchValue ? `&search=${searchValue}` : '';


   dispatch(fetchProduct({
        category,
        order,
        sortBy,
        search,
        curentPage
      }));

    window.scrollTo(0, 0)
  }


  useEffect(()=>{
    if(isMount.current){
      const queryString = qs.stringify({
        sortProperty: sortType.sortProperty,
        categoryId,
        curentPage,
        searchValue
      });
      navigate(`?${queryString}`)
    }
    isMount.current = true
  }, [categoryId, sortType, searchValue, curentPage])

  useEffect(()=>{
    if(window.location.search){
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find(obj => obj.sortProperty === params.sortProperty) 

      dispatch(setFilters({
        ...params,
        sort,
      }))
      isSearch.current = true
    }
  }, [])

  useEffect(() => {
    if(!isSearch.current){
      getProduct();
    }
    isSearch.current = false
  }, [categoryId, sortType, searchValue, curentPage]);

    //Рендерим скелетон
    const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />)
    //Рендерим экомпонент с пиццами
    const productBlock = items.map((items) => <ProductBlock key={items.id} items={items} />)

    if(status === 'error'){
      return <NotFound/>
    }

    return (
        <div className="container">
          <div className="content__top">
              <Categories categoryId={categoryId} setCategoryID={(i) => dispatch(setCategoryID(i))}/>
              <Sort sortType={sortType} setSortType={i => dispatch(setSort(i))}/>
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">{status === 'loading' ? skeleton : productBlock}</div>
          <Pagination curentPage={curentPage} onChangePage={number => dispatch(setCurentPage(number))}/>
        </div>
     );
};

export default Home;
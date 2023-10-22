//React
import React, { useEffect, useRef} from 'react';

import { useNavigate } from 'react-router-dom';

import qs from 'qs'

//Components
import Categories from '../../components/Categories';
import { list } from '../../components/Sort';
import Sort  from '../../components/Sort';
import ProductBlock from '../../components/ProductBlock';
import Skeleton from '../../components/ProductBlock/Skeleton';
import Pagination from '../../components/Pagination';

//Redux
import { useSelector, useDispatch } from 'react-redux';
import { setSort, setCurentPage, setFilters, selectFilter} from '../../redux/slices/filterSlice';


import { fetchProduct, selectProduct } from '../../redux/slices/productSlice';
import NotFound from '../notFound';


const Home:React.FC = ()=> {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isSearch = useRef(false);
  const isMount = useRef(false);

  //redux selectors
  const {categoryId, curentPage, sort:sortType, searchValue} = useSelector(selectFilter)
  const {items, status} = useSelector(selectProduct)

  const getProduct = async ()=>{
    // Сортировка по категориям
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    // Фильтрация
    const order = sortType.sortProperty.includes("-") ? 'asc' : 'desc';
    const sortBy = sortType.sortProperty.replace('-', '')
    // Поиск
    const search = searchValue ? `&search=${searchValue}` : '';

   dispatch(
    //@ts-ignore
    fetchProduct({
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
    //Рендерим компонент с пиццами
    const productBlock = items.map((items:any) => <ProductBlock key={items.id} items={items}/>)

    if(status === 'error'){
      return <NotFound/>
    }

    return (
        <div className="container">
          <div className="content__top">
              <Categories/>
              <Sort/>
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">{status === 'loading' ? skeleton : productBlock}</div>
          <Pagination curentPage={curentPage} onChangePage={(number:number) => dispatch(setCurentPage(number))}/>
        </div>
     );
};

export default Home;
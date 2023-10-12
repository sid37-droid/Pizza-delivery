//React
import { useState, useEffect, useContext, useRef } from 'react';

import { useNavigate } from 'react-router-dom';

// axios
import axios from 'axios';

import qs from 'qs'

//Components
import Categories from '../../components/Categories';
import { list } from '../../components/Sort';
import Sort  from '../../components/Sort';
import PizzaBlock from '../../components/PizzaBlock';
import Skeleton from '../../components/PizzaBlock/Skeleton';
import Pagination from '../../components/Pagination';

//Context
import { AppContext } from '../../App';


//Redux
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryID, setSort, setCurentPage, setFilters} from '../../redux/slices/filterSlice';




function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMount = useRef(false)

  //Context import
  const {searchValue} = useContext(AppContext)

  //redux selectors
  const categoryId = useSelector(state => state.filter.categoryId)
  const sortType = useSelector(state => state.filter.sort)
  const curentPage = useSelector(state => state.filter.curentPage)
  console.log("curentPage", curentPage)


  //Products state
  const [products, setProduct] = useState([]);
  //Loading flag
  const [isLoading, setIsLoading] = useState(true);


  const fetchPizzas = ()=>{
    setIsLoading(true);

    // Сортировка по категориям
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    // Фильтрация
    const order = sortType.sortProperty.includes("-") ? 'asc' : 'desc';
    const sortBy = sortType.sortProperty.replace('-', '')
    // Поиск
    const search = searchValue ? `&search=${searchValue}` : '';

      axios.get(`https://64a94ae08b9afaf4844a81d6.mockapi.io/items?page=${curentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
      .then((res) => {
        setProduct(res.data);
        setIsLoading(false)
      }).catch(function (error) {
        if (error.response) {
          // Запрос был сделан, и сервер ответил кодом состояния, который
          // выходит за пределы 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // Запрос был сделан, но ответ не получен
          // `error.request`- это экземпляр XMLHttpRequest в браузере и экземпляр
          // http.ClientRequest в node.js
          console.log(error.request, "ошибка");
        } else {
          // Произошло что-то при настройке запроса, вызвавшее ошибку
          console.log('Error', error.message);
        }
        console.log(error.config);
      });


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
    // ScrollUp
    window.scrollTo(0, 0)
    if(!isSearch.current){
      fetchPizzas();
    }
    isSearch.current = false

  }, [categoryId, sortType, searchValue, curentPage]);








    
    //Рендерим скелетон
    const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />)
    //Рендерим экомпонент с пиццами
    const pizzaBlock = products.map((items) => <PizzaBlock key={items.id} items={items} />)
    return (
        <div className="container">
          <div className="content__top">
              <Categories categoryId={categoryId} setCategoryID={(i) => dispatch(setCategoryID(i))}/>
              <Sort sortType={sortType} setSortType={i => dispatch(setSort(i))}/>
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">{isLoading ? skeleton : pizzaBlock}</div>
          <Pagination curentPage={curentPage} onChangePage={number => dispatch(setCurentPage(number))}/>
        </div>
     );
};

export default Home;
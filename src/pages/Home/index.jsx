//React
import { useState, useEffect, useContext } from 'react';

import { useNavigate } from 'react-router-dom';

// axios
import axios from 'axios';

import qs from 'qs'

//Components
import Categories from '../../components/Categories';
import { list } from '../../components/Sort';
import Sort from '../../components/Sort';
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

  //Context import
  const {searchValue} = useContext(AppContext)

  //redux selectors
  const categoriesID = useSelector(state => state.filter.categoryId)
  const sortType = useSelector(state => state.filter.sort)
  const currentPage = useSelector(state => state.filter.curentPage)


    // ScrollUp
    window.scrollTo(0, 0)

    //Products state
    const [products, setProduct] = useState([]);
    //Loading flag
    const [isLoading, setIsLoading] = useState(true);


    //Вызывает ошибку (нужно иссправить)
    
    // useEffect(()=>{
    //   if(window.location.search){
    //     const params = qs.parse(window.location.search.substring(1));

    //     const sorting = list.find(obj => obj.sort === params.sort)

    //     dispatch(setFilters({
    //       ...params,
    //       sorting,

    //     }))
    //   }
    // }, [])




    useEffect(() => {
      //Устанавливаем флаг на true перед получением данных для отображения скелетона.
      setIsLoading(true);

        // Сортировка по категориям
        const category = categoriesID > 0 ? `category=${categoriesID}` : ''
        // Фильтрация
        const order = sortType.sort.includes("-") ? 'asc' : 'desc';
        const sortBy = sortType.sort.replace('-', '')
        // Поиск
        const search = searchValue ? `&search=${searchValue}` : '';

 
      axios.get(`https://64a94ae08b9afaf4844a81d6.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
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
    

    }, [categoriesID, sortType, searchValue, currentPage]);


  
    useEffect(()=>{
      const queryString = qs.stringify({
        sort: sortType.sort,
        categoriesID,
        currentPage,
        searchValue
      });
      navigate(`?${queryString}`)
      // console.log(queryString)
    }, [categoriesID, sortType, searchValue, currentPage])

    
    //Рендерим скелетон
    const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />)
    //Рендерим экомпонент с пиццами
    const pizzaBlock = products.map((items) => <PizzaBlock key={items.id} items={items} />)
    return (
        <div className="container">
          <div className="content__top">
              <Categories categoriesID={categoriesID} setCategoriesId={(i) => dispatch(setCategoryID(i))}/>
              <Sort sortType={sortType} setSortType={(i)=>dispatch(setSort(i))}/>
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">{isLoading ? skeleton : pizzaBlock}</div>
          <Pagination onChangePage={number => dispatch(setCurentPage(number))}/>
        </div>
     );
};

export default Home;
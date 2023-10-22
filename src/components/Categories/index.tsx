//React
import { useSelector, useDispatch } from "react-redux";

import { setCategoryID, selectFilter} from '../../redux/slices/filterSlice';



const Categories: React.FC = ()=> {
    const dispatch = useDispatch();
    const {categoryId} = useSelector(selectFilter)

    //Categories
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые',]

    //Categories render
    const categoriesList = categories.map((value, i) => (
        <li 
        key={i}
        onClick={() =>dispatch(setCategoryID(i))} 
        className={categoryId === i ? 'active' : ''}>{value}</li>
    ))

    return ( 
        <div className="categories">
            <ul>
                {categoriesList}
            </ul>
        </div>
     );
}

export default Categories;
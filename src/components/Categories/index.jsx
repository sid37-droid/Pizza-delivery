//React
import { useState } from "react";




function Categories({categoryId, setCategoryID}) {

    //Categories
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые',]

    //Categories render
    const categoriesList = categories.map((value, i) => (
        <li 
        key={i}
        onClick={() => setCategoryID(i)} 
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
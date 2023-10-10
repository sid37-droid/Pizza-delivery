import { useState } from "react"

function PizzaBlock({items}) {
    const {name, imageUrl, price, sizes, types, id} = items

    const typesName = ["тонкое", "традиционное"];
    // функция размера пиц
    const [activeSize, setActiveSize] = useState(0)
    const [activeType, setActiveType] = useState(0)

    // рендер списка разммеров пиц
    const sizesList = ()=>{
        return sizes.map((size, i)=>(
            <li onClick={()=>{setActiveSize(i)}} key={i}  className={activeSize === i ? 'active' : ''}>{size}</li>
        ))
    }
    // рендер типов пиц
    const typesRender = ()=>{
       return types.map((type)=>{
            return  <li onClick={()=>{setActiveType(type)}} key={type} className={activeType === type ? 'active' : ''}>
                        {typesName[type]}
                    </li>
        })
    }
    return ( 
        <div className="pizza-block-wrapper">
            <div className="pizza-block">
            <img
            className="pizza-block__image"
            src={imageUrl}
            alt="Pizza"
            />
            <h4 className="pizza-block__title">{name}</h4>
            <div className="pizza-block__selector">
            <ul>
                {typesRender()}
            </ul>
            <ul>
              {sizesList()}
            </ul>
            </div>
            <div className="pizza-block__bottom">
            <div className="pizza-block__price">от {price} ₽</div>
            <button className="button button--outline button--add">
                <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                    fill="white"
                />
                </svg>
                <span>Добавить</span>
                <i>1</i>
            </button>
            </div>
        </div>
        </div>
     );
}

export default PizzaBlock;
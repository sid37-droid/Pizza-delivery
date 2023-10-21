import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function FullProduct() {

    const [product, setProduct] = useState();

    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        async function fetchProduct(){
            try{
              const {data} = await axios.get('https://64a94ae08b9afaf4844a81d6.mockapi.io/items/' + id);
              setProduct(data)
            }catch(error){
                alert('Ошибка')
                navigate('/')
            }
        }

        fetchProduct();
    },[])


    if(!product){
        return 'Загрузка...'
    }

    return (  
        <div className="container">
            <img src={product.imageUrl} alt="" />
            <h2>{product.name}</h2>

            <h4>{product.price} ₽</h4>
        </div>

    );
}

export default FullProduct;
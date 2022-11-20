import React from "react";
import { useParams} from "react-router-dom";
import "../static/styles/product.css"

const Product = (props) => {

    const {id} = useParams();
    return(
        <div>
            <h1>{id}</h1>
        </div>
    )

}
export {Product}

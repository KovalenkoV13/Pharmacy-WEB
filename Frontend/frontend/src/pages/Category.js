import React, {useContext, useReducer} from "react"
import {Link} from "react-router-dom";
import {context} from "../App";

function Category(props){
    const {state, dispatch} = useContext(context);
    console.log(state.dataGoods)
    return (
        <>
        <div className="container">
            <div className="BR">
                <p className="Br_p"><Link className="Br_Link" to="/">Главная </Link>
                    / Каталог</p>
            </div>
            <div className='data-container'>
                <ul className="cat_ul">
                    {state.dataCat.map((data) => {
                        return (
                            <li className="cat_li" key={data.id_cat}>
                                <Link to={`/catalog/${data.id_cat}`} >{data.name}</Link>
                            </li>
                        );
                    })};
                </ul>
            </div>
        </div>
        </>
    );
};

export default Category;
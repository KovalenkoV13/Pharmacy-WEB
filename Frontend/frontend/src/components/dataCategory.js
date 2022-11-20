import React from 'react';
import {Link} from "react-router-dom";
const ListCat = (props) => {
    const { category } = props;
    if (!category || category.length === 0) return <p>Нет категорий</p>;
    return (
        <ul className="cat_ul">
        {category.cat.map((data) => {
                return (
                    <li className="cat_li" key={data.id_cat}>
                        <Link to={`/catalog/${data.id_cat}`} >{data.name}</Link>
                    </li>
                )
         })}
        </ul>
)
}
export default ListCat;
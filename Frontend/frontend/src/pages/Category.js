import React, {useContext} from "react"
import {Link} from "react-router-dom";
import {Context} from "../components/reducer";
import {useCategories} from "../components/api/query";


function Category(props){
    const category = useCategories()
    const {state} = useContext(Context);
    return (
        <>
                <ul className="cat_ul">
                    {category.data.map((data) => {
                        return (
                            <li className="cat_li" key={data.id_cat}>
                                <Link to={`/catalog/${data.id_cat}`} >{data.name}</Link>
                            </li>
                        );
                    })};
                </ul>
        </>
    );
};

export default Category;
import React, {useEffect, useState} from "react"
import {Link} from "react-router-dom";
import DataLoading from "../components/DataLoading";
import ListCat from "../components/dataCategory"

export default function Category(props){
    const CatLoading = DataLoading(ListCat);
    const [appState, setAppState] = useState({
        loading: false,
        category: null,
    });

    useEffect(() => {
        setAppState({ loading: true });
        fetch('http://127.0.0.1:8000/api/category/?format=json')
            .then((res) => res.json())
            .then((category) => {
                setAppState({ loading: false, category: category });
            });
    }, [setAppState]);

    return (
        <div className="container">
            <div className="BR">
                <p className="Br_p"><Link className="Br_Link" to="/">Главная </Link>
                    / Каталог</p>
            </div>
            <div className='data-container'>
                <CatLoading isLoading={appState.loading} category={appState.category} />
            </div>
        </div>
    );
}
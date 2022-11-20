import  React, {useState, useEffect} from 'react';
import {Link, useParams} from "react-router-dom"
import DataLoading from "../components/DataLoading";
import List from "../components/data"
import ListCat from "../components/dataCategory";
import Pagination from '@mui/material/Pagination';

export default function Catalog() {
    const {idCat} = useParams();
    const GoodsLoading = DataLoading(List);
    const CatLoading = DataLoading(ListCat)
    const [appState, setAppState] = useState({
        loading: false,
        goods: null,
    });
    const [appStateCat, setAppStateCat] = useState({
        loading: false,
        category: null,
    });


    useEffect(() => {
        setAppState({loading: true});
        fetch(`http://127.0.0.1:8000/api/good/?format=json&id_cat_id=${idCat}`)
            .then((res) => res.json())
            .then((goods) => {
                setAppState({ loading: false, goods: goods });
            });
    }, [setAppState]);

    useEffect(() => {
        setAppStateCat({ loading: true });
        fetch('http://127.0.0.1:8000/api/category/?format=json')
            .then((res) => res.json())
            .then((category) => {
                setAppStateCat({ loading: false, category: category });
            });
    }, [setAppStateCat]);

    console.log(appState.goods)
    return (
        <div className="container">
            <div className="BR">
            <p className="Br_p"><Link className="Br_Link" to="/">Главная </Link>
            / <Link className="Br_Link" to="/catalog">Каталог</Link>
            / {idCat}
            </p>
            </div>
            <div className="side-container">
               <CatLoading isLoading={appStateCat.loading} category={appStateCat.category}/>
            </div>
            <div className='data-container'>
                <GoodsLoading isLoading={appState.loading} goods={appState.goods} />
            </div>

        </div>
    );
}



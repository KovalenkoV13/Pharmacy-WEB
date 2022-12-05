import "./App.css"
import {BrowserRouter, Route, Routes, useParams} from "react-router-dom";
import Main from "./pages/Main";
import {Product} from "./pages/product";
import NavBar from "./components/NavBar";
import Catalog from "./pages/Catalog"
import {useEffect, useReducer, createContext, useState} from "react";
import Category from "./pages/Category";
import data from "bootstrap/js/src/dom/data";

export const context = createContext('default');

const initialState = {
    error : '',
    dataCat: [],
    dataGoods : [],
    page : 1
};

const Reducer = (state, action) => {
    switch (action.type){
        case 'FETCH_GOODS_SUCCESS':
            return {
                dataGoods : action.payload,
                error: ''
            };
        case 'FETCH_CAT_SUCCESS':
            return {
                dataCat : action.payload,
                error: ''
            };
        case 'FETCH_ERROR':
            return {
                error: action.error
            };
        case 'PAGE_UP':
            return {
                page: action.page+1
            };
    };
};




const fetchGood = async () => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/good/?page=1`);
        const data = await response.json();
        return data;
    }
    catch (error){
        console.log(error)
    };

};




function App(props) {
    const {pageNumber} = useParams();
    const [state, dispatch] = useReducer(Reducer, initialState);



    useEffect(() => {
        fetchGood().then(render => {
            dispatch({type: 'FETCH_GOODS_SUCCESS', payload: render});
        });
    }, []);


    console.log(state.dataGoods)
    console.log(state.dataCat)


    return (
        <div className="App">
            <BrowserRouter basename="/" >
                <NavBar />
                <Routes>
                    <Route
                        exact path="/"
                        element={<Main />}


                    >
                    </Route>
                    <Route
                        path="/catalog"
                        element={
                            <context.Provider value={{state, dispatch}}>
                                <Catalog />
                            </context.Provider>
                    }

                    >
                    </Route>
                    <Route
                        path="/catalog/:idCat"
                        element={
                            <context.Provider value={{state, dispatch}}>
                                <Product />
                            </context.Provider>
                        }

                    >
                    </Route>
                    <Route
                        path="/catalog/:idCat/:id"
                        element={<Product />}

                    >
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );


}

export default App;

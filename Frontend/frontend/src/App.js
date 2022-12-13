import "./App.css"
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./pages/Main";
import {Product} from "./pages/product";
import NavBar from "./components/NavBar";
import Catalog from "./pages/Catalog"
import React, {useEffect, useReducer} from "react";
import {Context, fetchCat, fetchGood, initialState, Reducer} from "./components/reducer";
import FetchCatalogCategory from "./pages/CatalogCategory";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();
function App(props) {
    const [state, dispatch] = useReducer(Reducer, initialState);

    useEffect(() => {
    Promise.all([fetchCat(), fetchGood()])
        .then(function (results) {
            dispatch({type: 'FETCH_CAT_SUCCESS', payload: results[0]});
            dispatch({type: 'FETCH_GOODS_SUCCESS', payload: results[1]});
        });
    },[]);

    console.log(state)



    return (
        <div className="App">

            <BrowserRouter >
                <NavBar />
                <Routes>
                    <Route
                        path="/"
                        element={
                        <QueryClientProvider client={queryClient}>
                            <Main />
                        </QueryClientProvider>
                    }


                    >
                    </Route>
                    <Route
                        path="/catalog"
                        element={
                        <QueryClientProvider client={queryClient}>
                            <Context.Provider value={{state,dispatch}}>
                                <Catalog />
                            </Context.Provider>
                        </QueryClientProvider>
                    }

                    >
                    </Route>
                    <Route
                        path="/catalog/:id"
                        element={
                        <Context.Provider value={{state,dispatch}}>
                            <Product />
                        </Context.Provider>
                        }

                    >
                    </Route>
                    <Route
                        path="/catalog/category/:idCat"
                        element={
                            <QueryClientProvider client={queryClient}>
                                <Context.Provider value={{state,dispatch}}>
                                    <FetchCatalogCategory />
                                </Context.Provider>
                            </QueryClientProvider>
                            }


                    >
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );


}

export default App;

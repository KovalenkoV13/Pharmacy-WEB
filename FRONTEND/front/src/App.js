import React, {useReducer} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./pages/main";
import "./App.css"
import Product from "./pages/product";
import NavBar from "./components/sidebar";
import Catalog from "./pages/catalog"
import {Context, Reducer, initialState} from "./components/reducer";
import Shoplist from "./pages/shoplist";
import Login from "./pages/login";
import Register from "./pages/register";


function App() {
    const [state, dispatch] = useReducer(Reducer,initialState)
  return (
      <div className="App">

        <BrowserRouter >
            <Context.Provider value={{dispatch, state}}>
                <NavBar />
            </Context.Provider>

          <Routes>

            <Route
                exact path="/"
                element={
                        <Main />
                }
            >
            </Route>

            <Route
                path="/catalog/"
                element={
                    <Context.Provider value={{dispatch, state}}>
                        <Catalog />
                    </Context.Provider>
                }
            >
            </Route>
            <Route
                path="/catalog/':id'/"
                element={
                    <Product />
                }

            >
            </Route>

              <Route
                  path="/shoplist/"
                  element={
                      <Context.Provider value={{dispatch, state}}>
                          <Shoplist />
                      </Context.Provider>
                  }

              >
              </Route>

              <Route
                  path="/login/"
                  element={
                      <Context.Provider value={{dispatch, state}}>
                          <Login />
                      </Context.Provider>
                  }

              >
              </Route>
              <Route
                  path="/register/"
                  element={
                      <Context.Provider value={{dispatch, state}}>
                          <Register />
                      </Context.Provider>
                  }
              >
              </Route>
          </Routes>
        </BrowserRouter>
      </div>
  );


}

export default App;
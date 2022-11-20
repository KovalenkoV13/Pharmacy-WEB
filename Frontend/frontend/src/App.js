import Layout from "./components/layout";
import "./App.css"
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./pages/Main";
import {Product} from "./pages/product";
import Category from "./pages/Category";
import Catalog from "./pages/Catalog";

function App() {
    return (
        <div className="App">
            <BrowserRouter basename="/" >
                <Layout>
                <Routes>
                    <Route
                        exact path="/"
                        element={<Main />}

                    >
                    </Route>
                    <Route
                        path="/catalog"
                        element={<Category />}

                    >
                    </Route>
                    <Route
                        path="/catalog/:idCat"
                        element={<Catalog />}

                    >
                    </Route>
                    <Route
                        path="/catalog/:idCat/:id"
                        element={<Product />}

                    >
                    </Route>
                </Routes>
                </Layout>
            </BrowserRouter>
        </div>
    );


}

export default App;

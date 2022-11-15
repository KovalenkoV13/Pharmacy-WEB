import Layout from "./components/layout";
import "./App.css"
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./pages/Main";
import Catalog from "./pages/Catalog";
import {Product} from "./pages/product";

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
                        element={<Catalog />}

                    >
                    </Route>
                    <Route
                        path="catalog/:id"
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

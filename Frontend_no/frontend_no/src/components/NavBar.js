import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import apteka from "../static/media/red-cross-11340.png";
import Breadcrumbs from "./Breadcrumbs";
import Main from "../pages/Main";
import Catalog from "../pages/Catalog";
import {Product} from "../pages/product";
import "../static/styles/NavBar.css";

function NavBar() {

    return (
        <BrowserRouter basename="/" >
            <div>
                <div className="nav">
                    <img src={apteka} alt="apteka" className='apteka'/>
                    <table>
                        <td><Link to="/">Главная</Link></td>
                        <td><Link to="/catalog">Каталог</Link></td>
                    </table>
                </div>
                <Breadcrumbs />
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
            </div>
        </BrowserRouter>

    );
}

export default NavBar;
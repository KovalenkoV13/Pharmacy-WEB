import {Link} from "react-router-dom"
import "../static/styles/NavBar.css";

function NavBar(props) {
    return (
            <div>
                <div className="nav">
                    <Link className="LogoLink" to="/"><h2>Аптека</h2></Link>
                    <ul>
                        <li><Link className="NavLink" to="/">Главная</Link></li>
                        <li><Link className="NavLink" to="/catalog">Каталог</Link></li>
                    </ul>
                </div>
            </div>
    );
}

export default NavBar;
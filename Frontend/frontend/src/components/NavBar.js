import {Link} from "react-router-dom"

function NavBar(props) {
    return (
            <div>
                <div className="nav">
                    <Link className="LogoLink" to="/"><h2>Аптека</h2></Link>
                    <ul className="nav_ul">
                        <li className="nav_li"><Link className="NavLink" to="/">Главная</Link></li>
                        <li className="nav_li"><Link className="NavLink" to="/catalog">Каталог</Link></li>
                    </ul>
                </div>
            </div>
    );
}

export default NavBar;
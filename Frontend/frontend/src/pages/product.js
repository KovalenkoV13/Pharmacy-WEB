import React, {useContext} from "react";
import {Link, useParams} from "react-router-dom";
import "../static/styles/product.css"
import {Col, Row, Card} from "react-bootstrap";
import {Context} from "../components/reducer";


const Product = (props) => {
    const {id} = useParams();
    const {state, dispatch} = useContext(Context);
    for (let i = 0; i < state.dataGoods.data.results.length + 1; i++){
        if (state.dataGoods.data.results[i].name === id){
            return(
                <div className={"containerProduct"}>
                    <div className="BR">
                        <p className="Br_p"><Link className="Br_Link" to="/">Главная </Link>
                            / <Link className="Br_Link" to="/catalog">Каталог</Link> / { state.dataGoods.data.results[i].name}</p>
                    </div>
                    <Row xs={4} md={4} className="g-4">
                        <Col>
                            <Card key={state.dataGoods.data.results[i].name} className="cardProduct" border={"light"}>
                                <Card.Img className="cardImageProduct" variant="top" src={state.dataGoods.data.results[i].img} />
                            </Card>

                            <h1>{state.dataGoods.data.results[i].name}</h1>
                            <p>Бренд: {state.dataGoods.data.results[i].brand}</p>
                            <p>Цена: {state.dataGoods.data.results[i].cost} руб.</p>
                        </Col>
                    </Row>
                </div>
            )
        }

     }



}
export {Product}

import React, {useContext} from "react";
import {Link, useParams} from "react-router-dom";
import "../static/styles/product.css"
import {context} from "../App";
import {Col, Row, Card} from "react-bootstrap";


const Product = (props) => {
    const {idCat} = useParams();
    const {state, dispatch} = useContext(context);
    console.log(state.dataGoods.results[0].img)
    for (let i = 0; i < state.dataGoods.results.length + 1; i++){
        if (state.dataGoods.results[i].name === idCat){
            return(
                <div>
                    <div className="BR">
                        <p className="Br_p"><Link className="Br_Link" to="/">Главная </Link>
                            / <Link className="Br_Link" to="/catalog">Каталог</Link> / { state.dataGoods.results[i].name}</p>
                    </div>
                    <Row xs={4} md={4} className="g-4">
                        <Col>
                            <Card key={state.dataGoods.results[i].name} className="card" border={"light"}>
                                <Card.Img className="cardImage" variant="top" src={state.dataGoods.results[i].img} />
                            </Card>

                            <h1>{state.dataGoods.results[i].name}</h1>
                            <p>Бренд: {state.dataGoods.results[i].brand}</p>
                            <p>Цена: {state.dataGoods.results[i].cost} руб.</p>
                        </Col>
                    </Row>
                </div>
            )
        }

     }



}
export {Product}

import React, {useContext, useEffect, useReducer, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {Col, Row, Card} from "react-bootstrap";
import {Context} from "../components/reducer";


const Shoplist = (props) => {
    const {state, dispatch} = useContext(Context);
    const [loading, setLoading] = useState(false)
    const [good, setGood] = useState([])
    return(
        <div className={"containerProduct"}>
            <div className="BR">
                <p className="Br_p"><Link className="Br_Link" to="/">Главная </Link>
                     / Корзина</p>
            </div>
            <Row xs={4} md={4} className="g-4">
                {state.product.map((data) => {
                    return <Col>
                        <Card key={data.name} className="cardProduct" border={"light"}>
                            <Card.Img className="cardImageProduct" variant="top" src={data.img}/>
                        </Card>

                        <h1>{data.name}</h1>
                        <p>Бренд: {data.brand}</p>
                        <p>Цена: {data.cost} руб.</p>
                    </Col>
                })}
            </Row>
        </div>
    )




}
export default Shoplist;
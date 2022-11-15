import React from "react";
import {Link, useParams} from "react-router-dom";
import dat from "../components/data"
import {Card, Col, Row} from "react-bootstrap";
import "../static/styles/product.css"

const Product = () => {

    const {id} = useParams();
    for (let i = 0; i < dat().length + 1; i++){
        if (dat()[i].name === id){
            return (
                <div>
                <div className="breadcrumb">
                    <p className="Br_p"><Link className="Br_Link" to="/">Главная </Link>
                        / <Link className="Br_Link" to="/catalog">Каталог</Link> / {dat()[i].name}</p>
                </div>
                <Row xs={4} md={4} className="g-4">
                <Col>
               <Card key={dat()[i].name} className="card" border={"light"}>
                   <Card.Img className="cardImage" variant="top" src={dat()[i].img} />
               </Card>

                    <h1>{dat()[i].name} {dat()[i].description}</h1>
                    <p>Страна: {dat()[i].country}</p>
                    <p>Форма выпуска: {dat()[i].form}</p>
                    <p>Действующие вещества: {dat()[i].deystv}</p>
                    <p>Порядок отпуска: {dat()[i].poryadok}</p>
                    <p>Цена: {dat()[i].cost} руб.</p>
                </Col>
                </Row>
                </div>
            )
        }
    }
}
export {Product}

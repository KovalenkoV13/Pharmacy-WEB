import React, {useEffect, useReducer, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {Col, Row, Card} from "react-bootstrap";
import { Api } from "../components/api/pharmacyApi.ts";

const api = new Api();
const getGoods = async (name ='' ) =>{
    const res = await api.api.apiGoodList({
        name: `${name}`
    },

        )
        .then((response) => {
            return response.data;
        }).catch(()=>{
            return {count:0, results:[]}
        })
    return res
}

const Product = (props) => {
    const [loading, setLoading] = useState(false)
    const [good, setGood] = useState([])
    const {id} = useParams();
    useEffect( () => {
        async function fetchData() {
            const { results } = await getGoods(id);
            await setGood(results);
        }
         fetchData();
    },[id])
            return(
                <div className={"containerProduct"}>
                    <div className="BR">
                        <p className="Br_p"><Link className="Br_Link" to="/">Главная </Link>
                            / <Link className="Br_Link" to="/catalog">Каталог</Link> / {id}</p>
                    </div>
                    <Row xs={4} md={4} className="g-4">
                        {good.map((data) => {
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
export default Product;
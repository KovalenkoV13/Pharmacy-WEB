import React, {useContext, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {Col, Row, Card, Button} from "react-bootstrap";
import {Context} from "../components/reducer";
import DeleteIcon from '@mui/icons-material/Delete';
import {IconButton} from "@mui/material";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";



const Shoplist = (props) => {
    const {state, dispatch} = useContext(Context);


    return(
        <div className={"containerShoplist"}>
            <div className="BR">
                <p className="Br_p"><Link className="Br_Link" to="/">Главная </Link>
                     / Корзина</p>
            </div>
            <div className={"Suma"}>
                <h4>Детали заказа</h4>
                {state.product.length == "1" && <p>{state.product.length} товар </p>}
                {state.product.length == "4" && <p>{state.product.length} товара </p>}
                {state.product.length == "3" && <p>{state.product.length} товара </p>}
                {state.product.length == "2" && <p>{state.product.length} товара </p>}
                {state.product.length != "1"
                    && state.product.length != "2" &&
                    state.product.length != "3" &&
                    state.product.length != "4" &&
                    <p>{state.product.length} товаров </p>}
                {state.product.map((data1) => {
                    return(
                    <p>{data1.name}</p>
                    )
                })
                }
                <Button variant={"dark"}>Оформить закзаз</Button>
            </div>
            <div className={"shoplistProduct"}>
                {state.product.map((data, index) => {
                    console.log(state)
                    return <Col>
                        <div key={index} className={"shoplistProd"}>
                            <div className={"imgShoplist"}>
                                <img className="cardImageProduct" variant="top" src={data.img} alt={data.name}/>
                            </div>
                            <div className={"descriptionShoplist"}>
                            <h5>{data.name}</h5>
                            <p>Цена: {data.cost} руб.</p>
                            </div>
                            <IconButton
                                aria-label="add to favorites"
                                onClick={() => {dispatch({type: 'DELETE_PRODUCT', payload: data.name})}}
                            >
                                <DeleteIcon/>
                            </IconButton>
                        </div>
                    </Col>
                })}
            </div>
        </div>
    )




}
export default Shoplist;
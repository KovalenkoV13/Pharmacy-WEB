import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Col, Row, Card, Button} from "react-bootstrap";
import DeleteIcon from '@mui/icons-material/Delete';
import {IconButton, Snackbar} from "@mui/material";
import { Api } from "../components/api/pharmacyApi.ts";

const api = new Api();

const deleteCart = async (name) =>{
    const res = await api.cart.cartDelete2(
            `${name}`,
    {headers: {'content-type': 'application/json'}
        })
        .then((response) => {
            return console.log(response.status)
        }).catch(()=>{
            return {count:0, results:[]}
        })
    return res
}


const getCart = async () =>{
    const res = await api.cart.cartList()
        .then((response) => {
            return response.data;
        }).catch(()=>{
            return {count:0, results:[]}
        })
    return res
}

const Shoplist = (props) => {
    const [adress, setAdr] = useState("2-я Бауманская ул., д.5, стр.1, Москва")
    const [open, setOpen] = useState(false);
    const [cart, setCart] = useState([])

    useEffect( () => {
        async function fetchData() {
            const {cart} = await getCart();
            await setCart(cart);
        }
        fetchData();
    },[])

    const handleReload = async (name) =>{
        await deleteCart(name)
        const {cart} = await getCart();
        await setCart(cart);
    }


    const handleAdd = async () =>{
        setOpen(true);
    }
    const handleClose = async () =>{
        setOpen(false);
    }

    return(
        <div className={"containerShoplist"}>
            <div className="BR">
                <p className="Br_p"><Link className="Br_Link" to="/">Главная </Link>
                     / Корзина</p>
            </div>
            <div  className={"Suma"}>
                <h4>Детали заказа</h4>
                {cart.length == "1" && <p>{cart.length} товар </p>}
                {cart.length == "4" && <p>{cart.length} товара </p>}
                {cart.length == "3" && <p>{cart.length} товара </p>}
                {cart.length == "2" && <p>{cart.length} товара </p>}
                {cart.length != "1"
                    && cart.length != "2" &&
                    cart.length != "3" &&
                    cart.length != "4" &&
                    <p>{cart.length} товаров </p>}
                {cart.map((data1) => {
                    return(
                    <p>{data1.name}</p>
                    )
                })
                }
                <p>Адрес доставки</p>
                <input value={adress} onChange={(event => setAdr(event.target.value))}/>

                <Button
                    onClick={handleAdd}
                    variant={"dark"}>
                    Оформить закзаз
                </Button>
            </div>
            <div className={"shoplistProduct"}>
                {cart.map((data, index) => {
                    return <Col>
                        <Snackbar
                            open={open}
                            anchorOrigin={ {vertical: 'bottom', horizontal: 'right'} }
                            autoHideDuration={3000}
                            onClose={handleClose}
                            message="Заказ успешно оформлен!"
                        />
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
                                onClick={() => {handleReload(data.name)}}
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
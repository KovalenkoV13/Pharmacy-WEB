import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Col, Row, Card, Button} from "react-bootstrap";
import DeleteIcon from '@mui/icons-material/Delete';
import {IconButton, Snackbar} from "@mui/material";
import { Api } from "../components/api/pharmacyApi.ts";
import {Context} from "../components/reducer";
import Cookies from "js-cookie";

const api = new Api();

export const StatusEnum = {
    Pending: "Ожидает подтверждения",
    Confirmed: "Подтвержден",
    Denied: "Отклонен",
    Delivery: "Передан в доставку",
    InProgress: "Доставляется",
    Done: "Доставлен"
}


const updateOrder = async (order ,sum, adress, users, time_create, time_update, goods, status) =>{
    const res = await api.api.apiOrdersUpdate(
        `${order}`,
        {
            id: `${order}`,
            sum: `${sum}`,
            adress: `${adress}`,
            users: `${users}`,
            time_create: `${time_create}`,
            time_update: `${time_update}`,
            goods: goods,
            status: `${status}`
        },
        {
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken')
            }}
    )
        .then((response) => {
            return response.data;
        }).catch(()=>{
            return {count:0, results:[]}
        })
    return res
}


const getOrder = async (user = '') =>{
    const res = await api.api.apiOrdersList({},
        {
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }
    )
        .then((response) => {
            return response.data;
        }).catch(()=>{
            return {count:0, results:[]}
        })
    return res
}

const Orderuser = (props) => {
    const {state, dispatch} = useContext(Context);
    const [adress, setAdr] = useState("2-я Бауманская ул., д.5, стр.1, Москва")
    const [open, setOpen] = useState(false);
    const [cart, setCart] = useState([])
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()

    useEffect( () => {
        async function fetchData() {
            const {results} = await getOrder();
            await setCart(results);
        }
        fetchData();
    },[])

    const handleReload = async () =>{
        const {results} = await getOrder();
        await setCart(results);
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
                    / Заказ</p>
            </div>
            <div className={"shoplistProduct"}>
                {cart.map((data, index) => {
                    console.log(data.time_create)
                    return (
                        <div key={index} className={"shoplistProd"}>
                            <div className={"descriptionShoplist"}>

                                <h5>Заказ №{data.id} от {data.time_create}</h5>
                                {data.goods.map((data1)=>{
                                    return(
                                    <p>{data1}</p>
                                    )
                                    }
                                )}
                                <p><b>Адрес:</b> {data.adress}</p>
                                {state.isManager &&
                                <p><b>Клиент:</b> {data.users}</p>
                                }
                                <p><b>Статус:</b> {data.status}</p>
                                {data.status == StatusEnum.Pending && state.isManager &&
                                    <>
                                        <Button
                                            variant="success"
                                            style={{marginRight: "6px"}}
                                            onClick={()=>{updateOrder(data.id, data.sum, data.adress, data.users, data.time_create, `${day}.0${month+1}.${year}`, data.goods, StatusEnum.Confirmed)}}
                                              >Подтвердить</Button>
                                        <Button
                                            variant="danger"
                                            style={{marginLeft: "6px"}}
                                            onClick={()=>{updateOrder(data.id, data.sum, data.adress, data.users, data.time_create, `${day}.0${month+1}.${year}`, data.goods, StatusEnum.Denied)}}
                                                >Отклонить</Button>
                                    </>

                                }
                                {data.status == StatusEnum.Confirmed && state.isManager &&
                                    <>
                                        <Button
                                            variant="success"
                                            style={{marginRight: "6px"}}
                                            onClick={()=>{updateOrder(data.id, data.sum, data.adress, data.users, data.time_create, `${day}.0${month+1}.${year}`, data.goods, StatusEnum.Delivery)}}
                                        >Передан в доставку</Button>
                                        <Button
                                            variant="danger"
                                            style={{marginLeft: "6px"}}
                                            onClick={()=>{updateOrder(data.id, data.sum, data.adress, data.users, data.time_create, `${day}.0${month+1}.${year}`, data.goods, StatusEnum.Denied)}}
                                        >Отклонить</Button>
                                    </>
                                }
                                {data.status == StatusEnum.Delivery && state.isManager &&
                                    <>
                                        <Button
                                            variant="success"
                                            style={{marginRight: "6px"}}
                                            onClick={()=>{updateOrder(data.id, data.sum, data.adress, data.users, data.time_create, `${day}.0${month+1}.${year}`, data.goods, StatusEnum.InProgress)}}
                                        >Доставляется</Button>
                                        <Button
                                            variant="danger"
                                            style={{marginLeft: "6px"}}
                                            onClick={()=>{updateOrder(data.id, data.sum, data.adress, data.users, data.time_create, `${day}.0${month+1}.${year}`, data.goods, StatusEnum.Denied)}}
                                        >Отклонить</Button>
                                    </>
                                }
                                {data.status == StatusEnum.InProgress && state.isManager &&
                                    <>
                                        <Button
                                            variant="success"
                                            style={{marginRight: "6px"}}
                                            onClick={()=>{updateOrder(data.id, data.sum, data.adress, data.users, data.time_create, `${day}.0${month+1}.${year}`, data.goods, StatusEnum.Done)}}
                                        >Выполнить</Button>
                                        <Button
                                            variant="danger"
                                            style={{marginLeft: "6px"}}
                                            onClick={()=>{updateOrder(data.id, data.sum, data.adress, data.users, data.time_create, `${day}.0${month+1}.${year}`, data.goods, StatusEnum.Denied)}}
                                        >Отклонить</Button>
                                    </>

                                }
                            </div>
                        </div>
                )
                })}
            </div>
        </div>
    )




}
export default Orderuser;
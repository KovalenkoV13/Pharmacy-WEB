import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Col, Row, Card, Button, Form} from "react-bootstrap";
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


const getOrder = async (time_update_after = '', time_update_before = '', status = '' ) =>{
    const res = await api.api.apiOrdersList({
            time_update_after: `${time_update_after}`,
            time_update_before: `${time_update_before}`,
            status: `${status}`
        },

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
    const [status, setStatus] = useState("")
    const [before, setBefore] = useState("")
    const [after, setAfter] = useState("")

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
        if (status === 'Все') {
            const {results} = await getOrder(after, before, '');
            await setCart(results);
        }
        else {
            const {results} = await getOrder(after, before, status);
            await setCart(results);
        }
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
                <p className="Br_p"><Link className="Br_Link" to="/">Каталог </Link>
                    / Заказ</p>
            </div>
            <div className={"Suma"}>
               <Form.Group className={"dateOrder"}>
                   <Form.Label>C даты</Form.Label>
                   <Form.Control
                       type={"date"}
                       onChange={(event => setAfter(event.target.value))}
                   ></Form.Control>
               </Form.Group>
                <Form.Group className={"dateOrder"}>
                    <Form.Label>По дату</Form.Label>
                    <Form.Control
                        type={"date"}
                        onChange={(event => setBefore(event.target.value))}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className={"status"}>
                    <Form.Label>Статус</Form.Label>
                <Form.Select aria-label="status" style={{
                    width: "100%",
                }}
                             onChange={(event => setStatus(event.target.value))}
                >
                    <option>Все</option>
                    <option>{StatusEnum.Pending}</option>
                    <option>{StatusEnum.Confirmed}</option>
                    <option>{StatusEnum.Denied}</option>
                    <option>{StatusEnum.InProgress}</option>
                    <option>{StatusEnum.Delivery}</option>
                    <option>{StatusEnum.Done}</option>
                </Form.Select>
                </Form.Group>
                <Button variant={"dark"} className={"reloadOrders"}  onClick={handleReload}>Применить фильтры</Button>
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
                                {(data.status == StatusEnum.Confirmed || data.status == StatusEnum.Delivery || data.status == StatusEnum.InProgress) &&
                                    <p><b>Дата обновления статуса:</b> {data.time_update}</p>
                                }
                                {data.status == StatusEnum.Done &&
                                    <p><b>Дата доставки:</b> {data.time_update}</p>
                                }
                                {data.status == StatusEnum.Denied &&
                                    <p><b>Дата завершения:</b> {data.time_update}</p>
                                }
                                {data.status == StatusEnum.Pending && state.isManager &&
                                    <>
                                        <Button
                                            variant="success"
                                            style={{marginRight: "6px"}}
                                            onClick={()=>{updateOrder(data.id, data.sum, data.adress, data.users, data.time_create, `${day}.0${month+1}.${year}`, data.goods, StatusEnum.Confirmed); handleReload()}}
                                              >Подтвердить</Button>
                                        <Button
                                            variant="danger"
                                            style={{marginLeft: "6px"}}
                                            onClick={()=>{updateOrder(data.id, data.sum, data.adress, data.users, data.time_create, `${day}.0${month+1}.${year}`, data.goods, StatusEnum.Denied); handleReload()}}
                                                >Отклонить</Button>
                                    </>

                                }
                                {data.status == StatusEnum.Confirmed && state.isManager &&
                                    <>
                                        <Button
                                            variant="success"
                                            style={{marginRight: "6px"}}
                                            onClick={()=>{updateOrder(data.id, data.sum, data.adress, data.users, data.time_create, `${day}.0${month+1}.${year}`, data.goods, StatusEnum.Delivery); handleReload()}}
                                        >Передан в доставку</Button>
                                        <Button
                                            variant="danger"
                                            style={{marginLeft: "6px"}}
                                            onClick={()=>{updateOrder(data.id, data.sum, data.adress, data.users, data.time_create, `${day}.0${month+1}.${year}`, data.goods, StatusEnum.Denied); handleReload()}}
                                        >Отклонить</Button>
                                    </>
                                }
                                {data.status == StatusEnum.Delivery && state.isManager &&
                                    <>
                                        <Button
                                            variant="success"
                                            style={{marginRight: "6px"}}
                                            onClick={()=>{updateOrder(data.id, data.sum, data.adress, data.users, data.time_create, `${day}.0${month+1}.${year}`, data.goods, StatusEnum.InProgress); handleReload()}}
                                        >Доставляется</Button>
                                        <Button
                                            variant="danger"
                                            style={{marginLeft: "6px"}}
                                            onClick={()=>{updateOrder(data.id, data.sum, data.adress, data.users, data.time_create, `${day}.0${month+1}.${year}`, data.goods, StatusEnum.Denied); handleReload()}}
                                        >Отклонить</Button>
                                    </>
                                }
                                {data.status == StatusEnum.InProgress && state.isManager &&
                                    <>
                                        <Button
                                            variant="success"
                                            style={{marginRight: "6px"}}
                                            onClick={()=>{updateOrder(data.id, data.sum, data.adress, data.users, data.time_create, `${day}.0${month+1}.${year}`, data.goods, StatusEnum.Done); handleReload()}}
                                        >Выполнить</Button>
                                        <Button
                                            variant="danger"
                                            style={{marginLeft: "6px"}}
                                            onClick={()=>{updateOrder(data.id, data.sum, data.adress, data.users, data.time_create, `${day}.0${month+1}.${year}`, data.goods, StatusEnum.Denied); handleReload()}}
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
import React, {useContext} from "react";
import {fetchContext} from "../components/reducer";
import {Link} from "react-router-dom";
import {Card, Col, Row} from "react-bootstrap";
import {CardActions, IconButton} from "@mui/material";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import {useGoodCat} from "./api/query";

export default function Items(props) {
    const cat = useGoodCat()
    const {state} = useContext(fetchContext)
    console.log(state)
    return (
                <Row xs={3} md={3} className="g-4">
                    {cat.data.results.map((data) => {
                        return <Col>
                            <Card key={data.name}>
                                <div className="c_img">
                                    <Card.Img className="cardImage" variant="top" src={data.img}/>
                                </div>
                                <Card.Body>
                                    <div className="Text">
                                        <div className="textStyle">
                                            <Card.Title>{data.name}</Card.Title>
                                        </div>
                                        <div className="textStyle">
                                            <Card.Text>
                                                {data.brand}
                                            </Card.Text>
                                        </div>
                                        <div className="textStyle">
                                            <Card.Text class="cost">
                                                {data.cost}₽
                                            </Card.Text>
                                        </div>
                                    </div>
                                    <div className="actionP">
                                        <CardActions disableSpacing>
                                            <IconButton aria-label="add to favorites" color="error">
                                                <FavoriteTwoToneIcon/>
                                            </IconButton>
                                            <IconButton aria-label="add to favorites" color="error">
                                                <AddShoppingCartOutlinedIcon/>
                                            </IconButton>
                                            <Link className="cardButton" to={`/catalog/${data.name}`} > Подробнее</Link>
                                        </CardActions>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    })}
                </Row>
    );


}
import React from 'react';
import {Card, Col, Row} from "react-bootstrap";
import {CardActionArea, CardActions, IconButton} from "@mui/material";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import {useParams} from "react-router-dom";

const List = (props) => {
    console.log(props)
    const {idCat} = useParams();
    const { goods } = props;
    if (!goods || goods.length === 0) return <p>Нет товаров</p>;
    return (
        <Row xs={3} md={3} className="g-4">
            {goods.results.map((data) => {
                return <Col>
                    <Card key={data.name}>
                        <CardActionArea key={data.name} href={`${idCat}/${data.name}`}>
                            <div className="c_img">
                                <Card.Img className="cardImage"  variant="top" src={data.img}  />
                            </div>
                        </CardActionArea>
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
                                    <IconButton aria-label="add to favorites" color="error" >
                                        <FavoriteTwoToneIcon />
                                    </IconButton>
                                    <IconButton aria-label="add to favorites" color="error">
                                        <AddShoppingCartOutlinedIcon />
                                    </IconButton>
                                    <a className="cardButton" href={`catalog/${data.name}`}>Подробнее</a>
                                </CardActions>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            })}
        </Row>
    );
};
export default List;
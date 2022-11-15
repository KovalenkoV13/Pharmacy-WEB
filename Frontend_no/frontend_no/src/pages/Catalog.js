import React from 'react';
import {Card, Col, Row} from "react-bootstrap";
import dat from "../components/data"
import {CardActionArea, CardActions, IconButton} from "@mui/material";
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';

export default function Catalog() {
    return (
        <Row xs={4} md={4} className="g-4">
            {dat().map((data) => {
                return <Col>
                    <Card key={data.name}>
                        <CardActionArea key={data.name} href={`catalog/${data.name}`}>
                        <Card.Img className="cardImage" variant="top" src={data.img}  />
                        </CardActionArea>
                        <Card.Body>
                            <div className="Text">
                            <div className="textStyle">
                                <Card.Title>{data.name}</Card.Title>
                            </div>
                            <div className="textStyle">
                                <Card.Text>
                                    {data.description}
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
}



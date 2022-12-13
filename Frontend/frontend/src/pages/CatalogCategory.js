import {Link, useParams} from "react-router-dom";
import {useContext, useEffect, useReducer} from "react";
import axios from "axios";
import {Context, fetchCat, fetchGood, fetchGoodCat, initialState, Reducer} from "../components/reducer";
import {Card, Col, Row} from "react-bootstrap";
import {CardActions, IconButton} from "@mui/material";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import {useGoodCat} from "../components/api/query";




export default function FetchCatalogCategory(props){
   const {idCat} = useParams()
    const cat = useGoodCat("2")
    const [state, dispatch] = useReducer(Reducer,initialState)
    useEffect(() => {
        Promise.all([fetchGoodCat(idCat)])
            .then(function (results) {
                dispatch({type: 'FETCH_GOOD_CAT', payload: results[0]});
            });
    },[]);
    console.log(state)

    return(
        <div className="conteinerCatalog">
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
        </div>

    )

}
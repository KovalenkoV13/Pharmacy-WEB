import React, {useContext} from "react";
import {Context} from "./reducer";
import Category from "../pages/Category";
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListSubheader from '@mui/joy/ListSubheader';
import ListItemButton from '@mui/joy/ListItemButton';
import Sheet from '@mui/joy/Sheet';
import {Link, useParams} from "react-router-dom";
import {useCategories} from "./api/query";

function Filtres(props){
    const category = useCategories()
    const {idCat} = useParams()
    const {state} = useContext(Context);


    return(
        <div className={"filterContainer"} >
            <h2>Категории</h2>
            <Sheet
                variant="outlined"
                sx={{
                    width: 200,
                    maxHeight: 300,
                    overflow: 'auto',
                    borderRadius: 'sm',
                }}
            >
                            <List>
                                {category.data.map((data) => (
                                    <ListItem key={data.id_cat}>
                                        <ListItemButton key={data.id_cat}>
                                            <Link to={`/catalog/category/${data.id_cat}`} >
                                            {data.name}
                                            </Link>
                                        </ListItemButton>
                                    </ListItem>

                                ))}
                            </List>
            </Sheet>
        </div>

    )
}

export default Filtres;
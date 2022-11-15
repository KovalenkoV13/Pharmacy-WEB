import React from 'react';
import Typography from '@mui/material/Typography';
import {Breadcrumbs as BR} from '@mui/material';
import {Link, useParams} from "react-router-dom";
import {Box} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext"

export default function BBBBreadcrumbs() {
    const {id} = useParams();
    return (
        <Box m = {2}>
            <BR
                aria-label="breadcrumb"
                separator={<NavigateNextIcon fontSize="small" />}>
                <Link to="/">
                Главная
                </Link>
                <Link to="/Catalog">
                Каталог
                </Link>
            </BR>
        </Box>
    );
}
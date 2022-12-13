import React from "react";
import {useCategories, useGoodCat, useGoods} from "../components/api/query"
function Main (){
    const cat = useGoodCat("2");
    console.log(cat)
     return(
         <div>
        <h1>Это наша стартовая страница</h1>

         </div>

     )
}

 export default Main;
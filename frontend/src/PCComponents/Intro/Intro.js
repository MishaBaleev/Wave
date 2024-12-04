import "./Intro.scss";
import icon from "./img/icon.png";
import { useState } from "react";
import Contacts from "./MiddlePlates/Contacts/Contacts";
import Info from "./MiddlePlates/Info/Info";
import Examples from "./MiddlePlates/Examples/Examples";
import MiddlePlates from "./MiddlePlates/MiddlePlates";
import Footer from "../Footer/Footer";
import back from "./img/back.png";

const Intro = (props) => {
    const [cur_small_cmp, setCurSmallCMP] = useState(0)
    const classes = [".middle_plates", ".contacts", ".info",  ".examples"]

    const setCmp = (value) => {
        if (cur_small_cmp !== value){
            let cur_cmp_element = document.querySelector(classes[cur_small_cmp])
            cur_cmp_element.classList.add("unactive")

            let back_element = document.querySelector(".back")
            if (value === 0){ //hide back
                back_element.classList.remove("active")
                back_element.classList.add("unactive")
            }else{ //show back
                back_element.classList.remove("unactive")
                back_element.classList.add("active")
            }

            setTimeout(() => {setCurSmallCMP(value)}, 300)
        }
    }

    const small_cmps = [
        <MiddlePlates setCurSmallCMP={setCmp} setCurBigCMP={props.changeCMP}/>,
        <Contacts/>,
        <Info/>,
        <Examples/>
    ]

    return <div className="intro">
        <div className="top">
            <div className="title">
                <img className="main_icon" src={icon} alt="icon"/>
                <p>ВОЛНА</p>
            </div>
            <button className="back" onClick={() => {setCmp(0)}}><img src={back} alt="back"/></button>
        </div>
        {small_cmps[cur_small_cmp]}
        <Footer/>
    </div>
}
export default Intro
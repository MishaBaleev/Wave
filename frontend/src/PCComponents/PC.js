import { useEffect, useState } from "react";
import Intro from "./Intro/Intro";
import "./PC.scss";
import Demonstration from "./Demonstration/Demonstration";
import Constructor from "./Constructor/Constructor";
import Modal from "./Modal/Modal";
import { connect } from "react-redux";

const PC = (props) => {
    const [cur_cmp, setCurCMP] = useState(0)
    const [demo_cmp, setDemoCMP] = useState(0)

    const changeCMP = (value) => {
        if (value === 0){ //intro
            setCurCMP(value)
        }else if (value === 7){ //constructor
            setCurCMP(2)
        }else{
            setDemoCMP(value)
            setCurCMP(1)
        }
    }

    const cmps = [
        <Intro changeCMP={changeCMP}/>,
        <Demonstration changeCMP={changeCMP} demo_cmp={demo_cmp}/>,
        <Constructor changeCMP={changeCMP}/>
    ]

    return <div className="pc">
        {cmps[cur_cmp]}
        {props.app.modal.title!==""?
            <Modal/>:""
        }
    </div>
}
const mapStateToProps = (state) => {return state}
const mapDispatchToProps = (dispatch) => {return {}} 
export default connect(mapStateToProps, mapDispatchToProps)(PC)
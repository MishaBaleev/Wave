import { useEffect, useState } from "react";
import "./Constructor.scss";
import ParticlesBg from "particles-bg";
import Header from "./Header/Header";
import Configuration from "./Configuration/Configuration";
import Settings from "./CMPList/Settings";
import Frame from "./CMPList/Frame";
import Battery from "./CMPList/Battery";
import Engine from "./CMPList/Engine";
import Propeller from "./CMPList/Propeller";
import Additionaly from "./CMPList/Additionaly";
import { Manager } from "./Manager";
import { connect } from "react-redux";
import { updateModal } from "../../AppSlice";   

const Constructor = (props) => {
    const [manager, setManager] = useState(null)
    const [max_cmp, setMaxCmp_] = useState(0)

    const default_config = [
        {name: "Выберите раму", price: 0, comp: "Рама", active_index: null},
        {name: "Выберите аккумулятор", price: 0, comp: "Аккумулятор", active_index: null},
        {name: "Выберите двигатели", price: 0, comp: "Двигатели", active_index: null},
        {name: "Выберите пропеллеры", price: 0, comp: "Пропеллеры", active_index: null},
        {name: "Выберите доп. компоненты", price: 0, comp: "Дополнительно", active_index: null}
    ]

    const [finished_cmps, setFinCMPs] = useState([false, false, false, false, false])
    const finishWork = (index, reverse=false) => {
        if (reverse === true){
            setMaxCmp_(index)
            let cur_finised_cmps = [...finished_cmps]
            for (let i = 0; i <= 4; i++){
                if (i < index){cur_finised_cmps[i] = true}
                else{cur_finised_cmps[i] = false}
            }
            setFinCMPs(cur_finised_cmps)
        }else{
            setMaxCmp_(index+1)
            let cur_finised_cmps = [...finished_cmps]
            for (let i = 0; i <= 4; i++){
                if (i <= index){cur_finised_cmps[i] = true}
                else{cur_finised_cmps[i] = false}
            }
            setFinCMPs(cur_finised_cmps)
        }
    }

    const [config, setConfig] = useState(default_config)
    const changeConfig = (value, index) => {
        let cur_config = [...config]
        if (value === null){ //remove element
            manager.setMaxCmp(index+1)
            for (let i = index; i <= 4; i++){
                cur_config[i] = default_config[i]
            }
            if (index === 0){manager.removeFrame()}
            if (index === 1){manager.removeBattery()}
            finishWork(index, true)
        }else{ //add element
            cur_config[index].name = value.name
            cur_config[index].price = value.price 
            cur_config[index].active_index = value.id
            for (let i = index+1; i <= 4; i++){
                cur_config[i] = default_config[i]
            }
            finishWork(index)
            if (index === 0){manager.setFrame(value.id)}
            if (index === 1){manager.setBattery(value.id)}
            if (index > 1){
                manager.setMaxCmp(manager.max_cmp + 1)
            }
        }
        setConfig(cur_config)
    }

    const [settings, setSettings] = useState({
        type: "race", distance: "1.5", payload: 300, speed: 20, life_time: 10
    })
    const changeSettings = (value) => {
        setSettings(value)
        changeConfig(null, 0)
        manager.setSettings(value)
    }

    const refresh = () => {
        setConfig(default_config)
        changeSettings({
            type: "race",
            distance: "2.0",
            payload: 1000,
            speed: 3,
            life_time: 20
        })
        setCurCMP(0)
        manager.clear()
    }

    useEffect(() => {
        document.querySelector(".particles-bg-canvas-self").classList.add("background")
        let manager_new = new Manager()
        setManager(manager_new)
    }, [])

    const [cur_cmp, setCurCMP] = useState(0)
    const changeCurCMP = (value) => {
        setCurCMP(value)
    }
    const cmps = [
        <Settings settings={settings} setSettings={changeSettings} finishWork={finishWork}/>,
        <Frame finishWork={finishWork} config={config} setConfig={changeConfig} manager={manager} default_config={default_config}/>,
        <Battery finishWork={finishWork} config={config} setConfig={changeConfig} manager={manager}/>,
        <Engine finishWork={finishWork} config={config} setConfig={changeConfig} manager={manager}/>,
        <Propeller finishWork={finishWork} config={config} setConfig={changeConfig} manager={manager}/>,
        <Additionaly finishWork={finishWork} config={config} setConfig={changeConfig} manager={manager}/>,
    ]

    return <div className="constructor">
        <ParticlesBg type="cobweb" bg={true} color="#B9CAEA"/>
        <Header 
            cur_cmp={cur_cmp} 
            setCurCMP={changeCurCMP} 
            changeBigCMP={props.changeCMP} 
            finished_cmps={finished_cmps} 
            refresh={refresh} 
            config={config}
            settings={settings} 
            manager={manager}   
        />
        <div className="work_zone">
            <Configuration config={config} max_cmp={max_cmp}/>
            {cmps[cur_cmp]}
        </div>
    </div>
}
const mapStateToProps = (state) => {return state}
const mapDispatchToProps = (dispatch) => {return {
    "updateModal": (data) => dispatch(updateModal(data))
}}
export default connect(mapStateToProps, mapDispatchToProps)(Constructor)
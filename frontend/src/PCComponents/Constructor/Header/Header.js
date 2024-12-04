import "./Header.scss";
import icon from "../../Intro/img/icon.png";
import back from "../../Intro/img/back.png";
import { jsPDF } from "jspdf";
import arrow from "../../Demonstration/Header/img/arrow.png";

const Header = (props) => {
    const buttons = Array(6).fill(0).map((item, index) => {return require(`../../Intro/MiddlePlates/img/plate_${index+1}.png`)})
    const divs = []
    buttons.forEach((button, index) => {
        if (index !== (buttons.length-1)){
            divs.push({type: "plate", id: index, value: button})
            divs.push({type: "img"})
        }else{
            divs.push({type: "plate", id: index, value: button})
        }
    })
    const buttons_names = ["Параметры", "Рама", "Аккумулятор", "Двигатель", "Пропеллеры", "Дополн-но"]
    
    const default_config = [
        {name: "Выберите раму", price: 0, comp: "Рама", active_index: null},
        {name: "Выберите аккумулятор", price: 0, comp: "Аккумулятор", active_index: null},
        {name: "Выберите двигатели", price: 0, comp: "Двигатели", active_index: null},
        {name: "Выберите пропеллеры", price: 0, comp: "Пропеллеры", active_index: null},
        {name: "Выберите доп. компоненты", price: 0, comp: "Дополнительно", active_index: null}
    ]
    
    const downloadConfig = () => {
        let string_data = "UAV Settings"
        const settings_keys = ["Type", "Max distance", "Max payload", "Max speed", "Max flight time"]
        const settings_units = ["", "km", "gr", "m/c", "min"]
        Object.keys(props.settings).forEach((key, index) => {
            string_data += `\n${index+1}.\t${settings_keys[index]}: ${props.settings[key]} ${settings_units[index]}`
        })
        string_data += "\n\nUAV configuration"
        const json_keys = ["frame", "battery", "engine", "propeller", "additional"]
        const conf_names = ["Frame", "Battery", "Engine", "Propeller", "Additional"]
        props.config.forEach((item, index) => {
            if (item.name === default_config[index].name){
                string_data += `\n${index+1}.\t${conf_names[index]}: Not selected`
            }else{
                let json_data = require(`../../../data/${json_keys[index]}.json`)
                string_data += `\n${index+1}.\t${conf_names[index]}: Price - ${item.price} rub.\nLink - ${json_data[item.active_index].link}`
            }
        })
        const doc = new jsPDF()
        doc.setFontSize(10);
        doc.text(string_data, 20, 20)
        doc.save("UAV.pdf")
    }

    return <div className="header">
        <div className="icon">
            <img className="icon_img" src={icon} alt="icon"/>
            <button className="back_head" onClick={() => {props.changeBigCMP(0)}}>
                <img src={back} alt="back"/>
            </button>
        </div>
        <div className="navigation">
            <div className="nav_button" onClick={() => {props.setCurCMP(0)}}>
                <div className={"nav_item " + ((props.cur_cmp===0)?"active":"")}>
                    <img src={buttons[0]} alt="nav"/>
                    <p>Параметры</p>
                </div>
            </div>
            {divs.slice(1, divs.length).map((item, index) => {
                if (item.type === "plate"){
                    return <div className="nav_button" key={index} onClick={() => {props.setCurCMP(item.id)}}>
                        <div className={"indicator " + ((props.finished_cmps[item.id-1] === true)?"finished":"")}></div>
                        <div className={"nav_item " + ((props.cur_cmp===item.id)?"active":"")}>
                            <img src={item.value} alt="nav"/>
                            <p>{buttons_names[item.id]}</p>
                        </div>
                    </div>
                }else{
                    return <img src={arrow} className="arrow" alt="arrow" key={index}/>
                }
            })}
        </div>
        <div className="reset">
            <button onClick={props.refresh}>Сбросить</button>
            <button onClick={downloadConfig}>Выгрузить</button>
        </div>
    </div>
}
export default Header
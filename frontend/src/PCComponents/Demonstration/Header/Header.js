import "./Header.scss";
import icon from "../../Intro/img/icon.png";
import back from "../../Intro/img/back.png";
import arrow from "./img/arrow.png";

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
    const buttons_names = ["Параметры", "Рама", "Аккумулятор", "Двигатель", "Пропеллеры", "Допол-но"]
    
    return <div className="header_demo">
        <div className="logo">
            <img className="icon" src={icon} alt="icon"/>
            <button className="back_head" onClick={() => {props.changeBigCMP(0)}}>
                <img src={back} alt="back"/>
            </button>
        </div>
        <div className="navigation">
            {divs.map((item, index) => {
                if (item.type === "plate"){
                    return <div className={"nav_item " + ((props.cur_cmp===item.id)?"active":"")} key={index} onClick={() => {props.setCurCMP(item.id)}}>
                        <img src={item.value} alt="nav"/>
                        <p>{buttons_names[item.id]}</p>
                    </div>
                }else{
                    return <img src={arrow} className="arrow" alt="arrow" key={index}/>
                }
            })}
        </div>
        <button className="constructor_but" onClick={() => {props.changeBigCMP(7)}}>Сборка</button>
    </div>
}
export default Header
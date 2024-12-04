import info_icon from "./img/info.png";

const Plate = (props) => {
    const mouseOver = () => {
        let element = document.querySelector(`.hint._${props.index}`)
        element.classList.remove("unactive")
        element.classList.add("active")
    }
    const mouseOut = () => {
        let element = document.querySelector(`.hint._${props.index}`)
        element.classList.remove("active")
        element.classList.add("unactive")
    }

    return <div className="plate">
        <div className="card" onClick={() => {props.setCurBigCMP(props.index+1)}}>
            <img className="info_button" onMouseOver={mouseOver} onMouseOut={mouseOut} src={info_icon} alt="info"/>
            <img className="card_img" src={props.img} alt="icon"/>
            <p className="name">{props.name}</p>
            <div className={"hint " + `_${props.index}`}>
                <p>{props.hint}</p>
            </div>
        </div>
    </div>
}
export default Plate
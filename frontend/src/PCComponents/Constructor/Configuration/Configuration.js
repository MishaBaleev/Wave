import "./Configuration.scss";

const Configuration = (props) => {

    const steps = new Array(6).fill(0).map((_, index) => {
        return require(`./img/step_${index}.png`)
    })

    const mouseOver = (index) => {
        let element = document.querySelector(`.hint_conf._${index}`)
        element.classList.remove("unactive")
        element.classList.add("active")
    }
    const mouseOut = (index) => {
        let element = document.querySelector(`.hint_conf._${index}`)
        element.classList.remove("active")
        element.classList.add("unactive")
    }

    const getTotalPrice = () => {
        let total_price = 0 
        props.config.forEach(item => {total_price += Number(item.price)})
        return total_price
    }

    const cutText = (str, len) => {
        if (str.length <= len){
            return str
        }else{
            return str.substring(0, len) + "..."
        }
    }

    return <div className="configuration">
        <div className="title"><p>Конфигурация</p></div>
        <div className="step">
            
        </div>
        <ul className="conf_list">
            <li className="step">
                <img src={steps[props.max_cmp]} alt="step"/>
            </li>
            {props.config.map((item, index) => {
                return <li key={index} onMouseOver={() => {mouseOver(index)}} onMouseOut={() => {mouseOut(index)}}>
                    <div className={"hint_conf _" + index}><p>{cutText(item.name, 24)}</p></div>
                    <div className="descr">
                        <p className="comp">{item.comp}</p>
                        <p className="price">{item.price} руб.</p>
                    </div>
                </li>
            })}
        </ul>
        <div className="common_price">
            <p>Итого</p>
            <p className="price">{getTotalPrice()} руб</p>
        </div>
    </div>
}
export default Configuration
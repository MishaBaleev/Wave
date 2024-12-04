import { useEffect, useState } from "react";
import coins from "./img/coins.png";

const Card = (props) => {
    const [img_data, setImg] = useState({
        frame: null,
        battery: null,
        motor: null,
        propellers: null,
        optionaly: null
    })
    useEffect(() => {
        let cur_img_data = {...img_data}
        Object.keys(img_data).forEach(key => {
            cur_img_data[key] = require(`./img/${key}_${props.index+1}.png`)
        })
        setImg(cur_img_data)
    }, [])

    const cutString = (string, len) => {
        if (string.length <= len){
            return string
        }else{
            return string.substring(0, len) + "..."
        }
    }

    const goToShop = (url) => {
        window.open(url)
    }

    return <div className="card">
        <div className="index">
            <div className="frame"><p>{props.index+1}</p></div>
        </div>
        <div className="section_1">
            <p className="description">{props.data.description}</p>
            <div className="price">
                <img src={coins} alt="coins"/>
                <p>{props.data.price} руб</p>
            </div>
        </div>
        <div className="section_2">
            {Object.keys(img_data).map((key, index) => {
                if (props.data[key]){
                    return <div className="part" key={index} onClick={() => {goToShop(props.data[key+"_url"])}}>
                        <img src={img_data[key]} alt="part"/>
                        <p>{cutString(props.data[key], 10)}</p>
                    </div>
                }else{
                    return ""
                }
            })}
        </div>
    </div>
}
export default Card
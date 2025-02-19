import "./MiddlePlates.scss";
import Plate from "./Plate";

const MiddlePlates = (props) => {
    const plates = [
        {
            name: "Параметры",
            img: require("./img/plate_1.png"),
            hint: "Для подбора компонентов БАС необходимо определить общий ценовой диапазон, цель использования БАС и т.д."
        },
        {
            name: "Рама",
            img: require("./img/plate_2.png"),
            hint: "Рама является основой будущего устройства. От рамы зависит грузоподъемность, масса устройства и т.д."
        },
        {
            name: "Аккумулятор",
            img: require("./img/plate_3.png"),
            hint: "Аккумуляторная батарея устройства позволяет устройству работать в беспроводном режиме."
        },
        {
            name: "Двигатель",
            img: require("./img/plate_4.png"),
            hint: "От двигателей зависит максимальная скорость и грузоподъемность устройства. Кол-во двигателей соответствует кол-ву лучей рамы."
        },
        {
            name: "Пропеллеры",
            img: require("./img/plate_5.png"),
            hint: "Пропеллеры обеспечивают подъемную силу устройства, а также его маневренность. Кол-во пропеллеров соответствует кол-ву двигателей."
        },
        {
            name: "Дополнительно",
            img: require("./img/plate_6.png"),
            hint: "Дополнительно любое устройство можно оснастить камерой или любым другим подвесным оборудованием в зависимости от целей БАС."
        },
    ]
    const mini_buttons = ["Сборка", "Обратная связь", "Справка", "Примеры"]

    const changeCMP = (value) => {
        if (value === 0){ // constructor
            props.setCurBigCMP(7)
        }else{
            props.setCurSmallCMP(value)
        }
    }

    return <div className="middle_plates">
        {plates.map((item, index) => {
            return <Plate 
                key={index} 
                index={index}
                name={item.name} 
                img={item.img} 
                hint={item.hint} 
                setCurBigCMP={props.setCurBigCMP}
            />
        })}
        <div className="multi_plate">
            {mini_buttons.map((item, index) => {
                return <button key={index} onClick={() => {changeCMP(index)}}>{item}</button>
            })}
            <button className="big" onClick={() => {changeCMP(4)}}>Итоговое тестирование</button>
        </div>
    </div>
}
export default MiddlePlates
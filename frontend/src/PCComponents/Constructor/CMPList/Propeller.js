import "./CMPList.scss";
import { useEffect, useState } from "react";
import coins from "./img/coins.png";
import filter_icon from "../../Demonstration/Hardware/img/filter.png";
import Filter from "../../Demonstration/Hardware/Filter/Filter";
import pattern from "./img/pattern.png";

const Propeller = (props) => {
    const [data, setData] = useState([])
    const topics = [
        {name: "Материал", key: "material"},
        {name: "Длина (мм)", key: "length"},
        {name: "Вес (кг)", key: "weight"},
        {name: "Шаг", key: "pitch"}
    ]
    const [isFilterActive, setFilterActive] = useState(false)

    useEffect(() => {
        let data = []
        if (props.manager.max_cmp >= 4){
            data = props.manager.getFilteredItems("propeller")
        }
        setData(data)
    }, [])

    const goToShop = (url) => {
        window.open(url)
    }

    const userChoice = (index) => {
        let cur_config = [...props.config] 
        if (index === cur_config[3].active_index){ //remove item
            props.setConfig(null, 3)
        }else{
            data.forEach(item => {
                if (item.id === index){props.setConfig(item, 3)}
            })
        }
    }

    const changeFilterActive = () => {
        if (isFilterActive === true){
            setFilterActive(false)
        }else{
            setFilterActive(true)
        }
    }

    const filterItems = (filter) => {
        let data = []
        if (props.manager.max_cmp >= 4){
            data = props.manager.getFilteredItems("propeller")
        }
        let new_data = []
        data.forEach(item => {
            if ((parseInt(item.price) >= parseInt(filter.priceAbove)) && 
            (parseInt(item.price) <= parseInt(filter.priceBelow))){
                new_data.push(item)
            }
        })
        if (filter.filter_by === "price"){
            new_data = new_data.sort((a, b) => {
                let price_1 = parseInt(a.price)
                let price_2 = parseInt(b.price)
                return ((price_1 < price_2) ? -1 : ((price_1 > price_2) ? 1 : 0));
            })
        }
        if (filter.filter_by === "name"){
            new_data = new_data.sort((a, b) => a.name.localeCompare(b.name))
        }
        setData(new_data)
    }

    return <div className="component usual">
        <div className="title">
            <div>
                <p className="name">Пропеллер</p>
            </div>
            <p className="counter">Подходящих элементов: {data.length}</p>
            <button className="filter_constr" onClick={changeFilterActive}>
                <img src={filter_icon} alt="filter"/>
            </button>
        </div>
        {isFilterActive===true?<Filter applyFilter={filterItems} changeFilterState={changeFilterActive}/>:""}
        {data.length === 0?
            <div className="empty_result">
                <p>Выберите предыдудщий компонент, или перенастройте фильтры, чтобы выбрать батарею</p>
            </div>:
            <ul className="example_list">
                {data.map((item, index) => {
                    return <li key={index} className="example_item">
                        <div className="section_1">
                            <div className="name">
                                <p onClick={() => {goToShop(item.link)}}>{item.name}</p>
                            </div>
                            <div className="price">
                                <img src={coins} alt="coins"/>
                                <p>{item.price} руб</p>
                            </div>
                            <button className="add" onClick={() => {userChoice(item.id)}}>
                                {(props.config[3].active_index === null)?"Добавить":((props.config[3].active_index === item.id)?"Убрать":"Заменить")}
                            </button>
                        </div>
                        <ul className="section_2">
                            {topics.map((topic, index) => {
                                return <li key={index}>
                                    <p>{topic.name} - {item[topic.key]}</p>
                                </li>
                            })}
                        </ul>
                        <div className="item_img">
                            {item.img_link===""?
                                <img src={pattern} alt="pattern"/>:
                                <img src={require(`./img/cmp_cards/${item.name.replace("/", "_")}.png`)} alt="Element"/>
                            }
                            <div className="gradient"/>
                        </div>
                    </li>
                })}
            </ul>
        }
    </div>
}
export default Propeller
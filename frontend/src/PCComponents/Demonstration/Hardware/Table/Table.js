import { updateModal } from "../../../../AppSlice";
import "./Table.scss";
import { connect } from "react-redux";

const Table = (props) => {
    const goToShop = (index, item) => {
        if (index === 0){
            if (item.link === ""){
                props.updateModal({title: "Предупреждение", message: "Ссылки на данный товар нет"})
            }else{
                window.open(item.link)
            }
        }
    }
    const headers = [
        ["Название", "Материал", "Кол-во лучей", "Вес (кг)", "Цена (руб)"],
        ["Название", "Емкость", "Напряжение (В)", "Вес (кг)", "Разъемы", "Цена (руб)"],
        ["Название", "Производитель", "Мощность (Вт)", "Вес (кг)", "Цена (руб)"],
        ["Название", "Материал", "Длина (мм)", "Вес (кг)", "Цена (руб)"],
        ["Название", "Вес (кг)", "Напряжение входа (В)", "Цена (руб)"]
    ]
    const keys = [
        ["name", "material", "sum_motors", "weight", "price"],
        ["name", "capacity", "voltage", "weight", "balance_connector", "price"],
        ["name", "manufacturer", "peak_power", "weight", "price"],
        ["name", "material", "length", "weight", "price"],
        ["name", "weight", "voltage", "price"]
    ]
    return <div className="table">
        <table className="table_inner" cellPadding={0} border={1}>
            <thead>
                <tr>{headers[props.id].map((item, index) => {
                    return <th key={index}>{item}</th>
                })}</tr>
            </thead>
            <tbody>
                {props.table_data.map((item, index) => {
                    return <tr key={index}>
                        {keys[props.id].map((key, index) => {
                            if (Array.isArray(item[key])){
                                if (item[key].length === 1){
                                    return <th key={index}>{item[key][0]}</th>
                                }else if (item[key].length === 2){
                                    return <th key={index}>{item[key][0]} - {item[key][1]}</th>
                                }else if (item[key].length === 0){
                                    return <th key={index}>Не указано</th>
                                }else{
                                    return <th key={index}>Не указано</th>
                                }
                            }else{
                                return <th key={index} onClick={() => {goToShop(index, item)}}>{item[key]}</th>
                            }
                        })}
                    </tr>
                })}
            </tbody>
        </table>
    </div>
}
const mapStateToProps = (state) => {return state}
const mapDispatchToProps = (dispatch) => {return {
    "updateModal": (data) => {dispatch(updateModal(data))}
}}
export default connect(mapStateToProps, mapDispatchToProps)(Table)
import { useState } from "react";
import "./Filter.scss";
import { connect } from "react-redux";
import { updateModal } from "../../../../AppSlice";

const Filter = (props) => {
    //state
    const [filter_by, setFilterBy] = useState("")
    const [priceAbove, setPriceAbove] = useState(0)
    const [priceBelow, setPriceBelow] = useState(100000)
    
    //handlers
    const applyFilter = () => {
        if (priceAbove < priceBelow){
            props.applyFilter({filter_by: filter_by, priceAbove: priceAbove, priceBelow: priceBelow})
            props.changeFilterState()
        }else{
            props.updateModal({title:"Ошибка", message:"Неверно настроен ценовой диапазон"})
        }
    }
    
    const chnageFilterBy = (value) => {
        if (value === filter_by){
            setFilterBy("")
        }else{
            setFilterBy(value)
        }
    }

    return <div className="filter_window">
        <div className="topic"><p>Фильтры</p></div>
        <div className="filter_item checkbox">
            <p>Сортировать по названию</p>
            <input type="checkbox" 
                checked={filter_by==="name"?true:false}
                onChange={() => chnageFilterBy("name")}
            />
        </div>
        <div className="filter_item checkbox">
            <p>Сортировать по цене</p>
            <input type="checkbox"
                checked={filter_by==="price"?true:false}
                onChange={() => chnageFilterBy("price")}
            />
        </div>
        <div className="filter_item range">
            <p>Цена от</p>
            <input type="range"
                min={0}
                max={100000}
                value={priceAbove}
                onChange={(e) => {setPriceAbove(e.target.value)}}
            />
            <input type="number"
                min={0}
                max={100000}
                value={priceAbove}
                onChange={(e) => {setPriceAbove(e.target.value)}}
            />
        </div>
        <div className="filter_item range">
            <p>Цена до</p>
            <input type="range"
                min={0}
                max={100000}
                value={priceBelow}
                onChange={(e) => {setPriceBelow(e.target.value)}}
            />
            <input type="number"
                min={0}
                max={100000}
                value={priceBelow}
                onChange={(e) => {setPriceBelow(e.target.value)}}
            />
        </div>
        <div className="apply">
            <button onClick={applyFilter}>Применить</button>
        </div>
    </div>
}
const mapStateToProps = (state) => {return state}
const mapDispatchToProps = (dispatch) => {return {
    "updateModal": (data) => {dispatch(updateModal(data))}
}}
export default connect(mapStateToProps, mapDispatchToProps)(Filter)
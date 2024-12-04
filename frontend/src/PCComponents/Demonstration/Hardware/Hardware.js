import { useEffect, useState } from "react";
import "./Hardware.scss";
import Table from "./Table/Table";
import Teach from "./Teach/Teach";
import table_icon from "./img/table.png";
import teach_icon from "./img/teach.png";
import filter_icon from "./img/filter.png";
import Filter from "./Filter/Filter";

const Hardware = (props) => {    

    //state
    const [is_teach, setTeach] = useState(true)
    const [is_filter, setFilterState] = useState(false)

    //handlers
    useEffect(() => {
        if (is_teach === false){
            document.querySelector(".table").scrollTo(0, 0)
        }else{
            document.querySelector(".teach").scrollTo(0, 0)
        }
    }, [props.id])

    const changeTeachState = (value) => {
        setTeach(value)
        if (value === true){
            setFilterState(false)
        }
    }

    const changeFilterState = () => {
        if (is_filter === true){
            setFilterState(false)
        }else{
            setFilterState(true)
        }
    }

    return <div className="hardware">
        <div className="toggle_buttons">
            <div className={"item "+(is_teach===true?"active":"")}>
                <button className="change_mode" onClick={() => {changeTeachState(true)}}>
                    <img src={teach_icon} alt="edu"/>
                </button>
                <p>Обучение</p>
            </div>
            <div className={"item "+(is_teach===true?"":"active")}>
                <button className="change_mode" onClick={() => {changeTeachState(false)}}>
                    <img src={table_icon} alt="list"/>
                </button>
                <p>Список</p>
            </div>
            <div className={"item filter "+(is_teach===false?"active_filter":"")}>
                <button className="change_mode" onClick={changeFilterState}>
                    <img src={filter_icon} alt="filter"/>
                </button>
                <p>Фильтры</p>
            </div>
        </div>
        {is_teach===false?
            <Table table_data={props.table_data} id={props.id}/>:
            <Teach id={props.id}/>
        }
        {is_filter===true?
            <Filter changeFilterState={changeFilterState} applyFilter={props.applyFilters}/>:""
        }
    </div>
}
export default Hardware
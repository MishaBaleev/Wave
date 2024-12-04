import { useEffect, useState } from "react";
import "./Demonstration.scss";
import ParticlesBg from "particles-bg";
import Header from "./Header/Header";
import Settings from "./Settings/Settings";
import Hardware from "./Hardware/Hardware";
import Footer from "../Footer/Footer";

const Demonstration = (props) => {
    //state
    const [cur_cmp, setCurCMP] = useState(props.demo_cmp-1)
    const [table_data, setTableData] = useState([])

    //handlers
    const changeCMP = (index) => {
        if (index !== 0){ //exception settings
            const table_names = ["frame", "battery", "engine", "propeller", "additional"]
            let data = require(`../../data/${table_names[index-1]}.json`)
            setTableData(data)
        }
        setCurCMP(index)
    }

    const applyFilters = (filter) => {
        let index = cur_cmp
        const table_names = ["frame", "battery", "engine", "propeller", "additional"]
        let data = require(`../../data/${table_names[index-1]}.json`)
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
        setTableData(new_data)
    }

    useEffect(() => {
        document.querySelector(".particles-bg-canvas-self").classList.add("background")
        changeCMP(props.demo_cmp-1)
    }, [])

    //add-l state
    const cmps = [
        <Settings/>,
        <Hardware id={0} table_data={table_data} applyFilters={applyFilters}/>,
        <Hardware id={1} table_data={table_data} applyFilters={applyFilters}/>,
        <Hardware id={2} table_data={table_data} applyFilters={applyFilters}/>,
        <Hardware id={3} table_data={table_data} applyFilters={applyFilters}/>,
        <Hardware id={4} table_data={table_data} applyFilters={applyFilters}/>
    ]

    return <div className="demonstration">
        <ParticlesBg type="cobweb" bg={true} color="#B9CAEA"/>
        <Header changeBigCMP={props.changeCMP} cur_cmp={cur_cmp} setCurCMP={changeCMP}/>
        {cmps[cur_cmp]}
        <Footer/>
    </div>
}
export default Demonstration
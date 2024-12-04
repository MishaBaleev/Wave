import frame_json from "../../data/frame.json";
import battery_json from "../../data/battery.json";

const between = (x, min_max) => {
    return (Number(x) >= Number(min_max[0])) && (Number(x) <= Number(min_max[1]))
}

export class Manager{
    constructor(){
        this.settings = {type: "race", distance: "1.5", payload: 300, speed: 20, life_time: 10}
        this.recommendation = null
        this.battery_voltage = null
        this.max_cmp = 1 // what max number of cmp user can use
    }

    setMaxCmp(value){
        this.max_cmp = value
    }

    setSettings(value){
        this.settings = value
    }

    setFrame(item_index){
        frame_json.forEach(item => {
            if (item.id === item_index){this.recommendation = item.recommendation}
        })
        this.max_cmp = 2
    }
    removeFrame(){
        this.recommendation = null
        this.max_cmp = 1
    }
    setBattery(item_index){
        this.max_cmp = 3    
        battery_json.forEach(item => {
            if (item.id === item_index){this.battery_voltage = parseFloat(item.voltage)}
        })
    }
    removeBattery(){
        this.battery_voltage = null 
        this.max_cmp = 2
    }
    clear(){
        this.settings = {type: "race", distance: "1.5", payload: 300, speed: 20, life_time: 10}
        this.recommendation = null
        this.battery_voltage = null
        this.max_cmp = 1 // what max number of cmp user can use
    }

    filter(json_key, rec_key, step=0){
        let result = []
        let data = require(`../../data/${rec_key}.json`)
        let rec = this.recommendation[rec_key]
        if (rec_key === "additional"){
            data.forEach(item => {
                if (between(this.battery_voltage, item.voltage) === true){result.push(item)}
            })
        }else{
            switch (rec.length){
                case 2: 
                    data.forEach(item => {
                        if (between(item[json_key], rec) === true){result.push(item)}
                    })
                    break
                case 1:
                    data.forEach(item => {
                        if (between(item[json_key], [rec[0]-step, rec[0]+step]) === true){result.push(item)}
                    }) 
                    break
                case 0:
                    result = [...data]
                    break
            }
        }
        return result
    }
    
    getFilteredItems(type){
        switch (type){
            case "battery":
                return this.filter("voltage_s", "battery") 
            case "engine":
                return this.filter("kv_rating", "engine", 400) 
            case "propeller":
                return this.filter("length", "propeller", 5)
            case "additional":
                return this.filter("", "additional")
        }   
    }
    getFilteredFrames(){
        let result = []
        switch (this.settings.type){
            case "race": 
                frame_json.forEach(item => {
                    if (Number(item.sum_motors) === 4 && item.distanceMotors <= 600){
                        result.push(item)
                    }
                })
                break
            case "cargo": 
                frame_json.forEach(item => {
                    if ((Number(item.sum_motors) === 6 || Number(item.sum_motors) === 8) && item.distanceMotors >= 600 && item.material.toLowerCase().includes("карбон")){result.push(item)}
                })
                break 
            case "monitoring": 
                frame_json.forEach(item => {
                    if (Number(item.sum_motors) === 4 && item.distanceMotors >= 600){result.push(item)}
                })
                break
        }
        return result
    }
}
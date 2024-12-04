import "./CMPList.scss";

const Settings = (props) => {
    const type_arr = ["race", "cargo", "monitoring"]

    const changeParams = (key, value) => {
        if (key === "distance"){
            if (value.includes(".") === false){value += ".0"}
        }
        if (key === "type"){
            let cur_settings = {
                type: "race",
                distance: "2.0",
                payload: 1000,
                speed: 3,
                life_time: 20
            }
            switch (value){
                case "race":
                    cur_settings = {type: "race", distance: "1.5", payload: 300, speed: 20, life_time: 10}
                    break
                case "cargo":
                    cur_settings = {type: "cargo", distance: "80.0", payload: 50000, speed: 5, life_time: 300}
                    break
                case "monitoring":
                    cur_settings = {type: "monitoring", distance: "90.0", payload: 5000, speed: 10, life_time: 350}
                    break
            }
            props.setSettings(cur_settings)
        }else{
            let cur_settings = {...props.settings}
            cur_settings[key] = value 
            props.setSettings(cur_settings)
        }
    }
    const changeType = (e) => {
        changeParams("type", type_arr[e.target.value])
    }

    return <div className="component settings_cmp">
        <div className="title"><p>Входные параметры</p></div>
        <ul>
            <li>
                <p className="param_title">Тип БАС</p>
                <select onChange={changeType} value={type_arr.indexOf(props.settings.type)}>
                    <option value={0}>Гоночный</option>
                    <option value={1}>Грузовой</option>
                    <option value={2}>Мониторинговый</option>
                </select>
            </li>
            <li>
                <p className="param_title">Максимальное расстояние полета</p>
                <input type="number" className="number"
                    min={0.5}
                    max={100}
                    step={0.5}
                    value={props.settings.distance}
                    onChange={(e) => {changeParams("distance", e.target.value)}}
                />
                <input type="range" className="range"
                    min={0.5}
                    max={100}
                    step={0.5}
                    value={props.settings.distance}
                    onChange={(e) => {changeParams("distance", e.target.value)}}
                />
                <p className="units">(километры)</p>
            </li>
            <li>
                <p className="param_title">Максимальная грузоподъемность</p>
                <input type="number" className="number"
                    min={0}
                    max={100000}
                    step={1}
                    value={props.settings.payload}
                    onChange={(e) => {changeParams("payload", e.target.value)}}
                />
                <input type="range" className="range"
                    min={0}
                    max={100000}
                    step={1}
                    value={props.settings.payload}
                    onChange={(e) => {changeParams("payload", e.target.value)}}
                />
                <p className="units">(граммы)</p>
            </li>
            <li>
                <p className="param_title">Максимальная скорость полета</p>
                <input type="number" className="number"
                    min={1}
                    max={20}
                    step={1}
                    value={props.settings.speed}
                    onChange={(e) => {changeParams("speed", e.target.value)}}
                />
                <input type="range" className="range"
                    min={1}
                    max={20}
                    step={1}
                    value={props.settings.speed}
                    onChange={(e) => {changeParams("speed", e.target.value)}}
                />
                <p className="units">(метры в секунду)</p>
            </li>
            <li>
                <p className="param_title">Время работы от аккумулятора</p>
                <input type="number" className="number"
                    min={10}
                    max={360}
                    step={1}
                    value={props.settings.life_time}
                    onChange={(e) => {changeParams("life_time", e.target.value)}}
                />
                <input type="range" className="range"
                    min={10}
                    max={360}
                    step={1}
                    value={props.settings.life_time}
                    onChange={(e) => {changeParams("life_time", e.target.value)}}
                />
                <p className="units">(минуты)</p>
            </li>
        </ul>
    </div>
}
export default Settings
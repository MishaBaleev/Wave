import apsw
import ujson as json

keys = [
    ["name", "material", "flight", "distanceMotors", "sum_motors", "weight", "price", "link"],
    ["name", "capacity", "voltage", "voltage_s", "power", "weight", "discharge_current", "peak_discharge_current", "form_factor", "length", "width", "height", "connectors", "wire_thickness", "balance_connector", "price", "link", "wire_length"],
    ["name", "manufacturer", "peak_power", "recommended_battery", "kv_rating", "shaft_diameter", "idle_current", "peak_current", "motor_diameter", "motor_length", "price", "link", "weight", "thrust", "voltage", "propeller", "step"],
    ["name", "price", "material", "length", "pitch", "hole_diameter", "weight", "max_thrust", "link"]
]

def getData(file_name:str, table_name:str, keys:list) -> list:
    connection = apsw.Connection(file_name)
    cursor = connection.cursor()
    cursor.execute(f"SELECT * FROM {table_name}")
    frames = cursor.fetchall()
    connection.close()
    result_arr = []
    for f_index, f_value in enumerate(frames):
        result_arr.append({})
        for i in range(1, len(f_value)):
            result_arr[f_index][keys[i-1]] = f_value[i]
    return result_arr

if __name__ == "__main__":
    # data = getData("database.db", "propeller", keys[3])
    # for item in data:
    #     item["weight"] = float(item["weight"])/1000 #граммы в килограммы
    #     item["name"] = item["name"][0].upper()+item["name"][1:].lower() #первая буква - верхний регистр, далее - нижний
    #     item["material"] = item["material"][0].upper()+item["material"][1:].lower() #первая буква - верхний регистр, далее - нижний
    #     # item["wire_thickness"] = item["wire_thickness"] if (item["wire_thickness"] != "nan") else "-"
    #     pass


    with open("frame.json", "r") as f:
        data = json.loads(f.read())
        for d in data:
            d["weight"] = round(d["weight"], 3)
        
    for item in data: print(item, "\n-------")
    with open("frame.json", "w") as file:
        file.write(json.dumps(data, indent=2, ensure_ascii=False))
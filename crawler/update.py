import ujson as json 

if  __name__ == "__main__":
    file_name = "additional"
    norm_data = []
    with open(f"./data/{file_name}.json", "r") as file: 
        norm_data = json.loads(file.read())
        for index, n in enumerate(norm_data):
            n["id"] = index

    with open(f"./data/{file_name}.json", "w") as file: file.write(json.dumps(norm_data, indent=2, ensure_ascii=False))
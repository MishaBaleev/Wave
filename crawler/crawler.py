import requests 
from bs4 import BeautifulSoup as bs
import ujson as json

def getPage(url:str) -> requests:
    return requests.get(url)

def getData(table_name:str) -> dict:
    with open(f"./data/{table_name}.json", "r") as file: return json.loads(file.read())

def appendData(table_name:str, recommendation:dict, index:int) -> None:
    data = getData(table_name)
    data[index]["recommendation"] = recommendation
    with open(f"./data/{table_name}.json", "w") as file: file.write(json.dumps(data, indent=2, ensure_ascii=False))

if __name__ == "__main__":
    data = getData("frame")
    counter = 0
    for d in data:
        page = getPage(d["link"]).text
        if "Рекомендуемая конфигурация" in page: counter += 1
    print(f"{counter}/{len(data)}")
    # for index, d in enumerate(data):
    #     recommendation = {}
    #     try:
    #         page = getPage(d["link"])
    #         soup = bs(page.text, "html.parser")
    #         div = soup.findAll("div", class_="product-description editor")
    #         list = [item.text for item in div[0].findAll("ul")[1].findAll("li")] 
    #         recommendation = {
    #             "propeller": [list[0].split(": ")[1].split("-")[0], list[0].split(": ")[1].split("-")[1][:-1]],
    #             "engine": [list[1].split(": ")[1].split("-")[0], list[1].split(": ")[1].split("-")[1][:-2]],
    #             "esc": [list[2].split(": ")[1].split("-")[0], list[2].split(": ")[1].split("-")[1][:-1]],
    #             "batery":[list[3].split(" ")[1].split("-")[0], list[3].split(" ")[1].split("-")[1][:-1]]
    #         }
    #     except ValueError as err: print(err) 
    #     appendData("frame", recommendation, index)


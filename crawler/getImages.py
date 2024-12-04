import requests
import ujson as json
from bs4 import BeautifulSoup as bs 
import base64

if __name__ == "__main__":
    file_name = "propeller"
    with open(f"./data/{file_name}.json", "r") as file: 
        data = json.loads(file.read())
    
    new_data = []
    for d in data:
        if "rccopter" in d["link"]: new_data.append(d)

    for d in new_data:
        print(d["link"])
        page = requests.get(d["link"])
        soup = bs(page.text, "html.parser")
        image_href = soup.find_all("a", class_="MagicZoom")[0]["href"]
        with open(f"./img/cmp_cards/{d["name"].replace("/", "_")}.png", "wb") as img: img.write(requests.get(image_href).content)
    
    
    # with open(f"./data/{file_name}.json", "w") as file: file.write(json.dumps(new_data, indent=2, ensure_ascii=False))
    
    
    # image = requests.get(image_href).content
    # with open("test.json", "w") as file:
    #     file.write(json.dumps({"file": str(base64.b64decode(image))}))
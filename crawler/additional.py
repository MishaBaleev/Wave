import requests 
from bs4 import BeautifulSoup as bs
import ujson as json

def getPage(url:str) -> requests:
    return requests.get(url)

if __name__ == "__main__":
    url_list = [
        "https://rccopter.ru/product/kursovaya-kamera-foxeer-arrow-mini-pro-hs1207-600tvl-25mm-lens-fpv-camera-pal",
        "https://rccopter.ru/product/kursovaya-kamera-caddxus-58g-25mw-48ch-fpv-vtx-camera-2-in-1-pal-s-peredatchikom",
        "https://rccopter.ru/product/kursovaya-kamera-700-line-ccd-sony-ntsc",
        "https://rccopter.ru/product/kursovaya-mini-kamera-520-line-pal",
        "https://rccopter.ru/product/kursovaya-kamera-eachine-c800t-800tvl-25mm-150deg",
        "https://rccopter.ru/product/kursovaya-kamera-foxeer-hs1177ccd-600-line-pal",
        "https://rccopter.ru/product/kursovaya-kamera-foxeer-hs1177ccd-sony-600-line-ntsc",
        "https://rccopter.ru/product/kursovaya-kamera-700-line-aomway-wdr-cmos-pal",
        "https://rccopter.ru/product/kursovaya-mini-kamera-520-line-ntsc",
        "https://rccopter.ru/product/kursovaya-kamera-700-line-ccd-sony",
        "https://rccopter.ru/product/kursovaya-tsifrovaya-kamera-cm210-pal",
        "https://rccopter.ru/product/kamera-kursovaya-fpv-hd19",
        "https://rccopter.ru/product/kursovaya-kamera-foxeer-t-rex-mini-1500tvl-6ms-low-latency-super-wdr-fpv-camera-black-hs1253",
        "https://rccopter.ru/product/kamera-s-peredatchikom-eachine-tx03-58g-72ch-600tvl-ntsc-02550200mw-super-mini",
        "https://rccopter.ru/product/kursovaya-kamera-foxeer-micro-predator-5-racing-fpv-camera-m8-lens-4ms-latency-super-wdr-flip-black-full-case-hs1249",
        "https://rccopter.ru/product/fpv-kamera-caddx-ratel-2",
        "https://rccopter.ru/product/kursovaya-kamera-foxeer-predator-5-nano-five33-edition-hv-flip-ntsc-hs1250five33"
    ]
    
    json_arr = []
    for url in url_list:
        print(url)
        page = getPage(url).text
        soup = bs(page, "html.parser")
        name = soup.find_all("h1", class_="product-title content-title")[0].text
        price = soup.find_all("div", class_="prices-current js-prices-current")
        price = int(price[0].text.replace("\n", "").replace(" ", "")[:-3])
        weight = 0
        try:
            weight = soup.find_all("td", class_="property-values lg-grid-9 xs-grid-8 mc-grid-12 padded-left padded-bottom mc-padded-zero-left")
            weight = float(weight[0].text.replace("\n", "").replace(" ", "")[:-1])
        except: 
            weight = 0
        json_arr.append({
            "name": name,
            "price": price,
            "link": url,
            "characteristics": {
                "voltage": [],
                "weight": weight/1000,
            }
        })

    with open("./data/cameras.json", "w") as file: file.write(json.dumps(json_arr, indent=2, ensure_ascii=False))
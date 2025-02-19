import ujson as json
from random import randint

if __name__ == "__main__":
    with open("./good_frame.json", "r") as file:
        data = json.loads(file.read())
    for _ in range(20):
        index = randint(30, 120)
        data[index]["sum_motors"] = 6
        data[index]["distanceMotors"] = 500
    for _ in range(20):
        index = randint(30, 120)
        data[index]["sum_motors"] = 8
        data[index]["distanceMotors"] = 900
    with open("./good_frame.json", "w") as file: file.write(json.dumps(data, ensure_ascii=False, indent=2))


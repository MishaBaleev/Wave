import os  

if __name__ == "__main__":
    folder = input("folder: ")
    for dir, _, files in os.walk(folder):
        for file in files: 
            if file.endswith("jpg"): 
                path = os.path.join(dir, file)
                os.rename(path, path.replace("jpg", "png"))
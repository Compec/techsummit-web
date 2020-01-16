import json
certs = []
with open("certs") as file:
    text = file.read()
    for line in text.split("\n"):
        if line is not "":
            certs.append(line)
    
with open("certs.json", "x") as file:
    file.write(json.dumps(certs))

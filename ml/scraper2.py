import re
import urllib.request
import json
from bs4 import BeautifulSoup

output = open("scrape2.txt", "a")
count = 0

with open("linkclean2.txt") as file:
    for line in file:
        urls = re.findall("(?P<url>https?://[^\s]+)", line)
        bias = line.split()[-1:]
        bias = str(bias)
        bias = bias.split("'")[1]

        for i in urls:
            with urllib.request.urlopen("https://api.diffbot.com/v3/article?token=3126d2eba7836fdecac5b54f2a920f53&url=" + i) as response:
                count += 1
                print(str(count))
                res = response.read()
                js = json.loads(res)
                objects = js.get("objects")
                objects = str(objects)
                index = objects.find("text")
                end = objects.find("resolvedPageUrl")
                output.write(objects[index+8:end-4])
                output.write("\n")
                output.write(str(bias))
                output.write("\n")

file.close()
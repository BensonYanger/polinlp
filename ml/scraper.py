import urllib.request
import json
from bs4 import BeautifulSoup

with open("linkclean.txt") as file:
    for line in file:
        urls = re.findall("(?P<url>https?://[^\s]+)", line)
        bias = line.split()[-1:]

        for i in urls:
                f.write(i)
                f.write(" ")
                f.write(str(sum))
                f.write('\n')

    

json = get.read()
text = json.loads()

print(html)

file.close()
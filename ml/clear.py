rfile = open("scrape.txt", "r", encoding="utf8")
irfile = iter(rfile)
wfile = open("clean.txt", "a")

try:
    for line in irfile:
        words = line.split(" ")
        if line == "\n":
            line = next(irfile)
            line = next(irfile)
except(StopIteration):
    ok = 0


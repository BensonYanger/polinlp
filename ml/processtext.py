import re



f = open("linkclean.txt", "w")

with open("links.txt") as file:
        for line in file:
            urls = re.findall("(?P<url>https?://[^\s]+)", line)
            bias = line.split()[-2:]
            sum = 0

            if bias[0] == "VeryNegative":
                sum = sum + 1
            if bias[0] == "SomewhatNegative":
                sum = sum + 0.75
            if bias[0] == "Neutral":
                sum = sum + 0.5
            if bias[0] == "SomewhatPositive":
                sum = sum + 0.25
            if bias[0] == "VeryPositive":
                sum = sum + 0
            
            if bias[1] == "VeryNegative":
                sum = sum + 0
            if bias[1] == "SomewhatNegative":
                sum = sum + 0.25
            if bias[1] == "Neutral":
                sum = sum + 0.5
            if bias[1] == "SomewhatPositive":
                sum = sum + 0.75
            if bias[1] == "VeryPositive":
                sum = sum + 1

            sum /= 2
            

            for i in urls:
                f.write(i)
                f.write(" ")
                f.write(str(sum))
                f.write('\n')

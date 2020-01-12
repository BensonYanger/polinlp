import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.preprocessing.text import Tokenizer
import numpy as np
import matplotlib.pyplot as plt
import math

data = []
label = []

word_index = {}

rfile = open("temp.txt", "r", encoding="utf8")
irfile = iter(rfile)

try:
    for line in irfile:
        words = line.split(" ")
        for word in words:
            if word not in wordss
        data.append(words)
        line = next(irfile)
        label.append(float(line.split("\n")[0]))
except(StopIteration):
    ok = 0

i = 2

for row in data:
    for word in row:
        if word not in word_index:
            word_index.update({word, i})
            i += 1
        
print(word_index)

#print(data)
#print(label)


import tensorflow as tf
from tensorflow import keras
import numpy as np

data = keras.datasets.imdb

word_index = data.get_word_index()
word_index = {k: (v+2) for k, v in word_index.items()}

word_index["<PAD>"] = 0
word_index["<START>"] = 1
word_index["<???>"] = 2

def encode(text):
    encoded = [1]

    for word in text:
        if word.lower() in word_index:
            encoded.append(word_index[word.lower()])
        else:
            encoded.append(2)
        
    return encoded

model = keras.models.load_model("model.h5")

with open("test.txt", encoding="utf-8") as f:
    for line in f.readlines():
        nline = line.replace(",", "").replace(".", "").replace("()", "").replace(")", "").replace(":", "").replace("\n", " ").strip()
        encoded = encode(nline)
        encoded = keras.preprocessing.sequence.pad_sequences(
            [encoded], value=word_index["<PAD>"], padding="post", maxlen=500)
        predict = model.predict(encoded)
        print(line)
        print(encoded)
        print(predict[0])

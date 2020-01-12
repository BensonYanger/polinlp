import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.preprocessing.text import Tokenizer
import numpy as np
import matplotlib.pyplot as plt
import math

data = []
label = []

token_index = {}

def encode(text):
    encoded = [1]

    for word in text:
        if word.lower() in token_index:
            encoded.append(token_index[word.lower()])
        else:
            encoded.append(2)
        
    return encoded

def decode(text):
    return " ".join([reverse_word_index.get(i, "?") for i in text])

rfile = open("scrape.txt", "r", encoding="utf8")
irfile = iter(rfile)

try:
    for line in irfile:
        words = line.split(" ")
        for word in words:
            if word not in token_index:
                token_index[word] = len(token_index) + 1
        data.append(encode(line))
        #data.append(words)
        line = next(irfile)
        label.append(float(line.split("\n")[0]))
except(StopIteration):
    ok = 0

reverse_token_index = dict([(value, key) for (key, value) in token_index.items()])

data = keras.preprocessing.sequence.pad_sequences(
    data, value="00", dtype=object, padding="post", maxlen=1500)

count = len(data)
count = math.ceil(count / 2)

test_data = data[:count]
test_labels = label[:count]

data = data[count:]
label = label[count:]

count = math.ceil(count / 2)

x_val = data[:count]
x_train = data[count:]

y_val = label[:count]
y_train = label[count:]
#y_train.append(0.5)

print(y_train)

print(token_index)

test_data = np.asarray(test_data, dtype=np.float32)
test_labels = np.asarray(test_labels, dtype=np.float32)

x_val = np.asarray(x_val, dtype=np.float32)
x_train = np.asarray(x_train, dtype=np.float32)
y_val = np.asarray(y_val, dtype=np.float32)
y_train = np.asarray(y_train, dtype=np.float32)

print(x_val)

# model
model = keras.Sequential()
model.add(keras.layers.Embedding(110000, 32))
model.add(keras.layers.GlobalAveragePooling1D())
#model.add(keras.layers.LSTM(64, return_sequences=True))
model.add(keras.layers.Dense(32, activation="relu"))
model.add(keras.layers.Dense(1, activation="sigmoid"))

model.summary()

model.compile(optimizer="adam", loss="binary_crossentropy", metrics=["accuracy"])

fitModel = model.fit(x_train, y_train, epochs=30, batch_size=32, validation_data=(x_val, y_val), verbose=1)

results = model.evaluate(test_data, test_labels, verbose=1)

print(results)

model.save("newmodel.h5")

history_dict = fitModel.history
history_dict.keys()

acc = history_dict['accuracy']
val_acc = history_dict['val_accuracy']
loss = history_dict['loss']
val_loss = history_dict['val_loss']

epochs = range(1, len(acc) + 1)

# "bo" is for "blue dot"
plt.figure(0)
plt.plot(epochs, loss, 'bo', label='Training loss')
# b is for "solid blue line"
plt.figure(0)
plt.plot(epochs, val_loss, 'b', label='Validation loss')
plt.title('Training and validation loss')
plt.xlabel('Epochs')
plt.ylabel('Loss')
plt.legend()

plt.figure(1)
plt.plot(epochs, acc, 'bo', label='Training acc')
plt.figure(1)
plt.plot(epochs, val_acc, 'b', label='Validation acc')
plt.title('Training and validation accuracy')
plt.xlabel('Epochs')
plt.ylabel('Accuracy')
plt.legend(loc='lower right')

plt.show()
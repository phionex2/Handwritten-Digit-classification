# Flask backend (server.py)
from flask import Flask, jsonify
import tensorflow as tf
from tensorflow.keras import Sequential
from tensorflow.keras.layers import Dense, Flatten
import numpy as np

app = Flask(__name__)

# Load MNIST dataset
(X_train, y_train), (X_test, y_test) = tf.keras.datasets.mnist.load_data()
X_train, X_test = X_train / 255.0, X_test / 255.0

# Build model
model = Sequential([
    Flatten(input_shape=(28, 28)),
    Dense(128, activation='relu'),
    Dense(10, activation='softmax')  # Change output to 10 classes for digits 0-9
])

model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

# Train model and save history
history = model.fit(X_train, y_train, epochs=10, validation_split=0.2)

# Route to get accuracy data
@app.route('/accuracy')
def get_accuracy_data():
    # Send accuracy and validation accuracy data to frontend
    accuracy_data = {
        "accuracy": history.history['accuracy'],
        "val_accuracy": history.history['val_accuracy']
    }
    return jsonify(accuracy_data)

if __name__ == '__main__':
    app.run(debug=True)

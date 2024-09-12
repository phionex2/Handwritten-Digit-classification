# 🖋️ **Handwritten Digit Classification**


This project focuses on building a neural network model to classify handwritten digits from the famous **MNIST dataset**. Using **Keras** and **TensorFlow**, we train a model to recognize and predict digits (0-9) based on their pixel values, achieving impressive accuracy.


---

## 📊 **Dataset**


We utilize the **MNIST dataset**, which consists of 60,000 training images and 10,000 test images of handwritten digits. Each image is a **28x28 grayscale** image, where each pixel value ranges from 0 to 255.


### 📝 **Dataset Upload**


You can load the MNIST dataset directly from **Keras** using the following code:


python
from keras.datasets import mnist
(train_images, train_labels), (test_images, test_labels) = mnist.load_data()


## 🧠 **Model Architecture**

Our model ensures the input is transformed into a **1D (784 pixels)** format, as the MNIST images are originally in **28x28 pixels (2D)**. To effectively process this, the pixel array is flattened into a **1D** vector before being passed through the neural network.

### 🔑 **Key Design Considerations**:
- **Input Layer**: Flatten the **28x28** pixel images into a **784-pixel** vector.
- **Hidden Layers**: Composed of multiple dense layers with activation functions like ReLU to extract crucial features.
- **Output Layer**: Utilizes softmax activation to predict the digit class (0-9) based on the highest probability.

---

## 📈 **Performance**

After training the model, here are the results:

- **Accuracy**: The model achieves high accuracy across both training and test datasets.
  
  ![Accuracy](Screenshot%202024-01-09%20203000.png)
  
- **Loss**: The model's loss decreases significantly during training, ensuring effective learning.
  
  ![Loss](Screenshot%202024-01-09%20203030.png)

---

## 🚀 **How to Run**

Follow these steps to set up and run the **Handwritten Digit Classification** project:

1. **Clone the repository**:
   bash
   git clone https://github.com/your-username/Handwritten-Digit-classification.git


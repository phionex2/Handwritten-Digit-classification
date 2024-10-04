// Get the canvas and buttons
const canvas = document.getElementById('digitCanvas');
const ctx = canvas.getContext('2d');
const clearBtn = document.getElementById('clearBtn');
const predictBtn = document.getElementById('predictBtn');
const digitOutput = document.getElementById('digitOutput');

// Set canvas drawing properties
let isDrawing = false;

// Mouse events for drawing on the canvas
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

function startDrawing(e) {
    isDrawing = true;
    ctx.lineWidth = 15;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';
    draw(e); // Start drawing
}

function draw(e) {
    if (!isDrawing) return;

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

function stopDrawing() {
    isDrawing = false;
    ctx.beginPath(); // Reset the drawing path
}

// Clear the canvas
clearBtn.addEventListener('click', function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    digitOutput.textContent = '';
});

// Function to send canvas data to the server for prediction
predictBtn.addEventListener('click', function() {
    // Convert canvas to grayscale image data (28x28 pixels)
    const imageData = canvas.toDataURL();

    // Simulate sending data to the backend
    // For this example, let's assume the backend returns a prediction
    // Replace this with an actual AJAX request in a real project

    // Example simulated prediction (random digit 0-9)
    const predictedDigit = Math.floor(Math.random() * 10);

    // Show the result
    digitOutput.textContent = predictedDigit;
});

// Function to convert canvas data to a 28x28 pixel format (for the backend)
function getCanvasImageData() {
    const scaledCanvas = document.createElement('canvas');
    scaledCanvas.width = 28;
    scaledCanvas.height = 28;
    const scaledCtx = scaledCanvas.getContext('2d');
    scaledCtx.drawImage(canvas, 0, 0, 28, 28);
    return scaledCanvas.toDataURL();
}

// Fetch the accuracy data from the backend
fetch('/accuracy')
    .then(response => response.json())
    .then(data => {
        const accuracy = data.accuracy;
        const valAccuracy = data.val_accuracy;
        plotAccuracyChart(accuracy, valAccuracy);
    })
    .catch(error => console.error('Error fetching accuracy data:', error));

// Function to plot the accuracy chart using Chart.js
function plotAccuracyChart(accuracy, valAccuracy) {
    const ctx = document.getElementById('accuracyChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: accuracy.length }, (v, k) => k + 1), // epochs as labels
            datasets: [
                {
                    label: 'Training Accuracy',
                    data: accuracy,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    fill: false,
                    tension: 0.1
                },
                {
                    label: 'Validation Accuracy',
                    data: valAccuracy,
                    borderColor: 'rgba(153, 102, 255, 1)',
                    fill: false,
                    tension: 0.1
                }
            ]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Epoch'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Accuracy'
                    },
                    beginAtZero: true
                }
            }
        }
    });
}

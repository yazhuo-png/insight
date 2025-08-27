// chart-helper.js
function drawSparkline(canvasId, data, lineColor, fillColor) {
    const canvas = document.getElementById(canvasId);
    if (!canvas || !canvas.getContext) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width, height = canvas.height, padding = 4;
    ctx.clearRect(0, 0, width, height);
    if (data.length < 2) return;
    const max = Math.max(...data), min = Math.min(...data);
    const range = max - min === 0 ? 1 : max - min;
    const getX = (i) => (i / (data.length - 1)) * (width - padding * 2) + padding;
    const getY = (value) => height - padding - ((value - min) / range) * (height - padding * 2);

    // Draw filled area
    ctx.beginPath();
    ctx.moveTo(getX(0), height);
    for (let i = 0; i < data.length; i++) {
        ctx.lineTo(getX(i), getY(data[i]));
    }
    ctx.lineTo(getX(data.length - 1), height);
    ctx.closePath();
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, fillColor);
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw line
    ctx.beginPath();
    ctx.moveTo(getX(0), getY(data[0]));
    for (let i = 1; i < data.length; i++) {
        ctx.lineTo(getX(i), getY(data[i]));
    }
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 1.5;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.stroke();
}

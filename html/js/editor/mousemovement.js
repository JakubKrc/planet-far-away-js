let mousePos = 0;

function getMousePos(canvasf, evt) {
    let rect = canvasf.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvasf.width,
        y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvasf.height
    };
}
// Canvas coordinates calculation
let boardLeft = canvasBoard.getBoundingClientRect().left;
let boardTop = canvasBoard.getBoundingClientRect().top;
let iX, iY, fX, fY;
let drawingMode = false;
let isDrawing = false;

// Handle window resize for correct coordinates
window.addEventListener('resize', function() {
    boardLeft = canvasBoard.getBoundingClientRect().left;
    boardTop = canvasBoard.getBoundingClientRect().top;
});

// Mouse down event (start drawing)
body.addEventListener("mousedown", function (e) {
    if (e.button !== 0) return; // Only respond to left mouse button
    
    // Get starting coordinates
    iX = e.clientX - boardLeft;
    iY = e.clientY - boardTop;
    
    // Handle different tools
    if (cTool == "pencil" || cTool == "eraser") {
        isDrawing = true;
        drawingMode = true;
        
        // Start a new path
        tool.beginPath();
        tool.moveTo(iX, iY);
    } else {
        isDrawing = true;
    }
});

// Mouse up event (end drawing)
body.addEventListener("mouseup", function (e) {
    if (!isDrawing) return;
    
    if (cTool == "pencil" || cTool == "eraser") {
        drawingMode = false;
    } else if (cTool == "rect" || cTool == "line") {
        // Get final coordinates
        fX = e.clientX - boardLeft;
        fY = e.clientY - boardTop;
        
        // Calculate dimensions
        let width = fX - iX;
        let height = fY - iY;
        
        // Draw shape based on selected tool
        if (cTool == "rect") {
            tool.beginPath();
            tool.strokeRect(iX, iY, width, height);
        } else if (cTool == "line") {
            tool.beginPath();
            tool.moveTo(iX, iY);
            tool.lineTo(fX, fY);
            tool.stroke();
        }
    }
    
    // Save the canvas state for undo functionality
    if (isDrawing) {
        saveCanvasState();
        isDrawing = false;
    }
});

// Mouse move event (draw while moving)
// Mouse move event (draw while moving)
body.addEventListener("mousemove", function (e) {
    if (drawingMode == false) return;
    
    // Get current position
    fX = e.clientX - boardLeft;
    fY = e.clientY - boardTop;
    
    // Draw line from previous position to current position
    tool.lineTo(fX, fY);
    tool.stroke();
    
    // Update for next move
    iX = fX;
    iY = fY;
});

// Handle touch events for mobile support
canvasBoard.addEventListener("touchstart", function(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent("mousedown", {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    body.dispatchEvent(mouseEvent);
});

canvasBoard.addEventListener("touchend", function(e) {
    e.preventDefault();
    const mouseEvent = new MouseEvent("mouseup", {});
    body.dispatchEvent(mouseEvent);
});

canvasBoard.addEventListener("touchmove", function(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent("mousemove", {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    body.dispatchEvent(mouseEvent);
});

// Handle canvas leave
canvasBoard.addEventListener("mouseleave", function() {
    if (drawingMode) {
        drawingMode = false;
        if (isDrawing) {
            saveCanvasState();
            isDrawing = false;
        }
    }
});
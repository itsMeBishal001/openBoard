// Undo button functionality
let undoBtn = document.querySelector("#undo");
let clearBtn = document.querySelector("#clear");
let saveBtn = document.querySelector("#save");

// Undo last action
undoBtn.addEventListener("click", function() {
    if (undoStack.length <= 1) {
        // If only initial state is left, clear canvas
        tool.clearRect(0, 0, canvasBoard.width, canvasBoard.height);
        return;
    }
    
    // Save current state to redo stack
    redoStack.push(undoStack.pop());
    
    // Get previous state
    let prevState = undoStack[undoStack.length - 1];
    
    // Load previous state
    const img = new Image();
    img.src = prevState;
    img.onload = function() {
        tool.clearRect(0, 0, canvasBoard.width, canvasBoard.height);
        tool.drawImage(img, 0, 0);
    };
});

// Clear canvas
clearBtn.addEventListener("click", function() {
    // Confirm clear
    if (confirm("Are you sure you want to clear the canvas?")) {
        // Save current state before clearing
        saveCanvasState();
        
        // Clear canvas
        tool.clearRect(0, 0, canvasBoard.width, canvasBoard.height);
        
        // Save cleared state
        saveCanvasState();
    }
});

// Save canvas as image
saveBtn.addEventListener("click", function() {
    // Create a temporary link element
    const link = document.createElement('a');
    
    // Set download attributes
    link.download = 'drawing-' + new Date().toISOString().slice(0, 10) + '.png';
    link.href = canvasBoard.toDataURL("image/png");
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// Reset canvas state when window is resized
window.addEventListener('resize', function() {
    boardLeft = canvasBoard.getBoundingClientRect().left;
    boardTop = canvasBoard.getBoundingClientRect().top;
});
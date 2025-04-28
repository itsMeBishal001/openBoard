let cTool = "pencil";
let canvasBoard = document.querySelector("#drawing-board");
let tool = canvasBoard.getContext("2d");
let body = document.querySelector("body");
let statusIndicator = document.querySelector(".status-indicator");
let currentColor = "#ff7675"; // Default color
let undoStack = [];
let redoStack = [];

// Set canvas dimensions and adjust on resize
function setCanvasDimensions() {
    canvasBoard.height = window.innerHeight;
    canvasBoard.width = window.innerWidth;
    
    // Restore canvas state after resize
    if (undoStack.length > 0) {
        const lastState = undoStack[undoStack.length - 1];
        const img = new Image();
        img.src = lastState;
        img.onload = function() {
            tool.drawImage(img, 0, 0);
        };
    }
}

// Initial setup
setCanvasDimensions();
window.addEventListener('resize', setCanvasDimensions);

// Initialize tool properties
tool.strokeStyle = currentColor;
tool.lineJoin = "round";
tool.lineCap = "round";

// Dark mode toggle
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('#theme-icon');

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        themeIcon.innerHTML = '<path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41.39.39 1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41.39.39 1.03.39 1.41 0l1.06-1.06z"/>';
    } else {
        themeIcon.innerHTML = '<path d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zm-2 5.79V18h-3.52L12 20.48 9.52 18H6v-3.52L3.52 12 6 9.52V6h3.52L12 3.52 14.48 6H18v3.52L20.48 12 18 14.48z"/>';
    }
});

// Save current canvas state to undo stack
function saveCanvasState() {
    // Clear redo stack when a new action is performed
    redoStack = [];
    
    // Save current state to undo stack
    undoStack.push(canvasBoard.toDataURL());
    
    // Limit stack size to prevent memory issues
    if (undoStack.length > 20) {
        undoStack.shift();
    }
}

// Initial state
saveCanvasState();

// Update status indicator
function updateStatus() {
    let toolName = cTool.charAt(0).toUpperCase() + cTool.slice(1);
    let sizeMap = {
        5: "Small",
        10: "Medium",
        15: "Large",
        20: "X-Large"
    };
    
    let sizeValue;
    switch(cTool) {
        case "pencil": sizeValue = pencilSize; break;
        case "eraser": sizeValue = eraserSize; break;
        case "rect": sizeValue = rectSize; break;
        case "line": sizeValue = lineSize; break;
        default: sizeValue = pencilSize;
    }
    
    let sizeText = sizeMap[sizeValue] || sizeValue + "px";
    let colorText = cTool === "eraser" ? "White" : tool.strokeStyle;
    
    statusIndicator.textContent = `Tool: ${toolName} | Size: ${sizeText} | Color: ${colorText}`;
}

// Keyboard shortcuts
window.addEventListener("keydown", function(e) {
    // Check if not typing in textarea
    if (document.activeElement.tagName !== "TEXTAREA") {
        switch(e.key.toLowerCase()) {
            case "p": document.querySelector("#pencil").click(); break;
            case "e": document.querySelector("#eraser").click(); break;
            case "r": document.querySelector("#rect").click(); break;
            case "l": document.querySelector("#line").click(); break;
            case "s": 
                if (e.ctrlKey) {
                    e.preventDefault();
                    document.querySelector("#save").click();
                } else {
                    document.querySelector("#sticky").click();
                }
                break;
            case "z": 
                if (e.ctrlKey) {
                    e.preventDefault();
                    document.querySelector("#undo").click();
                }
                break;
        }
    }
});

// Initial status update
updateStatus();
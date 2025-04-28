// Tool selection variables
let pencil = document.querySelector("#pencil");
let eraser = document.querySelector("#eraser");
let rect = document.querySelector("#rect");
let line = document.querySelector("#line");
let options = document.querySelectorAll(".size-box");
let tools = document.querySelectorAll(".tool");

// Tool sizes
let pencilSize = 5;
let eraserSize = 5;
let rectSize = 5;
let lineSize = 5;

// Activate a tool and update UI
function activateTool(selectedTool) {
    // Remove active class from all tools
    tools.forEach(tool => tool.classList.remove('active'));
    
    // Add active class to selected tool
    selectedTool.classList.add('active');
    
    // Hide all option boxes
    for (let i = 0; i < options.length; i++) {
        options[i].style.display = "none";
    }
    
    // Update current tool
    cTool = selectedTool.id;
    
    // Set appropriate tool properties
    switch(cTool) {
        case "pencil":
            tool.strokeStyle = currentColor;
            tool.lineWidth = pencilSize;
            break;
        case "eraser":
            tool.strokeStyle = body.classList.contains('dark-mode') ? "#2d3436" : "white";
            tool.lineWidth = eraserSize;
            break;
        case "rect":
            tool.strokeStyle = currentColor;
            tool.lineWidth = rectSize;
            break;
        case "line":
            tool.strokeStyle = currentColor;
            tool.lineWidth = lineSize;
            break;
    }
    
    // Update status display
    updateStatus();
}

// Tool click handlers
pencil.addEventListener("click", function (e) {
    if (cTool == "pencil") {
        // Toggle size options on second click
        options[0].style.display = options[0].style.display === "flex" ? "none" : "flex";
    } else {
        activateTool(pencil);
    }
});

eraser.addEventListener("click", function (e) {
    if (cTool == "eraser") {
        options[1].style.display = options[1].style.display === "flex" ? "none" : "flex";
    } else {
        activateTool(eraser);
    }
});

rect.addEventListener("click", function (e) {
    if (cTool == "rect") {
        options[2].style.display = options[2].style.display === "flex" ? "none" : "flex";
    } else {
        activateTool(rect);
    }
});

line.addEventListener("click", function (e) {
    if (cTool == "line") {
        options[3].style.display = options[3].style.display === "flex" ? "none" : "flex";
    } else {
        activateTool(line);
    }
});

// Color selection
let colorElements = document.querySelectorAll(".color");
let customColorPicker = document.querySelector("#custom-color");

// Update all colors when one is clicked
colorElements.forEach(colorEl => {
    colorEl.addEventListener("click", function() {
        // Remove active class from all colors
        colorElements.forEach(el => el.classList.remove('active'));
        
        // Add active class to current color
        colorEl.classList.add('active');
        
        // Get computed background color
        currentColor = window.getComputedStyle(colorEl).backgroundColor;
        
        // Update tool color if not eraser
        if (cTool !== "eraser") {
            tool.strokeStyle = currentColor;
        }
        
        // Update status
        updateStatus();
    });
});

// Custom color picker
customColorPicker.addEventListener("input", function() {
    // Remove active class from preset colors
    colorElements.forEach(el => el.classList.remove('active'));
    
    // Set current color
    currentColor = this.value;
    
    // Update tool color if not eraser
    if (cTool !== "eraser") {
        tool.strokeStyle = currentColor;
    }
    
    // Update status
    updateStatus();
});

// Size selection
let sizeBoxes = document.querySelectorAll(".size-box");

// Handle size selection for each tool
sizeBoxes.forEach((sizeBox, index) => {
    let sizes = sizeBox.querySelectorAll(".size");
    
    sizes.forEach((size, sizeIndex) => {
        size.addEventListener("click", function() {
            // Remove active class from all sizes
            sizes.forEach(s => s.classList.remove('active'));
            
            // Add active class to selected size
            size.classList.add('active');
            
            // Set size based on class and tool
            let sizeValue = 5 + (sizeIndex * 5);
            
            switch(index) {
                case 0: // Pencil
                    pencilSize = sizeValue;
                    if (cTool === "pencil") tool.lineWidth = pencilSize;
                    break;
                case 1: // Eraser
                    eraserSize = sizeValue;
                    if (cTool === "eraser") tool.lineWidth = eraserSize;
                    break;
                case 2: // Rectangle
                    rectSize = sizeValue;
                    if (cTool === "rect") tool.lineWidth = rectSize;
                    break;
                case 3: // Line
                    lineSize = sizeValue;
                    if (cTool === "line") tool.lineWidth = lineSize;
                    break;
            }
            
            // Update status
            updateStatus();
        });
    });
});

// Close size options when clicking outside
window.addEventListener("click", function(e) {
    if (!e.target.closest(".tool") && !e.target.closest(".size-box")) {
        options.forEach(option => {
            option.style.display = "none";
        });
    }
});
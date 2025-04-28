let stickyButton = document.querySelector("#sticky");
let stickyCount = 0;

stickyButton.addEventListener("click", function () {
    createSticky();
});

function createSticky(text = "", x = 150, y = 150) {
    stickyCount++;
    let sticky = document.createElement("div");
    sticky.setAttribute("class", "sticky");
    sticky.setAttribute("id", "sticky-" + stickyCount);
    sticky.style.top = y + "px";
    sticky.style.left = x + "px";
    
    sticky.innerHTML = `
        <div class="navbar">
            <div class="sticky-title">Note ${stickyCount}</div>
            <div class="sticky-controls">
                <div class="minimize"></div>
                <div class="close"></div>
            </div>
        </div>
        <textarea class="textarea" placeholder="Type your note here...">${text}</textarea>
    `;
    
    body.appendChild(sticky);
    
    // Get elements
    let navbar = sticky.querySelector(".navbar");
    let minimize = sticky.querySelector(".minimize");
    let close = sticky.querySelector(".close");
    let textArea = sticky.querySelector("textarea");
    
    // Focus the textarea
    textArea.focus();
    
    // Minimize functionality
    let isClosed = false;
    minimize.addEventListener("click", function () {
        if (isClosed) {
            textArea.style.display = "block";
            sticky.style.height = "auto";
        } else {
            textArea.style.display = "none";
            sticky.style.height = "30px";
        }
        isClosed = !isClosed;
    });
    
    // Close functionality
    close.addEventListener("click", function () {
        sticky.remove();
    });
    
    // Make sticky draggable
    makeDraggable(sticky, navbar);
    
    return sticky;
}

// Make an element draggable by its handle
function makeDraggable(element, handle) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    handle.onmousedown = dragMouseDown;
    
    function dragMouseDown(e) {
        e.preventDefault();
        // Get mouse position at start
        pos3 = e.clientX;
        pos4 = e.clientY;
        
        // Move element on mouse move
        document.onmousemove = elementDrag;
        document.onmouseup = closeDragElement;
        
        // Bring to front
        element.style.zIndex = ++stickyCount + 50;
    }
    
    function elementDrag(e) {
        e.preventDefault();
        // Calculate new position
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        
        // Set new position
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }
    
    function closeDragElement() {
        // Stop moving when mouse button is released
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
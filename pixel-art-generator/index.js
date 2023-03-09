let container = document.querySelector(".container");
let gridButton = document.getElementById("submit-grid");
let clearGridButton = document.getElementById("clear-grid");
let gridWidth = document.getElementById("width-range");
let gridHeight = document.getElementById("height-range");
let colorButton = document.getElementById("color-input");
let eraseBtn = document.getElementById("erase-btn");
let paintBtn = document.getElementById("paint-btn");
let widthValue = document.getElementById("width-value");
let heightValue = document.getElementById("height-value");
let grid10 = document.getElementById("grid-10");
let grid24 = document.getElementById("grid-24");
let grid40 = document.getElementById("grid-40");
let gridmax = document.getElementById("grid-max");


let events = {
    mouse: {
        down: "mousedown",
        move: "mousemove",
        up: "mouseup"
    },
    touch: {
        down: "touchstart",
        move: "touchmove",
        up: "touchend",
    }
};

let deviceType = "";

let draw = false;
let erase = false;

const isTouchDevice = () => {
    try {
        document.createEvent("TouchEvent");
        deviceType = "touch";
        return true;
    } catch (error) {
        // console.log(error.message);
        deviceType = "mouse";
        return false;
    }
}

isTouchDevice();

gridButton.addEventListener("click", () => {
    container.innerHTML = "";
    let count = 0;
    for (let i = 0; i < gridHeight.value; i++) {
        count += 2;
        let div = document.createElement("div");
        div.classList.add("gridRow")

        for (let j = 0; j < gridWidth.value; j++) {
            count += 2;
            let col = document.createElement("div");
            col.classList.add("gridCol");
            col.setAttribute("id", `gridCol${count}`);
            col.addEventListener(events[deviceType].down, () => {
                draw = true;
                if (erase) {
                    col.style.backgroundColor = "transparent";
                } else {
                    col.style.backgroundColor = colorButton.value;
                }
            })

            col.addEventListener(events[deviceType].move, (e) => {
                let elementId = document.elementFromPoint(
                    !isTouchDevice() ? e.clientX : e.touches[0].clientX,
                    !isTouchDevice() ? e.clientY : e.touches[0].clientY,
                ).id;
                checker(elementId);
            })

            col.addEventListener(events[deviceType].up, (e) => {
                draw = false;
            });

            div.appendChild(col)

        }

        container.appendChild(div)
    }
})

function checker(elementId) {
    let gridColumns = document.querySelectorAll('.gridCol');
    gridColumns.forEach((element) => {
        if (elementId == element.id) {
            if (draw && !erase) {
                element.style.backgroundColor = colorButton.value;
            } else if (draw && erase) {
                element.style.backgroundColor = "transparent";
            }
        }
    })
}

clearGridButton.addEventListener("click", () => {
    container.innerHTML = "";
    gridWidth.value = 1
    gridHeight.value = 1
    widthValue.innerHTML = "01"
    heightValue.innerHTML = "01"
})

eraseBtn.addEventListener("click", () => {
    erase = true;
})

paintBtn.addEventListener("click", () => {
    erase = false;
})

gridWidth.addEventListener("input", () => {
    widthValue.innerHTML = gridWidth.value < 9 ? `0${gridWidth.value}` : gridWidth.value;
})

gridHeight.addEventListener("input", () => {
    heightValue.innerHTML = gridHeight.value < 9 ? `0${gridHeight.value}` : gridHeight.value;
})

grid10.addEventListener("click", () => {
    widthValue.innerHTML = '10'
    heightValue.innerHTML = '10'
    gridWidth.value = 10
    gridHeight.value = 10
})

grid24.addEventListener("click", () => {
    widthValue.innerHTML = '24'
    heightValue.innerHTML = '24'
    gridWidth.value = 24
    gridHeight.value = 24
})

grid40.addEventListener("click", () => {
    widthValue.innerHTML = '40'
    heightValue.innerHTML = '40'
    gridWidth.value = 40
    gridHeight.value = 40
})

gridmax.addEventListener("click", () => {
    widthValue.innerHTML = gridWidth.max;
    heightValue.innerHTML = gridHeight.max
    gridWidth.value = gridWidth.max;
    gridHeight.value = gridHeight.max
})

window.onload = () => {
    gridHeight.value = 0;
    gridWidth.value = 0;
}
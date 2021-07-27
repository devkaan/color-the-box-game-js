const levelButtons = document.querySelector(".levelButtons")
var levelDiv = document.querySelector(".level")
const colors = document.querySelector(".colors")
const defaultColorCode = `eee`
const msgDiv = document.querySelector(".message")
const container = document.querySelector(".container")
var nextLevelButton;
var isFinishedBool = false;
var currentColor = ""
var currentColorindex = ""
var currentLevelName = ""
var currentLevelindex = ""
function randomColor() {
    isLower = true
    while (isLower) {
        num = Math.floor(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, "0").toString()
        // document.body.style.backgroundColor = `#${num}`
        isLower = false
        return `${num}`
    }
}

var levels = [
    [
        "level1",
        "keyboard",
        "normal",
        [
            "bac",
            "ec1"
        ],
        "2x2",
        "2,1,1,2"
    ],
    [
        "level2",
        "bird",
        "easy",
        ["ccc", "c00"],
        "8x8",
        "1,1,1,1,1,1,1,1,1,2,2,1,1,2,2,1,2,1,1,2,2,1,1,2,1,2,1,1,1,1,2,1,1,2,1,1,1,1,2,1,1,1,2,1,1,2,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1"
    ],
    [
        "level3",
        "plant",
        "normal",
        [randomColor(), randomColor(), randomColor(), randomColor()],
        "10x10",
        "1,1,1,1,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,1,1,1,1,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,1"
    ],
    [
        "level4",
        "tree",
        "beginner",
        ["4c9ed8", "ad4615"],
        "3x3",
        "1,2,2,1,2,2,2,1,1"
    ],
    [
        "level5",
        "keyboard",
        "normal",
        [
            "bac",
            "ec1",
            "fda",
            "c00"
        ],
        "5x5",
        "1,1,1,1,1,2,2,2,2,2,3,3,3,3,3,2,2,2,2,2,4,4,4,4,4"
    ],[
        "level6",
        "keyboard",
        "normal",
        [
            "bac",
            "ec1",
            "fda",
            "c00"
        ],
        "5x5",
        "1,1,1,1,1,4,3,3,3,4,3,4,4,4,3,4,3,3,3,4,3,3,3,3,3"
    ]
]

for (let i = 0; i < levels.length; i++) {
    const level = levels[i];
    // var levelName = level[`level${i + 1}`].levelName;

    let el = document.createElement('button')
    el.className = "levelButton info";
    el.textContent = `Level ${i + 1}`
    levelName = `level${i + 1}`
    el.setAttribute('levelindex', levelName)

    el.addEventListener('click', (e) => {
        loadLevel(el)
        loadColors(el)
    })
    try {
        levelButtons.appendChild(el)
    } catch (error) {

    }
}

function loadLevel(el) {
    allActiveLevels = document.querySelectorAll('.activeLevel')
    allActiveLevels.forEach(item => {
        item.classList.remove('activeLevel')
    });
    el.classList.add(`activeLevel`)
    levelDiv.classList.remove('levelCompleted')
    nextLevelButton = document.querySelector(".nextLevelButton")
    try { nextLevelButton.remove() } catch (error) { }
    isFinishedBool = false;
    try {
        currentLevelName = ``
        currentColor = ``
        levelDiv.innerHTML = ""
        msgDiv.innerHTML = ""
    } catch (error) {
        return
    }

    let levelindex = el.getAttribute('levelindex')
    levelindex2 = levelindex.replace("level", "")
    level = levels[levelindex2 - 1]
    currentLevelName = level[0]
    currentLevelindex = Number(currentLevelName.replace('level', ''))
    let a = ``;
    try { a = level.indexOf(`level${levelindex2}`) } catch (error) { return }
    levelName = levels[levelindex2 - 1][0]
    levelPattern = levels[levelindex2 - 1][2]
    levelColors = levels[levelindex2 - 1][3]
    levelBoxes = levels[levelindex2 - 1][4]
    levelBoxesArr = levelBoxes.split(`x`)
    boxColors = levels[levelindex2 - 1][5]
    try { boxColorsArr = boxColors.split(`,`) }
    catch (error) {
        message = `There is an error. Please try again later. Error code: 002`
        popup(message, 'auto', 'danger', 3000)
    }
    total = Number(levelBoxesArr[0]) * Number(levelBoxesArr[1])
    const boxWidth = 32
    levelDiv.style.width = `${(boxWidth * Number(levelBoxesArr[0]))}px`
    for (let j = 0; j < total; j++) {
        let box = document.createElement('span')
        box.className = "box";
        try { box.textContent = boxColorsArr[j]; box.setAttribute('colorindex', boxColorsArr[j]) }
        catch (error) {
            message = `There is an error. Please try again later. Error code: 002`
            popup(message, 'auto', 'danger', 3000)
            return
        }

        box.addEventListener('click', (e) => {
            changeColor(box, currentColor, levelColors)
        })
        levelDiv.appendChild(box)
    }
    loadColors(el)
}

function loadColors(el) {
    colors.innerHTML = ""
    let levelindex = el.getAttribute('levelindex')
    levelindex2 = levelindex.replace("level", "")
    level = levels[levelindex2 - 1]
    levelColors = levels[levelindex2 - 1][3]

    boxColors = levels[levelindex2 - 1][5]
    try { boxColorsArr = boxColors.split(`,`) }
    catch (error) {
        levelDiv.innerHTML = ""
        message = `There is an error. Please try again later. Error code: 002`
        popup(message, 'auto', 'danger', 3000)
        return
    }

    for (let a = 0; a < levelColors.length; a++) {
        if (a == 0) { // erase and brush (not yet)
            let colorDiv = document.createElement('div')
            colorDiv.className = "color"
            colorDiv.style.backgroundColor = `#${defaultColorCode}`
            colorDiv.textContent = `Erase`
            colorDiv.setAttribute('colorindex', `e`)
            colorDiv.addEventListener('click', (e) => {
                allactives = document.querySelectorAll('.activeColor')
                allactives.forEach(item => {
                    item.classList.remove('activeColor')
                });
                colorDiv.classList.add(`activeColor`)
                currentColor = `#${defaultColorCode}`
            })
            colors.appendChild(colorDiv)
        }

        let colorCode = levelColors[a];
        let colorDiv = document.createElement('div')
        colorDiv.className = "color"
        colorDiv.style.backgroundColor = `#${colorCode}`
        colorDiv.textContent = `${a + 1}`
        colorDiv.setAttribute('colorindex', a + 1)
        colorDiv.addEventListener('click', (e) => {
            allactives = document.querySelectorAll('.activeColor')
            allactives.forEach(item => {
                item.classList.remove('activeColor')
            });
            colorDiv.classList.add(`activeColor`)
            currentColor = `#${colorCode}`
        })
        colors.appendChild(colorDiv)
    }
}

function changeColor(box, colorCode, levelColors) {
    if (isFinishedBool) return;
    if (!currentColor) {
        message = `Please select a color.`
        popup(message, 'auto', 'info', 2000)
        return
    }
    boxColorindex = box.getAttribute('colorindex')
    box.style.background = colorCode
    let currentColorCleared = currentColor.replace('#', '')
    currentColorindex = levelColors.indexOf(currentColorCleared);
    if (currentColorindex + 1 == boxColorindex) {
        box.textContent = ''
        box.style.opacity = `1`
    }
    else {
        if (currentColor == `#${defaultColorCode}`) {
            box.style.fontWeight = `normal`
        }
        else {
            box.style.fontWeight = `bold`
            box.style.opacity = "0.7";
        }
        box.textContent = boxColorindex
    }
    isFinished()
}
document.body.addEventListener('keydown', (e) => {
    var currentLevel = e.view.level
    if (e.key.toLowerCase() == `e`) {
        currentColor = `#${defaultColorCode}`
    }
    else {
        try {
            currentColor = `#${levelColors[e.key - 1]}`
        } catch (error) {
            return
        }
    }
    allactives = document.querySelectorAll('.activeColor')
    allactives.forEach(item => {
        item.classList.remove('activeColor')
    });
    let el = document.querySelector(`.color[colorindex="${e.key}"]`)
    try {
        el.classList.add(`activeColor`)
    } catch (error) {
        return
    }
})

function isFinished() {
    allBoxes = document.querySelectorAll('.box')
    counter = allBoxes.length
    allBoxes.forEach(box => {
        (!box.textContent) ? counter-- : null;
        if (counter != 0) {
            msgDiv.innerHTML = ""
            try {
                nextLevelButton = document.querySelector(".nextLevelButton")
                nextLevelButton.remove()
            } catch (error) {

            }
            return
        }

        //? levels.forEach((item, index) => {
        //?    levels[index].indexOf("level1")
        //? })


        
        msgDiv.textContent = `You won!`;
        let div = document.createElement(`button`)
        div.className = `nextLevelButton`;
        div.textContent = `Next Level`;
        div.addEventListener('click', () => {
            for (let r = 0; r < levels.length; r++) {
                if (levels[r].indexOf(`level${currentLevelindex + 1}`) > -1) {
                    nextLevel = document.querySelector(`.levelButton[levelindex="level${currentLevelindex + 1}"]`)
                    loadLevel(nextLevel)
                    break; // break the loop when found the next level
                }
                else {
                    msgDiv.innerHTML = "There is no more level :* Come again later."
                }
            }
            div.remove()
        })
        container.appendChild(div)

        isFinishedBool = true;
        levelDiv.classList.add('levelCompleted')
    })
}
firstlevel = document.querySelector('.levelButton[levelindex="level1"]')
loadLevel(firstlevel)
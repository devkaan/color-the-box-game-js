
var createButton = document.querySelector('#createButton')
var levelType = document.querySelector('#levelType')
var levelPattern = document.querySelector('#levelPattern')
var levelColors = document.querySelector('#levelColors')
var levelBoxes = document.querySelector('#levelBoxes')
var boxColors = document.querySelector('#boxColors')
var boxColorsCounter = document.querySelector('.boxColorsCounter')
let colorContainer = document.createElement("div");
colorContainer.className = `colorContainer`;
container.appendChild(colorContainer);

var levelDiv = document.createElement("div");
levelDiv.className = `level`;
container.appendChild(levelDiv);
createButton.addEventListener('click', () => {
    createLevel({
        levelType: levelType.value,
        levelPattern: levelPattern.value,
        levelColors: levelColors.value,
        levelBoxes: levelBoxes.value,
        boxColors: boxColors.value
    })
})
function createLevel(data) {
    colorContainer.innerHTML = ""
    levelDiv.innerHTML = ""

    lastlevelName = levels[levels.length - 1][0]
    newlevelName = `level${Number(lastlevelName.replace('level', '')) + 1}`

    levelColorsArr = levelColors.value.split(',')
    boxColorsArr = boxColors.value.split(',')
    levelBoxesArr = levelBoxes.value.split('x')
    totallevelBox = Number(levelBoxesArr[0]) * Number(levelBoxesArr[1])
    boxColorsCounter.style.fontWeight = "500"
    boxColorsCounter.style.textDecoration = "und"
    boxColorsCounter.innerHTML = `Level Boxes: ${Number(levelBoxesArr[0])} * ${Number(levelBoxesArr[1])} = ${Number(levelBoxesArr[0]) * Number(levelBoxesArr[1])} <br>Total defined colors: ${boxColorsArr.length}`
    const boxWidth = 32
    levelDiv.style.width = `${(boxWidth * Number(levelBoxesArr[0]))}px`;

    levelColorsArr.forEach(item => { //* creates the main colors
        let colordiv = document.createElement('span')
        colordiv.className = 'color'
        colordiv.textContent = `#${item}`
        colordiv.style.backgroundColor = `#${item}`;
        colorContainer.appendChild(colordiv)
    });

    for (let j = 0; j < totallevelBox; j++) {
        let box = document.createElement('input')
        box.className = "box";
        box.style.backgroundColor = `#${levelColorsArr[boxColorsArr[j] - 1]}`
        box.addEventListener('click', () => {
            box.select()
        })
        box.addEventListener('keyup', () => {
            console.log(box.value);
            if(!box.value){
                box.style.backgroundColor = `#${defaultColorCode}`
            }
            try {
                box.style.backgroundColor = `#${levelColorsArr[box.value-1]}`
            } catch (error) {
                console.log(error);
                return
            }
        })
        try { box.value = `${(boxColorsArr[j]) ? boxColorsArr[j] : '' }`; box.setAttribute('colorindex', boxColorsArr[j]) }
        catch (error) {
            message = `There is an error. Please try again later. Error code: 002`
            popup(message, 'auto', 'danger', 3000)
            return
        }
        levelDiv.appendChild(box)
    }
    let getoutputBtn = document.querySelector(`.getOutputButton`)
    if(getoutputBtn) return

    let getOutput = document.createElement('button')
    getOutput.textContent = "get output"
    getOutput.className = `getOutputButton button success`
    getOutput.addEventListener(`click`, () => {
        output_boxColors = ``
        let allBoxes = document.querySelectorAll('.box')
        for (let i = 0; i < allBoxes.length; i++) {
            if ((i + 1) == allBoxes.length)
                output_boxColors += allBoxes[i].value;
            else
                output_boxColors += allBoxes[i].value + ',';
        }
        var output = [
            newlevelName,
            data.levelType,
            data.levelPattern,
            data.levelColors.split(','),
            data.levelBoxes,
            output_boxColors,
        ]
        console.log(output);
    })
    container.appendChild(getOutput)
}
const inputs = document.querySelector("#inputs");
const inputTextBox = document.querySelector("#inputTextBox");
//creates num buttons
for (let i=0;i<10;i++) {
    const btn = document.createElement("div")
    btn.id = `button${i}`;
    btn.className = "numBtn";
    btn.innerHTML = `${i}`;
    inputs.appendChild(btn);

}
//Code to intialize calculator
const startCalc = function() {
    const buttons = document.querySelectorAll(".clearBtn, .inputBtn, .numBtn, .equalsBtn, .signBtn");
    const btnsArray = Array.from(buttons);
    const numBtns = document.querySelectorAll(".numBtn");
    const numBtnsArray = Array.from(numBtns);
    const inputBtns = document.querySelectorAll(".inputBtn");
    const inputBtnsArray = Array.from(inputBtns);
    const equalsBtn = document.querySelector(".equalsBtn");
    const signBtn = document.querySelector(".signBtn");
    const clearBtn = document.querySelector("clearBtn");
    btnsArray.forEach(btn => {
        btn.style.gridArea =`${btn.id}`;
    });
    addArrayListener(numBtnsArray, addInput);
    addArrayListener(inputBtnsArray, addInput);
    equalsBtn.addEventListener('click',eval);
    //update code for changeSigns to allow for negative numbers
    //signBtn.addEventListener('click', changeSigns);
}
//code to add event listener to all nodes in an array
function addArrayListener(array, func) {
    array.forEach(btn => {
        btn.addEventListener("click", func);
    });
}
//adds elements to the calculator textbox (allows you to write 2 + 2)
function addInput(e) {
    const val = inputTextBox.value;
    //checks if the first button pressed is not a number button
    if (val === "" && e.target.className !== "numBtn" ||
     //checks if the last input was a math function and the next button is another math function
        checkPrevInput(val[val.length-2],["&","+","-","÷","x","^"]) 
        && e.target.className === "inputBtn" ||
    //prevents illogical use of %
        val[val.length-1] === "%" &&
        checkPrevInput(e.target.innerHTML,["%",".",0,1,2,3,4,5,6,7,8,9]) ||
    //prevents illogical use of .
        checkPrevInput(e.target.innerHTML, checkPrevNum()) &&
        checkPrevInput(e.target.innerHTML,["%","."])
        ) {/*code if true*/}
    else {
        inputTextBox.value += e.target.innerHTML;
    }
}
//checks value against array values and returns true if it exists in the array
const checkPrevInput = function(value,array) {
    for (let i=0;i<array.length;i++) {
        if (value == array[i]) {
            return true;
        }
    }
    return false;
}
function checkPrevNum() {
    if (inputTextBox.value.lastIndexOf(" ") === -1) {
        return inputTextBox.value.split("");
    } else {
        const subStr = 
        inputTextBox.value.substring(inputTextBox.value.lastIndexOf(" "),inputTextBox.value.length);
        return subStr.split("");
    }
}
//change number negative or positive - pending completion
function changeSigns() {
    if (checkPrevInput(inputTextBox.value[inputTextBox.value.length - 1],["%",0,1,2,3,4,5,6,7,8,9])) {
        console.log(inputTextBox.value.lastIndexOf(" "));
    }
}
//evaluate the calculator inputs
function eval() {
    let expArr = inputTextBox.value.replace(/ \^ /g,"^").split(/( [+-x÷] )/g);
    evalPercents(expArr);
    evalExponents(expArr);
    expArr = expArr.join("");
    evalMult(expArr);
}
//evaluates multiplication and division
function evalMult(Arr) {
    Arr = Arr.replace(/\s/g,"").split(/([+-])/);
    for (let i=0;i<Arr.length;i++) {
        if (Arr[i].indexOf("x") !== -1 || Arr[i].indexOf("÷") !== -1) {
            let valArr = Arr[i].split(/([÷x])/);
            //continue here - valArr is an array of the sections that can be condensed to 1 number
        } else {}
    }
}
//evaluates exponents
function evalExponents(expArr) {
    for (let i=0;i<expArr.length;i++) {
        let val = expArr[i].toString();
        if (val.indexOf("^") !== -1) {
            let valArr = val.split("^").reverse();
            expArr[i] = valArr.reduce((exp,base) => {return base**exp});
        } else {}
    }
}
// evaluates percentages
function evalPercents(expArr) {
    for (let i=0;i<expArr.length;i++) {
        let val = expArr[i];
        //if exponents and percents exist in a value 
        if (val.indexOf("%") !== -1 && val.indexOf("^") !== -1) {
            val = val.split(/([\^])/);
            for (let i=0;i<val.length;i++) {
                if (val[i].indexOf("%") !== -1) {
                    val[i] = val[i].slice(0,val[i].length-1);
                    val[i] = val[i]/100;
                } else {
                    val[i] = val[i];
                }
            }
            expArr[i] = val.join("");
        //if only percents exist in  value
        } else if (val.indexOf("%") !== -1) {
            val = val.slice(0,val.length-1);
            val = val/100;
            expArr[i] = val;
        } else {}
    }
}
//Initializes calculator
startCalc();
const inputs = document.querySelector("#inputs");
const inputTextBox = document.querySelector("#inputTextBox");
const symbs = ["&","+","-","÷","x","^"];
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
    const clearBtn = document.querySelector(".clearBtn");
    btnsArray.forEach(btn => {
        btn.style.gridArea =`${btn.id}`;
    });
    addArrayListener(numBtnsArray, addInput);
    addArrayListener(inputBtnsArray, addInput);
    equalsBtn.addEventListener('click',eval);
    clearBtn.addEventListener('click',clearCalc);
}
//code to add event listener to all nodes in an array
function addArrayListener(array, func) {
    array.forEach(btn => {
        btn.addEventListener("click", func);
    });
}
//adds keyboard support
window.addEventListener('keydown', backspace);
window.addEventListener('keydown', keyInput);
window.addEventListener('keydown', equals);
//key input to solve expression
function equals(e) {
    if (e.key === "Enter") {
        eval();
    }
}
//key input to backspace  
function backspace(e) {
    if (e.key === "Backspace" 
    && inputTextBox.value[inputTextBox.value.length - 1] === " ") {
        inputTextBox.value = inputTextBox.value.substring(0,inputTextBox.value.length - 3);
    } else if (e.key === "Backspace") {
        inputTextBox.value = inputTextBox.value.substring(0,inputTextBox.value.length - 1);
    }
}
//key inputs
function keyInput(e) {
    const val = inputTextBox.value;
    const keys = ["/","+","-","x","^","%",".","0","1","2","3","4","5","6","7","8","9"];
    const inputs = [" ÷ "," + "," - "," x "," ^ ","%",".","0","1","2","3","4","5","6","7","8","9"];
    if (val === "" && checkKeys(e.key,keys.slice(0,8)) ||
        checkPrevInput(val[val.length-2],symbs) && checkKeys(e.key,keys.slice(0,7)) ||
        val[val.length-1] === "%" && checkPrevInput(e.key,keys.slice(6)) ||
        checkPrevInput(e.key, checkPrevNum()) && checkPrevInput(e.key,["%","."])
    ) {} 
    else if (keys.indexOf(e.key) > -1) {
        inputTextBox.value += inputs[keys.indexOf(e.key)];
    }
}
function keyToInput(key) {
    const keys = ["/","+","-","x","^"];
    const inputs = [" ÷ "," + "," - "," x "," ^ "];
    if (keys.indexOf(key) > -1) {
        return inputs[keys.indexOf(key)];
    }
}
function checkKeys(key,array) {
    if (array.indexOf(key) > -1) {
        return true;
    } else {
        return false;
    }
}
//adds elements to the calculator textbox (allows you to write 2 + 2)
function addInput(e) {
    const val = inputTextBox.value;
    //checks if the first button pressed is not a number button
    if (val === "" && e.target.className !== "numBtn" ||
     //checks if the last input was a math function and the next button is another math function
        checkPrevInput(val[val.length-2],symbs) && e.target.className === "inputBtn" ||
    //prevents illogical use of %
        val[val.length-1] === "%" && checkPrevInput(e.target.innerHTML,["%",".",0,1,2,3,4,5,6,7,8,9]) ||
    //prevents illogical use of .
        checkPrevInput(e.target.innerHTML, checkPrevNum()) && checkPrevInput(e.target.innerHTML,["%","."])
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
//evaluate the calculator inputs
function eval() {
    let expArr = inputTextBox.value.replace(/ \^ /g,"^").split(/( [+-x÷] )/g);
    let lastVal = expArr[expArr.length - 1];
    if (lastVal === "" || lastVal[lastVal.length-1] === "^") {
        return;
    }
    evalPercents(expArr);
    evalExponents(expArr);
    console.log(expArr);
    expArr = expArr.join("");
    expArr = evalMult(expArr);
    expArr = [evalAdd(expArr)];
    inputTextBox.value = expArr;
    console.log(`prereturn ${expArr}`);
    console.log(`prereturn ${typeof expArr}`);
    inputTextBox.value = returnVal(expArr);
    console.log(`postreturn ${expArr}`);
    console.log(`postreturn ${typeof expArr}`);
}
//rounds final value if relevant
function returnVal(expArr) {
    if (typeof expArr == "number") {
        expArr = expArr + "";
        if (expArr.indexOf(".") === -1) {
            return expArr;
        } else if (expArr.length - expArr.indexOf(".") >= 5) {
            return expArr.toFixed(4);
        } else if (expArr.length - expArr.indexOf(".") === 4) {
            return expArr.toFixed(3);
        } else if (expArr.length - expArr.indexOf(".") === 3) {
            return expArr.toFixed(2);
        } else if (expArr.length - expArr.indexOf(".") === 2) {
            return expArr.toFixed(1);
        } else {}
    } else if (typeof expArr == "object") {
        expArr = expArr[0] + "";
        if (expArr.indexOf(".") === -1) {
            return expArr;
        } else if (expArr.length - expArr.indexOf(".") >= 5) {
            return Number(expArr).toFixed(4);
        } else if (expArr.length - expArr.indexOf(".") === 4) {
            return Number(expArr).toFixed(3);
        } else if (expArr.length - expArr.indexOf(".") === 3) {
            return Number(expArr).toFixed(2);
        } else if (expArr.length - expArr.indexOf(".") === 2) {
            return Number(expArr).toFixed(1);
        } else {}
    }
}
function clearCalc() {
    inputTextBox.value = "";
}
//evaluates addition and subtraction
function evalAdd(expArr) {
    let returnVal = "not calculated";
    if (expArr.length > 1) {
        for (let i=0;i<expArr.length;i+=2) {
            expArr[i] = Number(expArr[i]);
        }
        for (let n=1;n<expArr.length-1;n+=2) {
            let val1 = expArr[0];
            let val2 = expArr[n+1];
            let operator = expArr[n];
            if (operator === "+" && returnVal === "not calculated") {
                returnVal = val1+val2;
            } else if (operator === "-" && returnVal === "not calculated") {
                returnVal = val1-val2;
            } else if (operator === "+") {
                val1 = returnVal;
                returnVal = val1+val2;
            } else if (operator === "-") {
                val1 = returnVal;
                returnVal = val1-val2;
            }
        }
    } else {
        returnVal = expArr;
    }
    console.log(typeof returnVal);
    return returnVal;
}
//evaluates multiplication and division
function evalMult(expArr) {
    expArr = expArr.replace(/\s/g,"").split(/([+-])/);
    for (let i=0;i<expArr.length;i++) {
        if (expArr[i].indexOf("x") !== -1 || expArr[i].indexOf("÷") !== -1) {
            let valArr = expArr[i].split(/([÷x])/);
            let returnVal = "not calculated";
            for (let n=1;n<valArr.length-1;n+=2) {
                let val1 = valArr[0];
                let val2 = valArr[n+1];
                let operator = valArr[n];
                if (operator === "÷" && returnVal === "not calculated") {
                    if (val2 == 0) {
                        inputTextBox.value = "You can't divide by 0 silly";
                        break;
                    }
                    returnVal = val1/val2;
                } else if (operator === "x" && returnVal === "not calculated") {
                    returnVal = val1*val2;
                } else if (operator === "÷") {
                    if (val2 == 0) {
                        inputTextBox.value = "You can't divide by 0 silly";
                        break;
                    }
                    val1 = returnVal;
                    returnVal = val1/val2;
                } else if (operator === "x") {
                    val1 = returnVal;
                    returnVal = val1*val2;
                }
            }
            expArr[i] = returnVal;
        } else {}
    }
    return expArr;
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
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
    const buttons = document.querySelectorAll(".inputBtn, .numBtn, .equalsBtn, .signBtn");
    const btnsArray = Array.from(buttons);
    const numBtns = document.querySelectorAll(".numBtn");
    const numBtnsArray = Array.from(numBtns);
    const inputBtns = document.querySelectorAll(".inputBtn");
    const inputBtnsArray = Array.from(inputBtns);
    const equalsBtn = document.querySelector(".equalsBtn");
    const signBtn = document.querySelector(".signBtn");
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
    if (val === "" && e.target.className === "inputBtn" ||
     //checks if the last input was a math function and the next button is another math function
        checkPrevInput(val[val.length-2],["&","+","-","÷","x","^"]) 
        && e.target.className === "inputBtn" ||
    //prevents illogical use of % or .
        val[val.length-1] === "%" &&
        checkPrevInput(e.target.innerHTML,["%",".",0,1,2,3,4,5,6,7,8,9]) ||
        val[val.length-1] === "." &&
        checkPrevInput(e.target.innerHTML,["%","."]) ||
        dotCheck() &&
        e.target.innerHTML === ".") 
        {
        console.log("if");
    }
    //code if false
    else {
        inputTextBox.value += e.target.innerHTML;
        console.log("else");
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
//change number negative or positive - pending completion
function changeSigns() {
    if (checkPrevInput(inputTextBox.value[inputTextBox.value.length - 1],["%",0,1,2,3,4,5,6,7,8,9])) {
        console.log(inputTextBox.value.lastIndexOf(" "));
    }
}
function dotCheck() {
    const val = inputTextBox.value;
    if (val.lastIndexOf(" ") === -1 
        && val.lastIndexOf(".") === -1) {
        return false;
        }
    else if (val.lastIndexOf(" ") === -1) {
        console.log(val.lastIndexOf("."));
        console.log(val.lastIndexOf(".") === -1);
        return val.lastIndexOf(".") === -1;
    } else {
        return val.lastIndexOf(".") > val.lastIndexOf(" ");
    }
}
//evaluate the calculator inputs
function eval() {
    let expression = inputTextBox.value.split(" ").join("");
    console.log(expression);
}
//Initializes calculator
startCalc();
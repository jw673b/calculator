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
//intializes calculator
const startCalc = function() {
    
    //creates array from all div "buttons"
    const buttons = document.querySelectorAll(".inputBtn, .numBtn");
    const btnsArray = Array.from(buttons);
    //sets button positions
    btnsArray.forEach(btn => {
        btn.style.gridArea =`${btn.id}`;
    setEventListeners(btnsArray);
});
}
startCalc();


function setEventListeners(array) {
    array.forEach(btn => {
        btn.addEventListener("click", addInput);
    });
}
function addInput(e) {
    //no code is executed if the first button pressed is not a number button
    if (inputTextBox.value === "" && e.target.className === "inputBtn") {}
    else {
        inputTextBox.value += e.target.innerHTML;
        console.log(inputTextBox.value.length);
    }
}

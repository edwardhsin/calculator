let displayInput = document.querySelector('.displayInput');
let displayAnswer = document.querySelector('.displayAnswer');

let clear = document.getElementById('clear');
clear.addEventListener("click", (e) => {
    displayInput.innerHTML = '';
    displayAnswer.innerHTML = '';

}  );

const number = document.querySelectorAll('.number');   // n index html, number button class = "number"
number.forEach((number) => {
    number.addEventListener('click', (e) => {
        //displayInput.innerHTML += number.id;     // prints the id string for he button
        displayInput.innerHTML += number.textContent;   // prints the button's text
        console.log(number.textContent);       //

}   );
}   );

const operator = document.querySelectorAll('.operator');   // n index html, number button class = "number"
operator.forEach((operator) => {
    operator.addEventListener('click', (e) => {
        //displayInput.innerHTML += number.id;     // prints the id string for he button
        displayInput.innerHTML += operator.textContent;   // prints the button's text
        console.log(operator.textContent);       //

}   );
}   );

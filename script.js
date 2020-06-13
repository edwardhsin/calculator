let displayInput = document.querySelector('.displayInput');
let displayAnswer = document.querySelector('.displayAnswer');

let clear = document.getElementById('clear');
clear.addEventListener("click", (e) => {
    displayInput.innerHTML = '';
    displayAnswer.innerHTML = '';
    
    strArr = [];
});

const number = document.querySelectorAll('.number'); 
number.forEach((number) => {
    number.addEventListener('click', (e) => {
        //displayInput.innerHTML += number.id;     // prints the id string for he button
        displayInput.innerHTML += number.textContent;   // prints the button's text
        console.log(number.textContent);

    });
});

const operator = document.querySelectorAll('.operator');
operator.forEach((operator) => {
    operator.addEventListener('click', (e) => {
        displayInput.innerHTML += operator.textContent;
        console.log(operator.textContent);

    });
});

const backspace = document.querySelector(".backspace");
backspace.addEventListener('click', (e) =>{ 
    console.log("you pressed backspace...");
    displayInput.innerHTML = displayInput.innerHTML.slice(0, -1); 
    console.log(displayInput.innerHTML);

});

let inputString = '';
let regex = " ";
let strArr = [];

let testString = '3+3';
console.log(testString);
strArr = testString.split('+');
console.log(strArr);

const equal = document.querySelector('.operatorEqual');
equal.addEventListener("click", (e) => {
    inputString = displayInput.innerHTML;
    displayAnswer.innerHTML = inputString;
    //strArr = inputString.split(/[- + ÷ x]/);   //need to research syntax inside split... too complicated to add delimiters as alement
    //console.log(strArr);
    mySplit(inputString); // separate each int / operator into an index
    console.log("from equal button: ", strArr)  // check same
    // linear search loop for  [^ rad] -> [x / ]  -> [ + - ]
    // linear search loop (   operations(strArr, index1, index2)) // some operation ^ rad only need 1 index
    searchLoop();
    displayAnswer.innerHTML = strArr;
});

let count;
let charCount;
let digitsStrA;
let digitsStrB;
let i;

let zeroChar = "0";
//let index;  //***not same as count , actually not needed*/
//split but keep each delimiter as one element in the array
function mySplit(insertString) {
    charCount = insertString.length;
    console.log("char length: ", charCount);
    console.log("charAt[o]: ", insertString.charAt(0));

    // need check for 2 consecutive decimals OR last char is operator-> display error before while loop
    // if match -> return 
    if (insertString.includes("..")){
        console.log(strArr);
        console.log("error: consecutive ..");
        strArr = "error: consecutive ..  "; //** note strArr[] changed to  a string */
        //displayAnswer.innerHTML = " asdf ";  is already called after serchLoop is called
        console.log("strArr ", strArr);
        return;
    }

    if (isNaN(insertString.charAt(charCount-1))){
        console.log("error: operator in last ");
        strArr = "error: operator in last ";
        //displayAnswer.innerHTML = strArr;
        console.log(strArr);
        return;
    }

    count = 0;
    while (count < charCount) {
        console.log("loop: ", count);

        // if char is 0-9 or "." ,  if next index is also a num then append to same index
        if (!isNaN(insertString.charAt(count)) || insertString.charAt(count) == ".") {
            //  3 4 -> 3.4
            if ((count > 0 && !isNaN(insertString.charAt(count)) && !isNaN(insertString.charAt(count - 1)))) {   //** is  . decimal */
                digitsStrA = strArr.pop(); //record last elem in arr and destroy it
                digitsStrB = insertString.charAt(count);   // the char (1) on the string

                digitsStrA += digitsStrB;
                console.log(" decimal after concat: ", digitsStrA);

                strArr.push(digitsStrA);
                console.log("after 2 number concat ", strArr);


            }  
            // . 3 -> .3
            else if ((count > 0 && !isNaN(insertString.charAt(count)) && insertString.charAt(count - 1)) == ".") {   //** is  . decimal */
                digitsStrA = strArr.pop(); //record last elem in arr and destroy it
                digitsStrB = insertString.charAt(count);   // the char (1) on the string

                digitsStrA += digitsStrB;
                console.log(" decimal after concat: ", digitsStrA);

                strArr.push(digitsStrA);
                console.log("after 2 number concat ", strArr);

            }  
            //  3 . ->  3.
            else if (insertString.charAt(count) == ".") {
                // if     __ .4  ->  0.4       // 12 +  .4   -> 12 + 0.4
                if (count == 0){
                    console.log("first char is a decimal");
                    digitsStrA = zeroChar;
                    digitsStrB = insertString.charAt(count); 

                    digitsStrA += digitsStrB;
                    strArr.push(digitsStrA);
                    console.log("after ['.' num ] ", strArr);

                }
               
                else if (  isNaN(insertString.charAt(count-1) )){
                    console.log(" int starts with a decmila");
                    digitsStrA = zeroChar;
                    digitsStrB = insertString.charAt(count); 

                    digitsStrA += digitsStrB;
                    strArr.push(digitsStrA);
                    console.log("after ['op' '.' num ] ", strArr);
                }
                else {
                    console.log("decmial FOUND");
                    digitsStrA = strArr.pop(); //record last elem in arr and destroy it
                    digitsStrB = insertString.charAt(count);
                    console.log("check  digitsStrA digitsStrB", digitsStrA, digitsStrB);
                    digitsStrA += digitsStrB;

                    strArr.push(digitsStrA);
                    console.log("after [num '.' concat ] ", strArr);
                }
            }  
            // next element
            else {
                console.log(strArr);
                strArr.push(insertString.charAt(count));
                
            }
            count++;
        }
        else if (isNaN(insertString.charAt(count))) {   // need to check certain operators or buttons
            console.log("not a num", count, strArr[count]);
            strArr.push(insertString.charAt(count));
            count++;
        }

        //console.log("recheck first if NaN ",strArr[0], !isNaN(strArr[0]));
    }

    console.log(strArr);
};

let indexOp1;
let indexOp2;
let indexToCalc;
function searchLoop() {
    //while(strArr.length > 1){
    //   // splice certain indexes
    //}
    while (strArr.indexOf("^") != -1 || strArr.indexOf("√") != -1) {
        indexOp1 = strArr.indexOf("^");
        indexOp2 = strArr.indexOf("√");
        console.log("operators + - found at: ", indexOp1, indexOp2);
        indexToCalc = Math.min(indexOp1, indexOp2);
        if (indexToCalc < 0) {
            indexToCalc = Math.max(indexOp1, indexOp2);
        }
        console.log("first of 2 operator found at: ", indexToCalc);
        console.log("strArr[indexToCalc] ", strArr[indexToCalc], strArr[indexToCalc - 1], strArr[indexToCalc + 1]);
        operation(strArr[indexToCalc], indexToCalc - 1, indexToCalc + 1);
    }

    while (strArr.indexOf("x") != -1 || strArr.indexOf("÷") != -1) {
        indexOp1 = strArr.indexOf("x");
        indexOp2 = strArr.indexOf("÷");
        console.log("operators + - found at: ", indexOp1, indexOp2);
        indexToCalc = Math.min(indexOp1, indexOp2);
        if (indexToCalc < 0) {
            indexToCalc = Math.max(indexOp1, indexOp2);
        }
        console.log("first of 2 operator found at: ", indexToCalc);
        console.log("strArr[indexToCalc] ", strArr[indexToCalc], strArr[indexToCalc - 1], strArr[indexToCalc + 1]);
        operation(strArr[indexToCalc], indexToCalc - 1, indexToCalc + 1);
    }

    while (strArr.indexOf("+") != -1 || strArr.indexOf("-") != -1) {
        indexOp1 = strArr.indexOf("+");
        indexOp2 = strArr.indexOf("-");
        console.log("operators + - found at: ", indexOp1, indexOp2);
        indexToCalc = Math.min(indexOp1, indexOp2);
        if (indexToCalc < 0) {
            indexToCalc = Math.max(indexOp1, indexOp2);
        }
        console.log("first of 2 operator found at: ", indexToCalc);
        console.log("strArr[indexToCalc] ", strArr[indexToCalc], strArr[indexToCalc - 1], strArr[indexToCalc + 1]);
        operation(strArr[indexToCalc], indexToCalc - 1, indexToCalc + 1);
    }
}

let firstNum;
let secondNum;
let outputNum;
let outputString;
function operation(operator, indexA, indexB) {
    firstNum = parseFloat(strArr[indexA]);
    secondNum = parseFloat(strArr[indexB]);
    console.log("inside operation func: ", indexA, indexB, firstNum, secondNum);

    switch (operator) {
        case "x":
            outputNum = firstNum * secondNum;
            console.log("output: ", outputNum);
            outputString = outputNum.toString();
            strArr[indexA] = outputString;
            //first num becomes output, now get rid of the 2 (op and second num behind)
            strArr.splice(indexA + 1, 2);
            console.log("strArr after computation: ", strArr);
            break;
        case "÷":
            outputNum = firstNum / secondNum;
            console.log("output: ", outputNum);
            outputString = outputNum.toString();
            strArr[indexA] = outputString;
            strArr.splice(indexA + 1, 2);
            console.log("strArr after computation: ", strArr);
            break;
        case "+":
            outputNum = firstNum + secondNum;
            console.log("output: ", outputNum);
            outputString = outputNum.toString();
            strArr[indexA] = outputString;
            strArr.splice(indexA + 1, 2);
            console.log("strArr after computation: ", strArr);
            break;
        case "-":
            outputNum = firstNum - secondNum;
            console.log("output: ", outputNum);
            outputString = outputNum.toString();
            strArr[indexA] = outputString;
            strArr.splice(indexA + 1, 2);
            console.log("strArr after computation: ", strArr);
            break;
        case "^":
            outputNum = Math.pow(firstNum, secondNum);
            console.log("output: ", outputNum);
            outputString = outputNum.toString();
            strArr[indexA] = outputString;
            strArr.splice(indexA + 1, 2);
            console.log("strArr after computation: ", strArr);
            break;
        case "√":
            outputNum = Math.pow(secondNum, 0.5);
            console.log("output: ", outputNum);
            outputString = outputNum.toString();
            strArr[indexB - 1] = outputString;
            //operator index becomes answer, erase number behind answer
            strArr.splice(indexB, 1);
            console.log("strArr after computation: ", strArr);
            break;

    }

}

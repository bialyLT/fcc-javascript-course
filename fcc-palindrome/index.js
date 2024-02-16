const button = document.querySelector("#check-btn");
const text = document.querySelector("#text-input");
const result = document.querySelector("#result");

button.addEventListener('click', (e) => {
    e.preventDefault();
    const textInput = text.value;
    console.log(textInput[1])
    if (!textInput) {
        alert("Please input a value");
    } else {
        let textResult = ''
        if (isPalindrome(textInput)) {
            textResult = `${textInput} is a palindrome`;
            result.innerHTML  = textResult; 
            text.value = '';    
        } else {
            textResult = `${textInput} is not a palindrome`;
            result.innerHTML = textResult;
        }
    }
});

const isPalindrome = (wrd) => {
//eliminar signos y espacios en blanco
    let i = 0;    
    let word = wrd.replace(/[-.,_:() \\]/g, '');
    word = word.toLowerCase(); 
    console.log(word);
    let j = word.length - 1;   
    while (i !== j) {
        if (word[i] === '/') {
            i++;
            continue;
        }
        if (word[j] === '/') {
            j--;
            continue;
        }
        if ((word[i] === word[j])) {
            i++;
            j--;      
            if (i > j) {
                return true
            } 
        } else{
            return false;
        }
    }
    if (i === j && word[i] === word[j]) {
        return true;
    }
}


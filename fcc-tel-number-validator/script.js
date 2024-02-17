const userInput = document.querySelector("#user-input");
const checkBtn = document.querySelector("#check-btn");
const clearBtn = document.querySelector("#clear-btn");
const resultsDiv = document.querySelector("#results-div");

clearBtn.addEventListener("click", (e) => {
    resultsDiv.innerHTML = '';

});

checkBtn.addEventListener("click", () => {
    let value = userInput.value;
    if (!value) {
        alert("Please provide a phone number");
    } else {
        if (isValide(value)) {
            resultsDiv.innerHTML = `Valid US number: ${value}`
        } else {
            resultsDiv.innerHTML = `Invalid US number: ${value}`
        }
    }

})

const isValide = (v) => {
    // regex para espacios en blanco
    const blank = /\s/g;
    // const guion = /-/g;
    // quitamos espacios en blanco
    v = v.replace(blank, '');    
    //  controlamos que termine con 4 numeros
    const end4numbers = /\d{4}$/;
    if (!end4numbers.test(v)) {
        return false;
    }
    // contorlamos que tenga solo -, (, ), o numeros
    const onlyNumbersandS = /^[-()0-9]+$/;
    if (!onlyNumbersandS.test(v)) {
        return false
    }
    // controlamos si tiene codigo de area (11 numeros)
    const withArea = /^(\D*\d){11}\D*$/;
    console.log(v[0])
    if (!withArea.test(v)) {
        // controlamos que tenga 10 numeros ni mas ni menos
        const withoutArea = /^(\D*\d){10}\D*$/;
        if (!withoutArea.test(v)) {
            return false;
        } else {
            // controlamos si hay parentesis sin codigo de area
            if (!controlParentesis(v, false)) {
                return false; 
            }  
        }
    } else {
        // si tiene codigo de area tiene que empezar en 1
        if (v[0] != 1) {
            return false;
        } else {
            // controlamos que exista un parentesis con codigo de area
            if (!controlParentesis(v, true)) {
                return false;   
            }
        }
    }
    // si pasa los test, es valido
    return true;
}

const controlParentesis = (val, wA) => {
    // controlamos que haya o no parentesis
    const parentesis = /\(|\)/;
    // si tiene area code es posible que este en la posicion 2
    // sino, es posible que este en la primera posicion
    const p = wA ? 1 : 0;
    // controlamos que haya parentesis
    if (parentesis.test(val)) {
        // controlamos que la apertura este en la posicion correcta
        if (val[p] === '(') {
            // controlamos que el cierre este en la posicion correcta
            if (val[p+4] === ")") {
                return true;
            } else {
                
                // debe haber cierre o debe estar en la posicion correcta
                return false;
            }
        } else {
            // la apertura debe estar en la posicion correcta
            return false;
        }
    } else{
        // no se encontraron parentesis
        return true;
    }
    
 }
const number = document.querySelector('#number');
const convertBtn = document.querySelector("#convert-btn");
const output = document.querySelector("#output");

convertBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const value = number.value;
    const msg = 'Please enter a valid number';
    if (!value) {
        output.innerHTML = msg;
        return
    }
    if (value < 1) {
        const gteOne = 'Please enter a number greater than or equal to 1';
        output.innerHTML = gteOne;
        return
    }
    if (value > 3999) {
        const lteMax = 'Please enter a number less than or equal to 3999';
        output.innerHTML = lteMax;
        return
    }

    if (!isValidNumber(value)) {
        output.innerHTML = msg;
        return
    } else {
        const valueConverter = convertRoman(value);
        output.innerHTML = valueConverter;
    }
});

const isValidNumber = (v) => {
    return (v > 0 && v < 4000) ? true : false;
}

const one = 'I'
const five = 'V'
const ten = 'X'
const fifty = 'L'
const oneH = 'C'
const fiveH = 'D'
const oneT = 'M'

const convertRoman = (v) => {
    let salida = '';
    let millar;
    let centena;
    let decena;
    let unidad;

    if (v > 999) {
        millar = Math.floor(v / 1000);
        salida = convertRomansNumber(millar, oneT);
        v -= (1000 * millar);
        centena = Math.floor(v / 100);
        salida = salida.concat(convertRomansNumber(centena, oneH, fiveH, oneT));
        v -= (100 * centena)
        decena = Math.floor(v / 10);
        salida = salida.concat(convertRomansNumber(decena, ten, fifty, oneH));
        v -= (10 * decena);
        unidad = v;
        salida = salida.concat(convertRomansNumber(unidad, one, five, ten));
        return salida;
    } else if (v > 99) {
        centena = Math.floor(v / 100);
        salida = salida.concat(convertRomansNumber(centena, oneH, fiveH, oneT));
        v -= (100 * centena)
        decena = Math.floor(v / 10);
        salida = salida.concat(convertRomansNumber(decena, ten, fifty, oneH));
        v -= (10 * decena);
        unidad = v;
        salida = salida.concat(convertRomansNumber(unidad, one, five, ten));
    } else if (v > 9) {
        decena = Math.floor(v / 10);
        salida = salida.concat(convertRomansNumber(decena, ten, fifty, oneH));
        v -= (10 * decena);
        unidad = v;
        salida = salida.concat(convertRomansNumber(unidad, one, five, ten));
    } else {
        unidad = v;
        salida = salida.concat(convertRomansNumber(unidad, one, five, ten));
    }
    return salida;
}

const convertRomansNumber = (numero, bottom, mid, top) => {
    let salida = '';
    if (numero == 9) {
        return bottom + top;
    }
    if (numero == 4) {
        return bottom + mid;
    }
    if (numero >= 5) {
        salida = mid;
    }
    for (let i = numero > 4 ? 5 : 0; i < numero; i++) {
        salida = salida.concat(bottom);
    }
    return salida;
}
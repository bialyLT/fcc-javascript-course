const cashInput = document.querySelector("#cash");
const purchaseBtn = document.querySelector("#purchase-btn");
const changeDue = document.querySelector("#change-due");
let output;
let price = 19.5;
let cash;
let cambio;
let cid = [
    [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]
];

const values = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100]


purchaseBtn.addEventListener("click", (e) => {
    let statusMsg = '';
    cash = cashInput.value;
    if (cash < price) {
        alert('Customer does not have enough money to purchase the item')
        return;
    }
    if (Number(cash) === price) {
        statusMsg = 'No change due - customer paid with exact cash';
        changeDue.innerHTML = statusMsg;
        return
    }
    let total = cid.reduce((s, val) => s + val[1], 0);
    output = total - (cash - price);
    if (output < 0) {
        statusMsg = 'Status: INSUFFICIENT_FUNDS';
        return
    } else if (output == 0) {
        statusMsg = 'Status: CLOSED'
    } else {
        statusMsg = 'Status: OPEN'
    }
    cambio = cash - price;
    cambio = cambio.toFixed(2);
    for (let i = cid.length - 1; i >= 0; i--) {
        // le restamos la cantidad de veces que se pueda pagarle en una unidad
        let cantVeces = Math.floor(cambio / values[i]);
        // buscamos la unidad factible para pagarle al cliente
        if (cambio >= values[i]) {
            console.log(cantVeces)
            for (cantVeces; cantVeces !== 0; cantVeces--) {
                // chequeamos si tenemos stock en dicha unidad para pagarle
                if (cid[i][1] >= values[i] * cantVeces) {
                    // restamos nuestro stock
                    cid[i][1] -= values[i] * cantVeces;
                    cid[i][1] = cid[i][1].toFixed(2);
                    // restamos el cambio hasta que no quede nada
                    cambio -= values[i] * cantVeces;
                    cambio = cambio.toFixed(2);
                    statusMsg += ' ' + cid[i][0] + ': $' + values[i] * cantVeces;
                    // si conseguimos restar la cantidad de dinero en una unidad no necesitamos volver a hacerlo con una cantidad de veces menor
                    break;
                }
            }
        }
    }
    // si no tenemos el cambio suficiente devolvemos que hay fondos insuficiente
    if (cambio != 0) {
        statusMsg = 'Status: INSUFFICIENT_FUNDS';
    }

    changeDue.innerHTML = statusMsg;
})





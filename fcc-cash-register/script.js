const cashInput = document.querySelector("#cash");
const purchaseBtn = document.querySelector("#purchase-btn");
const changeDue = document.querySelector("#change-due");
let price = 1.87;
let cash;
let cambio;
let cid = [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
];

const values = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100]


purchaseBtn.addEventListener("click", (e) => {
    let statusMsg = '';
    cash = parseFloat(cashInput.value).toFixed(2);
    if (cash < price) {
        alert('Customer does not have enough money to purchase the item')
    } else if (cash == price) {
        statusMsg = 'No change due - customer paid with exact cash';
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
    cambio = parseFloat(cash).toFixed(2) - parseFloat(price).toFixed(2);
    for (let i = cid.length - 1; i >= 0; i--) {
        // buscamos la unidad factible para pagarle al cliente
        if (cambio > values[i]) {
            // si hay esa unidad le restamos la cantidad de veces que se pueda 
            // y despues volvemos a recorrer para ver con que unidad le pagamos nuevamente
            let cantVeces = Math.floor(cambio / values[i]);
            if (cid[i][1] > values[i].toFixed(2)*cantVeces) {
                // restamos nuestro stock
                cid[i][1] -= values[i].toFixed(2)*cantVeces
                // restamos el cambio hasta que no quede nada
                cambio -= parseFloat(values[i].toFixed(2)*cantVeces)
                statusMsg = statusMsg.concat(' ', cid[i][0], ': $', values[i].toFixed(2)*cantVeces);
                i = cid.length - 1;
            }
        }
    }
    console.log(cambio)
    changeDue.innerHTML = statusMsg;
})





import cart from './cart.json';
import currencyRates from './currencyRates.json';
import { renderRows,renderTotals } from './view';

const currencyPicker = document.querySelector("select[name='currency-picker']");

currencyPicker.innerHTML = Object.keys(currencyRates).map(el => `<option>${el}</option>`).join('');

const computeCurrencyChange = (currency, rate, fn) =>{
    const conversionRate = rate[currency] ?? 1;
    return (cart) => {
        const revised = cart.map(item => {
            return {
                ...item,
                cost : item.cost * conversionRate,
            };
        });

        return fn(revised);
    };
};

const computeCart = function(){
    const currency = this?.value;
    computeCurrencyChange(currency, currencyRates, renderRows)(cart);
    computeCurrencyChange(currency, currencyRates, renderTotals)(cart)
}

currencyPicker.addEventListener('change', computeCart);

computeCart();
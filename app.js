const convertBtn = document.getElementById('convertBtn');
const resultDiv = document.getElementById('result');

convertBtn.addEventListener('click', async () => {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('fromCurrency').value.toUpperCase();
    const toCurrency = document.getElementById('toCurrency').value.toUpperCase();

    try {
        const result = await convertCurrency(amount, fromCurrency, toCurrency);
        resultDiv.textContent = `${amount} ${fromCurrency} = ${result} ${toCurrency}`;
    } catch (error) {
        console.error('Cevirme mumkun olmadi..', error);
        resultDiv.textContent = 'Cevirme mumkun olmadi...';
    }
});

async function convertCurrency(amount, fromCurrency, toCurrency) {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    const data = await response.json();
    const exchangeRates = data.rates;

    const result = (amount / exchangeRates[fromCurrency]) * exchangeRates[toCurrency];
    return result.toFixed(2);
}

import currencyFormatter from 'currency-formatter'


function money(data:number):string {
return currencyFormatter.format(1000000, {
    symbol: 'đ',
    decimal: ',',
    thousand: '.',
    precision: 0,
    format: '%v %s' // %s is the symbol and %v is the value
  });
}

export default money
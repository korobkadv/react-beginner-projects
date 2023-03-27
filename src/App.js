import React from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  const [fromCurrency, setFromCurrency] = React.useState('UAH');
  const [toCurrency, setToCurrency] = React.useState('USD');
  const [fromPrice, setFromPrice] = React.useState(1);
  const [toPrice, setToPrice] = React.useState(0);

  const ratesData = React.useRef({});
  const exchangedate = React.useRef('');


  React.useEffect(() => {
    fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
      .then((res) => res.json())
      .then((json) => {

        json.push({ "r030": 980, "txt": "Українська гривня", "rate": 1, "cc": "UAH" });

        exchangedate.current = json[0].exchangedate;

        const filterData = {};
        for (const key in json) {
          filterData[json[key].cc] = json[key].rate;
        }

        ratesData.current = filterData;

        onChangeFromPrice(1);

      }).catch((err) => {
        console.warn(err);
        alert('Error getting information');
      });
  }, []);

  const onChangeFromPrice = (value) => {

    const price = value * (ratesData.current[fromCurrency] / ratesData.current[toCurrency]);

    setToPrice(price.toFixed(3));
    setFromPrice(value);

  }

  const onChangeToPrice = (value) => {

    const result = value * (ratesData.current[toCurrency] / ratesData.current[fromCurrency]);

    setFromPrice(result.toFixed(2));
    setToPrice(value);
  }

  React.useEffect(() => {
    onChangeFromPrice(fromPrice)
  }, [fromCurrency]);

  React.useEffect(() => {
    onChangeFromPrice(fromPrice)
  }, [toCurrency]);

  return (
    <div className="App"> 
      <Block value={fromPrice} currency={fromCurrency} onChangeCurrency={setFromCurrency} onChangeValue={onChangeFromPrice} exchangedate={exchangedate.current} />
      <Block value={toPrice} currency={toCurrency} onChangeCurrency={setToCurrency} onChangeValue={onChangeToPrice} exchangedate={exchangedate.current} />
      Exchange date: {exchangedate.current}
    </div>
  );
}

export default App;

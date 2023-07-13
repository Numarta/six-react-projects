import React from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  const [rates, setRates] = React.useState({});
  const [fromCurrency, setFromCurrency] = React.useState('KZT');
  const [toCurrency, setToCurrency] = React.useState('USD');
  const [howManyFrom, setHowManyFrom] = React.useState(0);
  const [howManyTo, setHowManyTo] = React.useState(0);

  React.useEffect(() => {
    fetch('https://www.cbr-xml-daily.ru/daily_json.js')
      .then((res) => res.json())
      .then((res) => {
        setRates(res);
      })
      .catch((err) => {
        console.log(`Произошла ошибка ${err}`);
        alert('Не удалось получить валюты из ЦБ');
      });
  }, []);

  const onChangeFromCurrency = (cur) => {
    setFromCurrency(cur);
    inputFrom(cur);
  };

  const onChangeToCurrency = (cur) => {
    setToCurrency(cur);
    inputTo(cur);
  };

  function inputFrom(event) {
    let valueInp;
    if (typeof event === 'Event') {
      valueInp = event.target.value;
    } else {
      valueInp = event;
    }

    //console.log(rates['Valute'][fromCurrency].Value);
    const price = +valueInp / +rates['Valute'][fromCurrency].Value;
    console.log(price);
    const result = +price * +rates['Valute'][toCurrency].Value;
    console.log(result);
    setHowManyFrom(valueInp);
    setHowManyTo(result);
  }

  function inputTo(event) {
    let valueInp;
    if (typeof event === 'Event') {
      valueInp = event.target.value;
    } else {
      valueInp = event;
    }

    const result =
      (+rates['Valute'][fromCurrency].Value / +rates['Valute'][toCurrency].Value) * +valueInp;

    console.log(result);
    setHowManyFrom(result);
    setHowManyTo(valueInp);
  }

  return (
    <div className="App">
      <Block
        value={howManyFrom}
        currency={fromCurrency}
        onChangeCurrency={onChangeFromCurrency}
        onChangeValue={inputFrom}
      />
      <Block
        value={howManyTo}
        currency={toCurrency}
        onChangeCurrency={onChangeToCurrency}
        onChangeValue={inputTo}
      />
    </div>
  );
}

export default App;

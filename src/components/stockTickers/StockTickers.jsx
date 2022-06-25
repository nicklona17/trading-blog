import './stockTickers.css';
import { useEffect, useState } from 'react';
import protobuf from 'protobufjs';
const { Buffer } = require('buffer/');

const dirSymbol = {
  '': '',
  'up': '▲',
  'down': '▼',
}

function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

function StockTickers() {
  const [stocks, setStocks] = useState([]);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ws = new WebSocket('wss://streamer.finance.yahoo.com');
    protobuf.load('./YPricingData.proto', (error, root) => {
      if (error) {
        return console.log(error);
      }
      const Yaticker = root.lookupType('yaticker');

      ws.onopen = function open() {
        console.log('connected');
        ws.send(
          JSON.stringify({
            subscribe: 'QQQ,SPY,AAPL,MSFT,META,TSLA,AMZN,GOOGL'
              .split(',')
              .map((symbol) => symbol.toUpperCase())
          })
        );
      };

      ws.onclose = function close() {
        console.log('disconnected');
      };

      ws.onmessage = function incoming(message) {
        const next = Yaticker.decode(new Buffer(message.data, 'base64'));
        setStocks((current) => {
          let stock = current.find((stock) => stock.id === next.id);
          if (stock) {
            return current.map((stock) => {
              if (stock.id === next.id) {
                return {
                  ...next,
                  direction:
                    stock.price < next.price
                      ? 'up'
                      : stock.price > next.price
                      ? 'down'
                      : stock.direction,
                };
              }
              return stock;
            });
          } else {
            return [
              ...current,
              {
                ...next,
                direction: '',
              },
            ];
          }
        });
      };
    });
  }, []);

  return (
    <div className="stocks">
      {stocks.map((stock) => (
        <div className="stock" key={stock.id}>
          <h2 className={stock.direction}>
            {stock.id} {formatPrice(stock.price)} {dirSymbol[stock.direction]}
          </h2>
        </div>
      ))}
    </div>
  );
}

export default StockTickers;
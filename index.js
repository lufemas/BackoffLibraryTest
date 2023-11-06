import { backOff } from "exponential-backoff";

const connect = () => {
  console.log('Connect');

  throw new Error('Connection Error');

  return false
}

let count = 0;
setInterval(() => {
  console.log(++count)
}, 1000)

function getWeather() {
  return fetch("weather-endpoint");
}

function retryfn (e, attemptNumber) {
    console.log('Failed connecting, attemptNumber:', attemptNumber)
    console.log('Failed connecting, Error:', e)

  return true;

  }

async function main() {
  try {
    const response = await backOff(() => connect(),
     {
       retry: retryfn,
       timeMultiple: 10
     }
    );
    console.log('response: ', response)
  } catch (error) {
    console.log('CATCH ERROR: ', error);
  }
}

main();
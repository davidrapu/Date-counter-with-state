import { useState } from "react";
import "./styles.css";

export default function App() {
  const [stepNum, setStepNum] = useState(1);
  const [count, setCount] = useState(1);
  const [extraDays, setExtraDays] = useState(1);
  const [date, setDate] = useState(new Date());
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  function increaseCount(step) {
    setCount((c) => {
      const newCount = c + step;

      setExtraDays((ed) => Math.abs(newCount));

      setDate(() => {
        const newDate = new Date();
        newDate.setDate(newDate.getDate() + newCount);
        return newDate;
      });

      return newCount;
    });
  }
  function reduceCount(step) {
    setCount((c) => {
      const newCount = c - step;

      setExtraDays((ed) => Math.abs(newCount));

      setDate(() => {
        const newDate = new Date();
        newDate.setDate(newDate.getDate() + newCount);
        return newDate;
      });
      return newCount;
    });
  }
  function handleStepChange(e) {
    setStepNum(Number(e.target.value));
  }
  function handleCountChange(e) {
    setCount(() => {
      const count = Number(e.target.value);

      setExtraDays((ed) => Math.abs(count));

      setDate(() => {
        const newDate = new Date();
        newDate.setDate(newDate.getDate() + count);
        return newDate;
      });
      return count;
    });
  }
  function handleResetButton() {
    setStepNum(1);
    setCount(() => {
      setExtraDays(1);
      setDate(new Date());
      return 1;
    });
  }
  return (
    <div className="App">
      <div className="container">
        <span>
          <input
            type="range"
            value={stepNum}
            min={0}
            max={20}
            onChange={handleStepChange}
          />
          Step: {stepNum}
        </span>
      </div>

      <div className="container">
        <button onClick={() => reduceCount(stepNum)}>-</button>
        <span>
          <input type="number" value={count} onChange={handleCountChange} />
        </span>
        <button onClick={() => increaseCount(stepNum)}>+</button>
      </div>

      <div>
        {count === 0 ? (
          <>Today is {date.toLocaleDateString("en-US", options)}</>
        ) : (
          <>
            {extraDays} {Math.abs(count) > 1 ? "Days" : "Day"}{" "}
            {count < 0 ? "ago was" : "from today is"}{" "}
            {date.toLocaleDateString("en-US", options)}
          </>
        )}
      </div>
      {count != 1 || stepNum != 1 ? (
        <button onClick={handleResetButton}>Reset</button>
      ) : (
        ""
      )}
    </div>
  );
}

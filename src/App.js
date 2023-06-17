import React from "react";
import "./App.css";
import WindowTracker from "./WindowTracker";
import Dice from "./Dice";
import { nanoid } from "nanoid";
// import Confetti from "react-confetti"

function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValues = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValues) {
      setTenzies(true);
      console.log("You Won");
    }
  }, [dice]);

  function generateNewDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDice());
    }
    return newDice;
  }

  const [show, setShow] = React.useState(true);

  function onToggle() {
    setShow((prevShow) => !prevShow);
  }

  //----------------------------
  const [starWarsData, setStarWarsData] = React.useState({});
  const [count, setCount] = React.useState(1);

  console.log("Component rendered");

  //side effects
  React.useEffect(
    function () {
      console.log("Effect ran");

      // side effects
      fetch(`https://swapi.dev/api/people/${count}`)
        .then((res) => res.json())
        .then((data) => setStarWarsData(data));
    },
    [count]
  ); // the dependency array limit the no of time , that this useEffect will run
  //--------------------------

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((dice) => {
        return dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice;
      })
    );
  }

  const diceElements = dice.map((dice) => (
    <Dice
      key={dice.id}
      value={dice.value}
      isHeld={dice.isHeld}
      holdDice={() => holdDice(dice.id)}
    />
  ));
  function rollDice() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((dice) => {
          return dice.isHeld ? dice : generateNewDice();
        })
      );
    } else{
      setTenzies(false)
      setDice(allNewDice())
    }
  }

  return (
    <div>
      <div className="dice-body">
        <main>
          {/* {tenzies && <Confetti />} */}
          <div className="dice-container">{diceElements}</div>
          <button className="roll-btn" onClick={rollDice}>
            {tenzies ? "New Game" : "Roll"}
          </button>
        </main>
      </div>
      ----------------------------------
      <pre>{JSON.stringify(starWarsData, null, 2)}</pre>
      <h2>The count is {count}</h2>
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>
        Add
      </button>
      <br /> <br />
      -----------------------
      <br /> <br />
      <button onClick={onToggle}>Toggle Windows Tracker</button>
      {show && <WindowTracker />}
    </div>
  );
}

export default App;

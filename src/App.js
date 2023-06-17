import React from "react";
import "./App.css";
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
    } else {
      setTenzies(false);
      setDice(allNewDice());
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
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
const { log } = console;
function App() {
  function generateNewDie () {
    const randomValue = Math.ceil(Math.random() * 6);
    return{
      value: randomValue,
      isHeld: false,
      id: nanoid()
    }
  }
  function allNewDice() {
    const newDice = [];
    for (let index = 0; index < 10; index++) {
      newDice.push(generateNewDie());
    }
   
    return newDice;
  }
  const [diceValue, setDiceValue] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false)
  useEffect(()=>{
    const allHeld = diceValue.every(die => die.isHeld)
    const firstValue = diceValue[0].value
    const allSameValue = diceValue.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
    }
  },[diceValue])
  const holdDice = (id) =>{
    setDiceValue(prevDice => prevDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }
  const newValue = diceValue.map(newDiceValue => <Die value = {newDiceValue.value} key = {newDiceValue.id} isHeld={newDiceValue.isHeld} holdDice = {()=> holdDice(newDiceValue.id)}/>)
  const rollDice = () =>{
    if(!tenzies){
      setDiceValue(prevDice => prevDice.map(die => {
        return die.isHeld ? die : generateNewDie()
      }))
    }else{
      setTenzies(false)
      setDiceValue(allNewDice())
    }
   
  }
 
  return (
    <>
      <main>
        {tenzies && <Confetti/>}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice-container">
         {newValue}
        </div>
        <button className="roll-dice" onClick={rollDice}>{tenzies ? 'New Game' : 'Roll Dice'}</button>
      </main>
    </>
  );
}

export default App;

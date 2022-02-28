import React, {useEffect, useState, useRef} from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import GameRow from './GameRow';
import Keyboard from '../Keyboard';
import HintPanel from '../HintPanel/HintPanel';
import styled from 'styled-components';

import {
  generateNewGameboardState,
  resetLetterByIndex,
  addRowToGameboard,
  charIndexExists,
  rowIsFull,
  getLastRowGreens
} from './GameBoardHelpers';

function GameBoard({word, showHints, setWordLength, ...props}){
    const scrollRef = useRef(null)
    const executeScroll = () => scrollRef.current.scrollIntoView()    

    useEffect( () => {
      window.addEventListener("keydown", keydownHandler);
      return () => {
        window.removeEventListener("keydown", keydownHandler);
      }
    })
    
    const [gameboardState, setGameboardState] = useState( generateNewGameboardState(word) )

    useEffect(()=>{ // add a row if full
      if( !rowIsFull(gameboardState, gameboardState.rows - 1 ) ) return

      if( didWinRound(gameboardState) ){
        wonRound()
        return
      }
      
      const newGameboard = addRowToGameboard(gameboardState)
      setGameboardState({
        ...newGameboard,
        activeLetter: `row-${newGameboard.rows-1}__slot-0`})
        
      executeScroll()
    },[gameboardState])

    useEffect( ()=>{
      setGameboardState( generateNewGameboardState(word) )
    },[word])

    function didWinRound(gameboardState){
      return getLastRowGreens(gameboardState).length === gameboardState.slots 
    }

    function wonRound(){
      alert(`YOU WIN! The word was ${word}`)
      setWordLength(word.length + 1)
    }
    
    function iterateStatus(number, pressedKey){
      // if hints are on, iterate through the statuses
      if(showHints === true){
        const max = 3;
        return number < max ? number+1 : 0;
      }else{
        // check the statuses
        const wordSlot = gameboardState.activeLetter.split("-")[2] // get the last char of the key
        if(word[wordSlot] === pressedKey){
            // they match, set status to 3, green
            return 3
        } else if( word.indexOf(pressedKey) !== -1 ) {
          // the letter is in a dfferent slot, set status to 2, yellow
            return 2
        } else { // the letter is not in the word,  set status to 1, gray
          return 1
        }
      }
    }

    const setActiveLetter = (key) => {
      setGameboardState({...gameboardState, activeLetter: key})
    }

    function indexOfActiveLetter(){
      return gameboardState.chars.filter( c => c.key === gameboardState.activeLetter)[0].index;
    }

    function nextActiveLetter(){
      const i = indexOfActiveLetter()
      if(!charIndexExists(gameboardState, i+1)) return 
      setActiveLetter(gameboardState.chars[i+1].key)
    }

    function prevActiveLetter(){
      const i = indexOfActiveLetter()
      if(!charIndexExists(gameboardState, i-1)) return 
      setActiveLetter(gameboardState.chars[i-1].key)
    }
    function prevActiveRow(){
      const i = indexOfActiveLetter()
      if(!charIndexExists(gameboardState, i - gameboardState.slots )) return 
      setActiveLetter(gameboardState.chars[i-gameboardState.slots].key)
    }
    
    function nextActiveRow(){
      const i = indexOfActiveLetter()
      if(!charIndexExists(gameboardState, i + gameboardState.slots)) return 
      setActiveLetter(gameboardState.chars[i+gameboardState.slots].key)
    }

    function resetActiveLetter(){
      const i = indexOfActiveLetter()
      const newGameboardState = resetLetterByIndex(gameboardState, i)
      setGameboardState(newGameboardState)
    }


    function keydownHandler( {repeat, key: pressedKey} ){
      if(repeat) return
      console.log("hello", pressedKey, word)

      switch(true){
        case pressedKey === " ":
        case pressedKey === "Tab":
        case pressedKey === "ArrowRight" :
          nextActiveLetter()
          return;
        case pressedKey === "ArrowLeft":
          prevActiveLetter()
          return;
        case pressedKey === "ArrowDown":
          nextActiveRow()
          return;
        case pressedKey === "ArrowUp":
          prevActiveRow()
          return;
        case pressedKey === "Backspace":
        case pressedKey === "Delete":
        case pressedKey === "⌫":
          resetActiveLetter()
          return;
        case !pressedKey.match(/^[a-zA-Z]{1}$/):
          return;
        default:
          break;
      }
      
      const activeChar = getActiveChar(gameboardState)
      const newGameboard = setCharToLetter(gameboardState, activeChar, pressedKey)
      setGameboardState({...newGameboard})
      nextActiveLetter()
    }


    const setCharToLetter = (gameboard, char, letter) =>{
      letter = letter.toLowerCase()
      
      const newChar = char;
      newChar.letter = letter
      newChar.status = iterateStatus( newChar.status, letter )  
      gameboard.chars[newChar.index] = newChar;

      return gameboard
    }

    const getActiveChar = (gameboard) => {
      const [activeChar] = gameboard.chars.filter(c => c.key === gameboardState.activeLetter);
      return activeChar
    }

    return (
      <GameBoardContainer id="GameBoardContainer">
          {/* {word} */}
          { showHints === true &&
            <HintPanel 
              gameboardState={gameboardState}
            />  
          }
          
          { 
            Array(gameboardState.rows).fill(0).map(
              (e,i)=>{
                return <GameRow 
                  key={`gameRow-${i}`}
                  gameboardState={gameboardState}
                  setActiveLetter={setActiveLetter}
                  gameRow={i}
                i/>
              })
          }

          <Keyboard 
            scrollRef={scrollRef}
            gameboardState={gameboardState}
            keydownHandler={keydownHandler}
          />
          <FooterScrollRef ref={scrollRef} />
      </GameBoardContainer>
    )
}

const GameBoardContainer = styled(Container)`
`
const FooterScrollRef = styled.div`
  margin-top: 100px;
`

GameBoard.propTypes = {
  showHints: PropTypes.bool,
}

export default GameBoard
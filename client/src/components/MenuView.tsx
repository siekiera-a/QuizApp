import { useContext } from 'react';
import { gameContext } from '../GameContext';
import Game from './Game';
import QuizList from './QuizList';
import StartQuiz from './StartQuiz';

const MenuView = () => {
  const { gameStarted } = useContext(gameContext);

  return (
    <>
      {!gameStarted && (
        <>
          <QuizList />
          <StartQuiz />
        </>
      )}

      {gameStarted && <Game />}
    </>
  );
};

export default MenuView;

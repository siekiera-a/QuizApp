import React, { useContext, useState } from 'react';
import { gameContext, State } from '../GameContext';
import Game from './Game';
import QuizList from './QuizList';
import CodePanel from './CodePanel';
import Leaderboard from './Leaderboard';
import ErrorPage from './ErrorPage';

interface ILeaderboard {
  show: boolean;
  code: string;
}

const MenuView = () => {
  const { gameState, error, errorMessage } = useContext(gameContext);
  const [leaderboard, setLeaderboard] = useState<ILeaderboard>({
    show: false,
    code: '',
  });

  const showLeaderboard = (code: string) => {
    setLeaderboard({ show: true, code });
  };

  const closeLeaderboard = () => {
    setLeaderboard({ show: false, code: '' });
  };

  if (error) {
    return <ErrorPage message={errorMessage} />;
  }

  return (
    <div className={'box'}>
      {gameState === State.NotStarted && (
        <>
          {leaderboard.show ? (
            <Leaderboard
              code={leaderboard.code}
              closeLeaderboard={closeLeaderboard}
            />
          ) : (
            <>
              <QuizList />
              <CodePanel showLeaderboard={showLeaderboard} />
            </>
          )}
        </>
      )}

      {gameState === State.InProgress && <Game />}
    </div>
  );
};

export default MenuView;

import React, { useContext, useState } from 'react';
import { gameContext, State } from '../GameContext';
import Game from './Game';
import QuizList from './QuizList';
import CodePanel from './CodePanel';
import Leaderboard from './Leaderboard';
import ErrorPage from './ErrorPage';
import { Button, Dialog, makeStyles, Snackbar } from '@material-ui/core';
import CreateQuiz from './CreateQuiz';
import { ICode } from '../ResponseApiModels';
import { Alert, AlertTitle } from '@material-ui/lab';

interface ILeaderboard {
  show: boolean;
  code: string;
}

const useStyles = makeStyles({
  wrapper: {
    textAlign: 'center',
    marginTop: '20px',
  },
});

const MenuView = () => {
  const { gameState, error, errorMessage } = useContext(gameContext);
  const [leaderboard, setLeaderboard] = useState<ILeaderboard>({
    show: false,
    code: '',
  });
  const [open, setOpen] = useState(false);
  const [newCode, setNewCode] = useState('');

  const classes = useStyles();

  const showLeaderboard = (code: string) => {
    setLeaderboard({ show: true, code });
  };

  const closeLeaderboard = () => {
    setLeaderboard({ show: false, code: '' });
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleQuizCreated = (code: ICode) => {
    setNewCode(code.code);
    setOpen(false);
  };

  const handleCloseAlert = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setNewCode('');
  };

  if (error) {
    return <ErrorPage message={errorMessage} />;
  }

  return (
    <>
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
                <div className={classes.wrapper}>
                  <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    onClick={handleClick}
                  >
                    Create Quiz
                  </Button>
                </div>
                <Dialog open={open} onClose={handleClose} fullScreen>
                  <CreateQuiz
                    onClose={handleClose}
                    onCreate={handleQuizCreated}
                  />
                </Dialog>
              </>
            )}
          </>
        )}

        {gameState === State.InProgress && <Game />}
      </div>

      <Snackbar open={newCode !== ''} onClose={handleCloseAlert}>
        <Alert severity="success" onClose={handleCloseAlert}>
          <AlertTitle>Success</AlertTitle>
          Quiz created! Code: {newCode}
        </Alert>
      </Snackbar>
    </>
  );
};

export default MenuView;

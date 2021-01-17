import {
  TableRow,
  TableCell,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core';
import { IQuiz } from '../ResponseApiModels';
import { gameContext } from '../GameContext';
import { useContext } from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  })
);

const QuizRow = (prop: IQuiz) => {
  const date = new Date(prop.creationTime);
  const format = new Intl.DateTimeFormat('pl', {
    /// @ts-ignore
    timeStyle: 'short',
    dateStyle: 'short',
  });

  const classes = useStyles();

  const { startGame } = useContext(gameContext);

  return (
    <TableRow>
      <TableCell>
        <span onClick={() => startGame(prop.code)} className={classes.link}>
          {prop.code}
        </span>
      </TableCell>
      <TableCell>{prop.author}</TableCell>
      <TableCell>{format.format(date)}</TableCell>
      <TableCell>{prop.description}</TableCell>
    </TableRow>
  );
};

export default QuizRow;

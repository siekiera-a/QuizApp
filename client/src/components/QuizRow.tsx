import {
  TableRow,
  TableCell,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core';
import { IQuiz } from '../ResponseApiModels';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      color: theme.palette.text.primary,
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

  return (
    <TableRow>
      <TableCell>
        <Link to={`/play/${prop.code}/1`} className={classes.link}>
          {prop.code}
        </Link>
      </TableCell>
      <TableCell>{prop.author}</TableCell>
      <TableCell>{format.format(date)}</TableCell>
      <TableCell>{prop.description}</TableCell>
    </TableRow>
  );
};

export default QuizRow;

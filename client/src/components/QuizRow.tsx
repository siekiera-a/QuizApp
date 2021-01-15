import { TableRow, TableCell } from '@material-ui/core';
import { IQuiz } from '../ResponseApiModels';

const QuizRow = (prop: IQuiz) => {
  const date = new Date(prop.creationTime);
  const format = new Intl.DateTimeFormat('pl', {
    /// @ts-ignore
    timeStyle: 'short',
    dateStyle: 'short',
  });

  return (
    <TableRow>
      <TableCell>{prop.code}</TableCell>
      <TableCell>{prop.author}</TableCell>
      <TableCell>{format.format(date)}</TableCell>
      <TableCell>{prop.description}</TableCell>
    </TableRow>
  );
};

export default QuizRow;

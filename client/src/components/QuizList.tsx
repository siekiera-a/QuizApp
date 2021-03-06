import {
  Typography,
  Card,
  Container,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TablePagination,
  TableCell,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import { fetchApi } from '../api';

import { IGetQuiz } from '../ResponseApiModels';
import QuizRow from './QuizRow';

const useStyles = makeStyles({
  wrapper: {
    textAlign: 'center',
  },
  margin: {
    marginTop: '16px',
  },
});

const getQuizzes = async (page: number = 1): Promise<IGetQuiz | undefined> => {
  const url = `/quiz?page=${page}`;
  try {
    const data: IGetQuiz = await fetchApi<IGetQuiz>(url);
    return data;
  } catch (e) {
    console.log(e.message);
    return undefined;
  }
};

const QuizList = () => {
  const [page, setPage] = useState(1);
  const [quizzes, setQuizzes] = useState<IGetQuiz>();

  const classes = useStyles();

  useEffect(() => {
    getQuizzes(page).then((data) => setQuizzes(data));
  }, [page]);

  return (
    <Container maxWidth="md">
      <Card>
        <Typography
          align="center"
          variant="h4"
          paragraph
          className={classes.margin}
        >
          Join to game
        </Typography>

        {!quizzes ? (
          <Typography align="center" variant="h6" paragraph>
            No Quizzes found!
          </Typography>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Code</TableCell>
                    <TableCell>Author</TableCell>
                    <TableCell>Creation Time</TableCell>
                    <TableCell>Description</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {quizzes.items.map((e) => (
                    <QuizRow
                      key={e.id}
                      author={e.author}
                      code={e.code}
                      creationTime={e.creationTime}
                      description={e.description}
                      id={e.id}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              component="div"
              rowsPerPageOptions={[10]}
              rowsPerPage={10}
              page={page - 1}
              onChangePage={(e, page) => {
                setPage(page);
              }}
              count={quizzes.total}
            />
          </>
        )}
      </Card>
    </Container>
  );
};

export default QuizList;

import React from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button, TablePagination } from '@mui/material';

export type Item = {
  created_at: string;
  description: string;
  forks_count: number;
  homepage: string;
  html_url: string;
  name: string;
  pushed_at: string;
  watchers_count: number;
  id: number;
  owner: {
    login: string;
  }
}

type Props = {
  rows: Item[];
  total: number;
  page: number;
  perpage: number;
  changePage: (e: unknown, newPage: number) => void;
}

const ResultTable: React.FC<Props> = (props) => {
  const { rows, total, page, perpage, changePage } = props;

  const handleClick = (url: string) => {
    window.open(url)
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 640 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>name</TableCell>
              {/* <TableCell align="right">created_at</TableCell> */}
              <TableCell align="right">description</TableCell>
              <TableCell align="right">owner</TableCell>
              <TableCell align="right">forks_count</TableCell>
              {/* <TableCell align="right">homepage</TableCell> */}
              <TableCell align="right">watchers_count</TableCell>
              <TableCell align="right">html_url</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                {/* <TableCell align="right">{row.created_at}</TableCell> */}
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">{row.owner.login}</TableCell>
                <TableCell align="right">{row.forks_count}</TableCell>
                {/* <TableCell align="right">{row.homepage}</TableCell> */}
                <TableCell align="right">{row.watchers_count}</TableCell>
                <TableCell align="right">
                  <Button variant="contained" onClick={() => handleClick(row.html_url)}>Link</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={total}
        rowsPerPage={perpage}
        page={page}
        onPageChange={changePage}
      />
    </Paper>
  )
}

export default ResultTable;

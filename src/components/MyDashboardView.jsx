import { mockTransactions } from "./data/mockData"
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import { useState, useEffect } from "react";
import Container from '@mui/material/Container';


function Revenue() {
  const [revenue, setRevenue] = useState(0);
  const RevenuePaper = styled(Paper)(({ theme }) => ({
    width: 200,
    height: 130,
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: 'center',
  }));

  useEffect(()=>{
    try{
      async function gatherRevenue() {
        let tempSum = 0;
        for (let i = 0; i < mockTransactions.length; i++) {
          tempSum += parseFloat(mockTransactions[i].cost);
        }
        console.log(tempSum);
        setRevenue(tempSum.toFixed(2));
      }
      gatherRevenue();
    } catch (e) {
      console.error("Unable to gather books", e);
    }
  }, [])

  return(
    <RevenuePaper>
      <h3>Revenue Generated</h3> 
      <Divider />
      <h3>{`$${revenue}`}</h3>
    </RevenuePaper>
  )
}


function Transactions() {
  return (
    <TableContainer component={Paper}>
      <h3>Recent Transactions</h3>
      <Divider />
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Transaction ID </TableCell>
            <TableCell align="right">Username</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Cost</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mockTransactions.map((transaction) => (
            <TableRow
              key={transaction.txId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{transaction.txId}</TableCell>
              <TableCell align="right">{transaction.user}</TableCell>
              <TableCell align="right">{transaction.date}</TableCell>
              <TableCell align="right">${transaction.cost}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

function MyDashBoardView() {
  return (
    <Container sx={{
      py: 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center'
    }}>
      <Revenue />
      <br />
      <Transactions />
    </Container>
  )
}
export default MyDashBoardView

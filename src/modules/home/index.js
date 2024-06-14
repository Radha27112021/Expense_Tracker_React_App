import styled from "styled-components";
import OverviewComponent from "./OverviewComponent";
import TransactionComponent from "./TransactionComponent";
import React, { useEffect, useState } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 30px 0 10px;
  font-family: Montserrat;
`;

const HomeComponent = (props) => {
  const [transaction, updateTransaction] = useState([]);
  const [expense, updateExpense] = useState(0);
  const [income, updateIncome] = useState(0);

  const addTransaction = (payload) => {
    const transactionArray = [...transaction];
    transactionArray.push(payload);
    updateTransaction(transactionArray);
  };

  const deleteTransaction = (id) => {
    const updatedTransactions = transaction.filter(txn => txn.id !== id);
    updateTransaction(updatedTransactions);
  };

  const calculateBalance = () => {
    let expense = 0;
    let income = 0;
    transaction.forEach((payload) => {
      payload.type === "EXPENSE"
        ? (expense += payload.amount)
        : (income += payload.amount);
    });
    updateExpense(expense);
    updateIncome(income);
  };

  useEffect(() => calculateBalance(), [transaction]);

  return (
    <Container>
      <OverviewComponent
        addTransaction={addTransaction}
        expense={expense}
        income={income}
      />
      <TransactionComponent transaction={transaction} deleteTransaction={deleteTransaction} />
    </Container>
  );
};

export default HomeComponent;

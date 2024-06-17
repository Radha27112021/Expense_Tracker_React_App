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

const HomeComponent = () => {
  const [transaction, updateTransaction] = useState([]);
  const [expense, updateExpense] = useState(0);
  const [income, updateIncome] = useState(0);

  // Load transactions from local storage on component mount
  useEffect(() => {
    const storedTransactions = localStorage.getItem("transactions");
    if (storedTransactions) {
      const parsedTransactions = JSON.parse(storedTransactions);
      updateTransaction(parsedTransactions);
      calculateBalance(parsedTransactions);
    }
  }, []);

  // Save transactions to local storage whenever they change
  useEffect(() => {
    if (transaction.length > 0) {
      localStorage.setItem("transactions", JSON.stringify(transaction));
    }
  }, [transaction]);

  const addTransaction = (payload) => {
    const transactionArray = [...transaction, payload];
    updateTransaction(transactionArray);
    calculateBalance(transactionArray);
  };

  const deleteTransaction = (id) => {
    const updatedTransactions = transaction.filter((txn) => txn.id !== id);
    updateTransaction(updatedTransactions);
    calculateBalance(updatedTransactions);
  };

  const calculateBalance = (transactions) => {
    let expense = 0;
    let income = 0;
    transactions.forEach((payload) => {
      payload.type === "EXPENSE"
        ? (expense += payload.amount)
        : (income += payload.amount);
    });
    updateExpense(expense);
    updateIncome(income);
  };

  return (
    <Container>
      <OverviewComponent
        addTransaction={addTransaction}
        expense={expense}
        income={income}
      />
      <TransactionComponent
        transaction={transaction}
        deleteTransaction={deleteTransaction}
      />
    </Container>
  );
};

export default HomeComponent;

import styled from "styled-components";
import { useEffect, useState } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px 22px;
  font-size: 18px;
  gap: 10px;
  width: 100%;
  font-family: Montserrat;
  font-weight: bold;
  & input {
    padding: 10px 20px;
    border-radius: 12px;
    background: #e6e8e9;
    border: 1px solid #e6e8e9;
    outline: none;
    width: 97%;
  }
`;

const Cell = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 15px;
  font-size: 14px;
  border-radius: 2px;
  align-items: center;
  width: 100%;
  font-weight: normal;
  justify-content: space-between;
  border: 2px solid #e6e8e9;
  border-radius: 5px;
  border-right: 4px solid ${(props) => (props.isExpense ? "red" : "green")};
  background: #f9f9f9;
`;

const DeleteButton = styled.button`
  background: red;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
`;

const TransactionCell = ({ payload, deleteTransaction }) => {
  return (
    <Cell isExpense={payload.type === "EXPENSE"}>
      <span>{payload.desc}</span>
      <span>${payload.amount}</span>
      <DeleteButton onClick={() => deleteTransaction(payload.id)}>
        Delete
      </DeleteButton>
    </Cell>
  );
};

const TransactionComponent = ({ transaction, deleteTransaction }) => {
  const [searchText, updateSearchText] = useState("");
  const [filteredTransaction, updateTxn] = useState(transaction);

  const filterData = (searchText) => {
    if (!searchText || !searchText.trim().length) {
      updateTxn(transaction);
      return;
    }
    let txn = [...transaction];
    txn = txn.filter((payload) =>
      payload.desc.toLowerCase().includes(searchText.toLowerCase().trim())
    );
    updateTxn(txn);
  };

  useEffect(() => filterData(searchText), [transaction]);

  return (
    <Container>
      Transactions
      <input
        placeholder="Search"
        value={searchText}
        onChange={(e) => updateSearchText(e.target.value)}
      />
      {filteredTransaction?.map((payload) => (
        <TransactionCell
          key={payload.id}
          payload={payload}
          deleteTransaction={deleteTransaction}
        />
      ))}
    </Container>
  );
};

export default TransactionComponent;

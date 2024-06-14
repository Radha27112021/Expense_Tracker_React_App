import styled from "styled-components";
import HomeComponent from "./modules/home";
import './App.css';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Montserrat;
  width: 360px;
  position: relative;
  padding-top: 60px;
`;

const Header = styled.span`
  color: black;
  font-size: 35px;
  font-weight: bold;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 0;
  width: 100%;
  text-align: center;
`;

function App() {
  return (
    <Container>
      <Header>Expense Tracker</Header>
      <HomeComponent />
    </Container>
  );
}

export default App;

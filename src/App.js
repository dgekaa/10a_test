import "./App.css";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { Home } from "./pages";

const Container = styled.div``;

const App = () => {
  return (
    <Container>
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
    </Container>
  );
};

export default App;

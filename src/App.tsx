import React, { useState } from "react";
import { Header } from "./components/Header";
import { Dashboard } from "./components/Dashboard";
import { GlobalStyle } from "./styles/global";
import Modal from "react-modal"
import { NewTransactionModal } from "./components/NewTransactionModal";
import { TransactionContext, TransactionsProvider } from "./TransactionContext";

Modal.setAppElement('#root');

function App() {

  const [isNewTransactionModal, setIsNewTransactionModal] = useState(false);

  function handleOpenNewTransactionModal(){
      setIsNewTransactionModal(true);
  }

  function handleCloseNewTransactionModal(){
      setIsNewTransactionModal(false);
  }

  return (
    <TransactionsProvider>
      <GlobalStyle />
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal}/>
      <Dashboard />
      <NewTransactionModal isOpen={isNewTransactionModal} onRequestClose={handleCloseNewTransactionModal}/>
    </TransactionsProvider>
  );
}

export default App;

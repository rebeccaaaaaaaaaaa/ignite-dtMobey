import React, { FormEvent, useState, useContext } from "react";
import Modal from "react-modal";
import { Container, TransactionTypeContainer, RadioBox } from "./styles";
import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import { api } from "../../services/api";
import { useTransactions } from "../../hooks/useTransactions";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  const [type, setType] = useState("deposit");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();
    
   await createTransaction({
      title,
      amount,
      category,
      type
    })

    setTitle("");
    setAmount(0);
    setCategory("");
    setType("deposit");
    onRequestClose();
    
  }

  const {createTransaction} = useTransactions();

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button className="react-modal-close">
        <img src={closeImg} alt="close" onClick={onRequestClose} />
      </button>
      <Container onSubmit={handleCreateNewTransaction}>
        <h1> Cadatro transação</h1>
        <input type="text" placeholder="Título" value={title} onChange={event => setTitle(event.target.value)}/>
        <input type="number" placeholder="Valor" value={amount} onChange={event => setAmount(Number(event.target.value))}/>       

        <TransactionTypeContainer>
          <RadioBox type="button" onClick={() => setType("deposit")} isActive={type === "deposit"} activeColor="green">
            <img src={incomeImg} alt="income" />
            <span> Entrada </span>
          </RadioBox>
          <RadioBox type="button" onClick={() => setType("withdraw")} isActive={type === "withdraw"} activeColor="red">
            <img src={outcomeImg} alt="outcome" />
            <span> Saída </span>
          </RadioBox>
        </TransactionTypeContainer>

        <input type="text" placeholder="Categoria" value={category} onChange={event => setCategory(event.target.value)}/>
        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}

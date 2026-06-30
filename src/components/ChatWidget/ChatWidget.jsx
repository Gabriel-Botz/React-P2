import { useEffect, useRef, useState } from "react";
import styles from "./ChatWidget.module.css";
import { sendChatMessage } from "../../services/api";

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Oi, detetive! Posso te ajudar com dicas de como jogar.",
    },
  ]);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isLoading) {
      inputRef.current?.focus();
    }
  }, [isLoading, isOpen]);

  async function handleSendMessage() {
    const message = input.trim();
    if (!message || isLoading) return;

    const userMessage = { role: "user", content: message };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const reply = await sendChatMessage(message);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: reply || "Não recebi resposta. Tente novamente.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Não consegui acessar a central de ajuda agora. Tente novamente em instantes.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  }

  return (
    <div className={styles.chatRoot}>
      {isOpen && (
        <section className={styles.chatPanel} aria-label="Chat de ajuda">
          <header className={styles.chatHeader}>
            <div>
              <p className={styles.chatTitle}>Central de Ajuda</p>
              <small className={styles.chatSubtitle}>Guia do detetive</small>
            </div>
            <button
              type="button"
              className={styles.closeButton}
              onClick={() => setIsOpen(false)}
              aria-label="Minimizar chat"
            >
              x
            </button>
          </header>

          <div className={styles.messagesContainer}>
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`${styles.messageBubble} ${
                  message.role === "user" ? styles.userMessage : styles.assistantMessage
                }`}
              >
                {message.content}
              </div>
            ))}
            {isLoading && <div className={styles.typing}>Digitando...</div>}
            <div ref={messagesEndRef} />
          </div>

          <div className={styles.inputRow}>
            <textarea
              ref={inputRef}
              className={styles.chatInput}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Digite sua dúvida sobre o jogo..."
              rows={2}
            />
            <button
              type="button"
              className={styles.sendButton}
              onClick={handleSendMessage}
              disabled={isLoading || !input.trim()}
            >
              Enviar
            </button>
          </div>
        </section>
      )}

      {!isOpen && (
        <button
          type="button"
          className={styles.toggleButton}
          onClick={() => setIsOpen(true)}
          aria-label="Abrir chat de ajuda"
        >
          Ajuda
        </button>
      )}
    </div>
  );
}

export default ChatWidget;

# 🔍 The Last Clue

> Plataforma interativa de investigação criminal onde você assume o papel de um detetive e precisa descobrir o verdadeiro culpado de um assassinato.

---

## 📋 Sobre o Projeto

**The Last Clue** é uma aplicação web desenvolvida em React onde o usuário analisa suspeitos, investiga pistas, consulta depoimentos e reúne evidências para solucionar um caso de assassinato. O sistema conta com geração dinâmica de casos via **Groq API** e um backend próprio em **Node/Express**.

---

## 🛠️ Tecnologias Utilizadas

**Frontend**
- React
- React Router Dom
- Axios
- React Icons
- React Toastify
- Context API

**Backend**
- Node.js
- Express
- Groq API

---

## 📁 Estrutura do Projeto

```
the-last-clue/
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── context/
│       ├── services/
│       ├── routes/
│       ├── assets/
│       ├── styles/
│       └── hooks/
└── backend/
    ├── .env
    └── ...
```

---

## ⚙️ Pré-requisitos

Antes de começar, certifique-se de ter instalado na sua máquina:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/)
- Uma chave de API válida da [Groq](https://console.groq.com/)

---

## 🚀 Como Rodar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/the-last-clue.git
cd the-last-clue
```

---

### 2. Configure o Backend

#### 2.1. Acesse a pasta do backend

```bash
cd backend
```

#### 2.2. Instale as dependências

```bash
npm install
```

#### 2.3. Configure as variáveis de ambiente

Crie um arquivo `.env` dentro da pasta `backend/` com o seguinte conteúdo:

```env
GROQ_API_KEY=sua_chave_aqui
```

> 💡 Você pode obter sua chave gratuita em [console.groq.com](https://console.groq.com/)

#### 2.4. Inicie o servidor

```bash
npm start
```

O backend estará rodando em: **http://localhost:5000**

---

### 3. Configure o Frontend

Abra um **novo terminal** e, a partir da raiz do projeto:

#### 3.1. Acesse a pasta do frontend

```bash
cd frontend
```

#### 3.2. Instale as dependências

```bash
npm install
```

#### 3.3. Inicie a aplicação

```bash
npm run dev
```

O frontend estará disponível em: **http://localhost:5173**

---

## 🎮 Como Jogar

1. **Tela Inicial** — Leia o resumo do caso e clique em "Iniciar Investigação"
2. **Suspeitos** — Explore a lista de suspeitos e investigue cada um
3. **Perfil do Suspeito** — Analise motivo, álibi e evidências relacionadas; marque suspeitos como *Investigado*, *Inocente* ou *Principal Suspeito*
4. **Pistas** — Descubra evidências físicas, objetos e relatórios desbloqueados progressivamente
5. **Depoimentos** — Consulte testemunhas e cruce as informações
6. **Acusação Final** — Selecione o culpado quando tiver certeza
7. **Resultado** — Descubra se você solucionou o caso!

---

## 🔌 Endpoints da API

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/suspects` | Lista todos os suspeitos |
| GET | `/clues` | Lista todas as pistas |
| GET | `/witnesses` | Lista todas as testemunhas |
| POST | `/accusation` | Envia a acusação final |

**Payload da acusação:**
```json
{
  "suspectId": 3,
  "result": "completed"
}
```

---

## 🧩 Funcionalidades

- [x] Exibição do caso com resumo do crime
- [x] Listagem e perfil detalhado de suspeitos
- [x] Sistema de pistas desbloqueadas progressivamente
- [x] Sistema de depoimentos de testemunhas
- [x] Marcação de suspeitos (Investigado / Inocente / Principal Suspeito)
- [x] Barra de progresso da investigação
- [x] Ranking de suspeitos por nível de suspeita
- [x] Acusação final com feedback de resultado
- [x] Geração dinâmica de casos via Groq API

---

## 👥 Equipe

Desenvolvido como projeto acadêmico na disciplina de React — **SerraTec / Universidade Veiga de Almeida**.

---

## 📄 Licença

Este projeto é de uso acadêmico.

# 🕵️ The Last Clue

> Plataforma interativa de investigação criminal desenvolvida em React.  
> Trabalho em grupo — SerraTec | Residência em Tecnologia

---

## 📖 Sobre o Projeto

**The Last Clue** é um jogo de detetive onde o usuário assume o papel de investigador responsável por solucionar um caso de assassinato. O jogador analisa suspeitos, coleta pistas, consulta depoimentos e realiza a acusação final com base nas evidências reunidas.

O sistema utiliza geração dinâmica de casos via **Groq API** e demonstra na prática os principais conceitos de React estudados durante a disciplina: componentização, gerenciamento de estado, Context API, React Router, consumo de APIs e renderização condicional.

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Uso |
|---|---|
| React | Framework principal |
| React Router Dom | Navegação entre páginas |
| Axios | Requisições HTTP |
| React Icons | Ícones da interface |
| React Toastify | Feedback visual (notificações) |
| Context API | Estado global da investigação |
| Node.js + Express | Backend e geração de casos |
| Groq API | Geração dinâmica de casos com IA |

---

## 🗂️ Estrutura de Pastas

```
the-last-clue/
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── Header/
│       │   ├── Footer/
│       │   ├── SuspectCard/
│       │   ├── ClueCard/
│       │   ├── WitnessCard/
│       │   ├── ProgressBar/
│       │   ├── Loading/
│       │   └── Modal/
│       ├── pages/
│       │   ├── Home/
│       │   ├── Suspects/
│       │   ├── SuspectDetails/
│       │   ├── Clues/
│       │   ├── Witnesses/
│       │   ├── Accusation/
│       │   └── Result/
│       ├── context/
│       │   └── InvestigationContext.jsx
│       ├── services/
│       │   └── api.js
│       ├── routes/
│       │   └── AppRoutes.jsx
│       ├── assets/
│       │   ├── images/
│       │   └── icons/
│       └── styles/
└── backend/
    ├── .env         ← criar manualmente (não commitar)
    └── ...
```

---

## ⚙️ Pré-requisitos

Antes de começar, certifique-se de ter instalado na sua máquina:

- [Node.js](https://nodejs.org/) v18 ou superior
- [npm](https://www.npmjs.com/)
- Uma chave de API válida da [Groq](https://console.groq.com/) (gratuita)

---

## 🚀 Como Rodar o Projeto

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd the-last-clue
```

---

### 2. Configure e inicie o Backend

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

> 💡 Obtenha sua chave gratuita em [console.groq.com](https://console.groq.com/)  
> ⚠️ Nunca commite o arquivo `.env` no GitHub. Ele já deve estar no `.gitignore`.

#### 2.4. Inicie o servidor

```bash
npm start
```

✅ Backend rodando em: **http://localhost:5000**

---

### 3. Configure e inicie o Frontend

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

✅ Frontend disponível em: **http://localhost:5173**

---

> ⚠️ **Importante:** o backend precisa estar rodando antes de iniciar o frontend, caso contrário as requisições vão falhar.

---

## 🎮 Como Jogar

```
Home → Suspects → SuspectDetails → Clues → Witnesses → Accusation → Result
```

1. **Tela Inicial** — Leia o resumo do caso e clique em "Iniciar Investigação"
2. **Suspeitos** — Explore a lista de suspeitos e clique em "Investigar" em cada um
3. **Perfil do Suspeito** — Analise motivo, álibi e evidências; marque como *Investigado*, *Inocente* ou *Principal Suspeito*
4. **Pistas** — Descubra evidências físicas, objetos e relatórios desbloqueados progressivamente
5. **Depoimentos** — Consulte testemunhas e cruze as informações com os suspeitos
6. **Acusação Final** — Selecione o culpado quando tiver certeza (botão liberado após progresso mínimo)
7. **Resultado** — Descubra se você solucionou o caso!

---

## 🌐 Endpoints da API

| Método | Endpoint | Descrição |
|---|---|---|
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

## 🌍 Context API — InvestigationContext

Estado global centralizado da investigação:

```json
{
  "user": {},
  "selectedSuspect": {},
  "cluesFound": [],
  "progress": 0,
  "accusation": null
}
```

---

## 👥 Divisão de Tarefas

### 👤 Membro 1 — Setup & Infraestrutura
**Responsabilidade:** Base do projeto. Tudo começa aqui.

- [ ] Criar o projeto com `create-react-app` ou `vite`
- [ ] Instalar dependências (`axios`, `react-router-dom`, `react-icons`, `react-toastify`)
- [ ] Criar estrutura de pastas (`components/`, `pages/`, `context/`, `services/`, `routes/`)
- [ ] Configurar `api.js` com `axios.create` e `baseURL`
- [ ] Criar `AppRoutes.jsx` com todas as rotas definidas
- [ ] Criar o `InvestigationContext.jsx` com estado inicial e Provider
- [ ] Configurar o `App.jsx` com Provider + Router + Toastify
- [ ] Criar o `README.md` no repositório
- [ ] Subir estrutura base no GitHub e criar branches para cada membro

---

### 👤 Membro 2 — Layout Global (Header, Footer, ProgressBar, Loading)
**Responsabilidade:** Componentes compartilhados que aparecem em todas as telas.

- [ ] Componente `Header` com navegação principal entre as páginas
- [ ] Componente `Footer` com informações do projeto/grupo
- [ ] Componente `Loading` para exibir durante requisições (`useState` + renderização condicional)
- [ ] Componente `ProgressBar` consumindo o `progress` do Context e exibindo porcentagem visual
- [ ] Estilização geral: dark mode, paleta de cores (preto, cinza escuro, branco, vermelho escuro)
- [ ] Importar e configurar fontes e estilos globais

---

### 👤 Membro 3 — Página Home & Página Result
**Responsabilidade:** Primeira e última tela do fluxo — a entrada e a conclusão do jogo.

**Home:**
- [ ] Exibir nome do caso e resumo do crime
- [ ] Botão "Iniciar Investigação" que navega para `/suspects`
- [ ] Layout temático com atmosfera de investigação criminal

**Result:**
- [ ] Consumir resultado da acusação via Context
- [ ] Renderização condicional: mensagem de acerto ou erro
- [ ] Exibir resumo da investigação (suspeito acusado, pistas encontradas)
- [ ] Botão para reiniciar o jogo (limpar Context e voltar para Home)

---

### 👤 Membro 4 — Página Suspects & Componente SuspectCard
**Responsabilidade:** Listagem de suspeitos com requisição GET.

- [ ] Requisição `GET /suspects` com Axios usando `useEffect`
- [ ] Estado de loading e erro com renderização condicional
- [ ] Renderizar lista de `SuspectCard` com as informações recebidas
- [ ] Componente `SuspectCard`: foto, nome, profissão e botão "Investigar"
- [ ] Navegar para `/suspects/:id` ao clicar em "Investigar"
- [ ] Sistema de ranking visual de suspeita (ex: Carlos - 90%, João - 45%)

---

### 👤 Membro 5 — Página SuspectDetails & Modal de Acusação
**Responsabilidade:** Perfil completo de cada suspeito e confirmação da acusação.

**SuspectDetails:**
- [ ] Receber `id` via `useParams`
- [ ] Buscar dados do suspeito pelo id (filtrar do Context ou nova requisição)
- [ ] Exibir: nome, profissão, motivo, álibi, evidências relacionadas
- [ ] Botões para marcar suspeito como: **Investigado**, **Inocente**, **Principal Suspeito**
- [ ] Atualizar o Context com o status do suspeito

**Modal:**
- [ ] Componente `Modal` de confirmação da acusação
- [ ] Exibir nome do suspeito selecionado antes de confirmar
- [ ] Botões "Confirmar" e "Cancelar"

---

### 👤 Membro 6 — Página Clues & Componente ClueCard
**Responsabilidade:** Sistema de pistas com desbloqueio progressivo.

- [ ] Requisição `GET /clues` com Axios usando `useEffect`
- [ ] Estado de loading e erro com renderização condicional
- [ ] Componente `ClueCard`: exibir evidências físicas, objetos e relatórios
- [ ] Sistema de desbloqueio progressivo: pistas bloqueadas exibem visual diferente
- [ ] Usuário pode marcar pistas como **relevantes** (salvar no Context)
- [ ] Atualizar `cluesFound` e `progress` no Context ao desbloquear pista
- [ ] Toast de feedback ao encontrar uma nova pista

---

### 👤 Membro 7 — Página Witnesses, Accusation & Componente WitnessCard
**Responsabilidade:** Depoimentos de testemunhas e envio da acusação final.

**Witnesses:**
- [ ] Requisição `GET /witnesses` com Axios usando `useEffect`
- [ ] Componente `WitnessCard`: nome da testemunha e depoimento
- [ ] Destacar visualmente depoimentos que contradizem suspeitos
- [ ] Estado de loading e erro com renderização condicional

**Accusation:**
- [ ] Listar suspeitos para seleção final
- [ ] Botão de acusação visível **somente** após progresso mínimo (renderização condicional)
- [ ] Abrir `Modal` de confirmação ao clicar em acusar
- [ ] Requisição `POST /accusation` ao confirmar: `{ suspectId, result: "completed" }`
- [ ] Salvar resultado no Context e navegar para `/result`
- [ ] Toast de feedback: "Acusação enviada!" ou "Erro ao enviar acusação"

---

## 🌿 Fluxo de Git

### Branches
```
main           ← código estável, só recebe via Pull Request
dev            ← branch de integração do grupo
feature/nome   ← branch individual de cada membro
```

### Passo a Passo

```bash
# 1. Clonar o repositório
git clone <url-do-repositorio>
cd the-last-clue

# 2. Criar sua branch a partir da dev
git checkout dev
git checkout -b feature/seu-nome

# 3. Trabalhar e commitar
git add .
git commit -m "feat: descrição do que foi feito"

# 4. Enviar para o GitHub
git push origin feature/seu-nome

# 5. Abrir Pull Request: feature/seu-nome → dev
```

### Convenção de Commits
```
feat:     nova funcionalidade
fix:      correção de bug
style:    mudanças de estilo/CSS
refactor: refatoração de código
docs:     documentação
```

---

## 📋 Ordem de Desenvolvimento Recomendada

```
Semana 1
├── Membro 1: Setup completo do projeto e infraestrutura
├── Membro 2: Header, Footer, Loading, ProgressBar
└── Membros 3-7: Estudar o PRD e preparar lógica das suas telas

Semana 2
├── Membro 4: Página Suspects + SuspectCard (depende do api.js do M1)
├── Membro 6: Página Clues + ClueCard (depende do api.js do M1)
└── Membro 7: Página Witnesses (depende do api.js do M1)

Semana 3
├── Membro 3: Home + Result (depende do Context do M1)
├── Membro 5: SuspectDetails + Modal (depende do M4)
└── Membro 7: Accusation + POST (depende do M5)

Semana 4
└── Todos: Integração, ajustes, testes e apresentação
```

---

## ✅ Checklist de Entrega

- [ ] Todas as 7 páginas funcionais
- [ ] Todas as rotas configuradas
- [ ] `GET /suspects`, `GET /clues`, `GET /witnesses` funcionando
- [ ] `POST /accusation` funcionando
- [ ] `InvestigationContext` centralizado e funcionando
- [ ] Componentização aplicada
- [ ] Renderização condicional (loading, erro, bloqueios)
- [ ] Dark mode aplicado
- [ ] Aplicação responsiva
- [ ] Fluxo completo: Home → ... → Result operacional

---

## 👨‍💻 Grupo

| Membro | Responsabilidade |
|---|---|
| Membro 1 | Setup & Infraestrutura |
| Membro 2 | Layout Global |
| Membro 3 | Home & Result |
| Membro 4 | Suspects & SuspectCard |
| Membro 5 | SuspectDetails & Modal |
| Membro 6 | Clues & ClueCard |
| Membro 7 | Witnesses, Accusation & WitnessCard |

---

*Projeto desenvolvido durante a Residência em Tecnologia — SerraTec | Universidade Veiga de Almeida*

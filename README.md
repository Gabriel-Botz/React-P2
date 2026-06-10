# 🕵️ The Last Clue

> Plataforma interativa de investigação criminal desenvolvida em React.  
> Trabalho em grupo — SerratTec | Residência em Tecnologia

---

## 📖 Sobre o Projeto

**The Last Clue** é um jogo de detetive onde o usuário assume o papel de investigador responsável por solucionar um caso de assassinato. O jogador analisa suspeitos, coleta pistas, consulta depoimentos e realiza a acusação final com base nas evidências reunidas.

O projeto demonstra na prática os principais conceitos de React estudados durante a disciplina: componentização, gerenciamento de estado, Context API, React Router, consumo de APIs e renderização condicional.

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

---

## 🗂️ Estrutura de Pastas

```
src/
├── components/
│   ├── Header/
│   ├── Footer/
│   ├── SuspectCard/
│   ├── ClueCard/
│   ├── WitnessCard/
│   ├── ProgressBar/
│   ├── Loading/
│   └── Modal/
├── pages/
│   ├── Home/
│   ├── Suspects/
│   ├── SuspectDetails/
│   ├── Clues/
│   ├── Witnesses/
│   ├── Accusation/
│   └── Result/
├── context/
│   └── InvestigationContext.jsx
├── services/
│   └── api.js
├── routes/
│   └── AppRoutes.jsx
├── assets/
│   ├── images/
│   └── icons/
└── styles/
```

---

## 🔀 Fluxo da Aplicação

```
Home → Suspects → SuspectDetails → Clues → Witnesses → Accusation → Result
```

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

- [v] Criar o projeto com `create-react-app` ou `vite`
- [ ] Instalar dependências (`axios`, `react-router-dom`, `react-icons`, `react-toastify`)
- [v] Criar estrutura de pastas (`components/`, `pages/`, `context/`, `services/`, `routes/`)
- [ ] Configurar `api.js` com `axios.create` e `baseURL`
- [x] Criar `AppRoutes.jsx` com todas as rotas definidas
- [x] Criar o `InvestigationContext.jsx` com estado inicial e Provider
- [ ] Configurar o `App.jsx` com Provider + Router + Toastify
- [v] Criar o `README.md` no repositório
- [v] Subir estrutura base no GitHub e criar branches para cada membro

---

### 👤 Membro 2 — Layout Global (Header, Footer, ProgressBar, Loading)
**Responsabilidade:** Componentes compartilhados que aparecem em todas as telas.

- [x] Componente `Header` com navegação principal entre as páginas
- [x] Componente `Footer` com informações do projeto/grupo
- [ ] Componente `Loading` para exibir durante requisições (`useState` + renderização condicional)
- [x] Componente `ProgressBar` consumindo o `progress` do Context e exibindo porcentagem visual
- [x] Estilização geral: dark mode, paleta de cores (preto, cinza escuro, branco, vermelho escuro)
- [x] Importar e configurar fontes e estilos globais

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

*Projeto desenvolvido durante a Residência em Tecnologia — SerratTec*

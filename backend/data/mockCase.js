const mockCase = {
  case: {
    id: "case-001",
    title: "O Último Indício",
    description: "Um empresário foi encontrado morto em sua cobertura.",
  },

  suspects: [],

  witnesses: [
    {
      id: 1,
      name: "Pedro Albuquerque",
      role: "Bartender",
      testimony: "Lucas Ferreira saiu do bar às 21:15 bastante nervoso.",
      isContradictory: true,
    },

    {
      id: 2,
      name: "Sofia Ramos",
      role: "Secretária",
      testimony: "Amanda Ribeiro permaneceu na galeria durante toda a noite.",
      isContradictory: false,
    },
  ],

  clues: [],

  solution: {},
};

export default mockCase;

export const getRandomDateLastDays = (days: number): Date => {
  const now = new Date();
  const randomDays = Math.floor(Math.random() * days); // Gera um número aleatório entre 0 e days

  // Subtrai os dias da data atual
  now.setDate(now.getDate() - randomDays);
  return now;
};

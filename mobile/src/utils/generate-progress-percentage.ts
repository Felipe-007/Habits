//gera o calculo da barra de porcentagem, calculo do progresso
export function generateProgressPercentage(total: number, completed: number){  //cria o total e o completed, sendo que eles poderão receber somente numeros
  return Math.round((completed / total) * 100);
}
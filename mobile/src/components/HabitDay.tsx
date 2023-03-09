//Tarefas
import { TouchableOpacity, Dimensions, TouchableOpacityProps } from "react-native";
import { generateProgressPercentage } from "../utils/generate-progress-percentage";  //calculo do progresso
import clsx from "clsx";
import dayjs from "dayjs";

const WEEK_DAYS = 7;
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;

export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE = (Dimensions.get('screen').width / WEEK_DAYS) - (SCREEN_HORIZONTAL_PADDING + 5)  //divide a largura da tela pelos dias da semana

interface Props extends TouchableOpacityProps {
  amountOfHabits?: number;
  amountCompleted?: number;
  date: Date;
};

export function HabitDay({ amountOfHabits = 0, amountCompleted = 0, date, ...rest }: Props) {  //HabtiDay são os quadrados, ...rest pega todas as propriedades do TouchableOpacityProps

  const amountAccomplishedPercentage = amountOfHabits > 0 ? generateProgressPercentage(amountOfHabits, amountCompleted) : 0;  //se amountOfHabits for maior que 0 calcula a porcentagem, se nao devolve o valor 0
  const today = dayjs().startOf('day').toDate();  //pega o inicio do dia e converte ele para uma data
  const isCurrentDay = dayjs(date).isSame(today);  //compara se o today é o mesmo da data atual

  return (
    <TouchableOpacity
      className={clsx('rounded-lg border-2 m-1', {
        ['bg-zinc-900 border-zinc-800']: amountAccomplishedPercentage === 0,
        ['bg-violet-200 border-violet-100']:
          amountAccomplishedPercentage > 0 && amountAccomplishedPercentage < 20,
        ['bg-violet-400 border-violet-200']:
          amountAccomplishedPercentage >= 20 &&
          amountAccomplishedPercentage < 40,
        ['bg-violet-500 border-violet-400']:
          amountAccomplishedPercentage >= 40 &&
          amountAccomplishedPercentage < 60,
        ['bg-violet-600 border-violet-500']:
          amountAccomplishedPercentage >= 60 &&
          amountAccomplishedPercentage < 80,
        ['bg-violet-900 border-violet-800']: amountAccomplishedPercentage >= 80,
        ['border-white border-4']: isCurrentDay,
      })}
      style={{ width: DAY_SIZE, height: DAY_SIZE }}
      activeOpacity={0.7}
      {...rest}
    />
  )
}
//Tarefas
import { TouchableOpacity, Dimensions, TouchableOpacityProps } from "react-native";

const WEEK_DAYS = 7;
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;

export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE = (Dimensions.get('screen').width / WEEK_DAYS) - (SCREEN_HORIZONTAL_PADDING + 5)  //divide a largura da tela pelos dias da semana

interface Props extends TouchableOpacityProps { };

export function HabtiDay({ ...rest }: Props) {  //HabtiDay são os quadrados, ...rest pega todas as propriedades do TouchableOpacityProps
  return (
    <TouchableOpacity
      className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800"
      style={{ width: DAY_SIZE, height: DAY_SIZE }}
      activeOpacity={0.7}
      {...rest}
    >
    </TouchableOpacity>
  )
}
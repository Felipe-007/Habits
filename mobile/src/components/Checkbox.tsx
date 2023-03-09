//Icone marcado ou desmarcado
import { View, TouchableOpacity, Text, TouchableOpacityProps } from "react-native";  //TouchableOpacityProps acessa as propriedades do TouchableOpacity
import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";

interface Props extends TouchableOpacityProps {
  title: string;
  checked?: boolean;
}

export function Checkbox({ title, checked = false, ...rest }: Props) {  //checked começa como falso, ...rest pega todas as propriedades do TouchableOpacityProps
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="flex-row mb-2 items-center"
      {...rest}
    >
      {
        checked  //se o checked estiver marcado cai aqui
          ?
          <Animated.View
            className="h-8 w-8 bg-green-500 rounded-lg items-center justify-center"
            entering={ZoomIn}  //faz a animação de zoom na entrada
            exiting={ZoomOut}  //faz a animação de zoom na saída
          >
            <Feather
              name="check"
              size={20}
              color={colors.white}
            />
          </Animated.View>
          :  //se o checked não estiver marcado cai aqui
          <View className="h-8 w-8 bg-zinc-900 rounded-lg" />
      }

      <Text className="text-white text-base ml-3 font-semibold">
        {title}
      </Text>
    </TouchableOpacity>
  )
}
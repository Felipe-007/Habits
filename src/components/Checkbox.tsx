//Icone marcado ou desmarcado
import { View, TouchableOpacity, Text, TouchableOpacityProps } from "react-native";  //TouchableOpacityProps acessa as propriedades do TouchableOpacity
import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';

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
          <View className="h-8 w-8 bg-green-500 rounded-lg items-center justify-center">
            <Feather
              name="check"
              size={20}
              color={colors.white}
            />
          </View>
          :  //se o checked não estiver marcado cai aqui
          <View className="h-8 w-8 bg-zinc-900 rounded-lg" />
      }

      <Text className="text-white text-base ml-3">
        {title}
      </Text>
    </TouchableOpacity>
  )
}
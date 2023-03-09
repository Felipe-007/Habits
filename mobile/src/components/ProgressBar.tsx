//barra de progresso
import { useEffect } from "react";
import { View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

interface Props {
  progress?: number;
}

export function ProgressBar({ progress = 0 }: Props) {
  const sharedProgress = useSharedValue(progress);  //transforma o progresso em animado

  //estilo animado
  const style = useAnimatedStyle(() => {
    return{
      width: `${sharedProgress.value}%`
    }
  })

  //sempre que o progresso mudar, mudará tbem a barra de progresso
  useEffect(() => {
    sharedProgress.value = withTiming(progress);  //withTiming é a animação mais suave
  }, [progress])

  return (
    <View className="w-full h-3 rounded-xl bg-zinc-700 mt-4">
      <Animated.View
        className="h-3 rounded-xl bg-violet-600"
        style={style}  //a largura será de acordo com o numero de elementos na tela
      />
    </View>
  )
}
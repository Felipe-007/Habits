//Detalhes do habito
import { View, ScrollView, Text } from "react-native";
import { useRoute } from "@react-navigation/native";  //pega os parametros da rota
import { BackButton } from "../components/BackButton";
import dayjs from "dayjs";  //define o portugues como padrão
import { ProgressBar } from "../components/ProgressBar";
import { Checkbox } from "../components/Checkbox";

interface Params {
  date: string;
}

export function Habit() {

  const route = useRoute();
  const { date } = route.params as Params;  //pega a data
  //alert(date) //mostra a data

  const parsedDate = dayjs(date)  //converte a data para o dayjs
  const dayOfWeek = parsedDate.format('dddd');  //mostra os dias da semana
  const dayAndMonth = parsedDate.format('DD/MM')  //mostra os dias

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView  //Habitos
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >

        <BackButton />

        <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
          {dayOfWeek}
        </Text>

        <Text className="text-white font-extrabold text-3xl">
          {dayAndMonth}
        </Text>

        <ProgressBar progress={30} />

        <View className="mt-6">
          <Checkbox
            title="Beber 2l de água"
            checked={false}
          />

          <Checkbox
            title="Caminhar"
            checked={true}
          />
        </View>
      </ScrollView>
    </View>
  )
}
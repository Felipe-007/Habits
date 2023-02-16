//tela principal
import { View, Text, ScrollView } from "react-native";
import { Header } from "../components/Header";
import { HabtiDay, DAY_SIZE } from "../components/HabtiDay";  //HabtiDay são os quadrados
import generateRangeDatesFromYearStart from "../utils/generate-range-between-dates";  //gera o intervalo de datas, contando a partir do primeiro dia do ano ate hoje

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];  //dias da semana
const datesFromYearStart = generateRangeDatesFromYearStart();  //dias gerados
const minimumSummaryDatesSizes = 18 * 5;
const amountOfDaysToFill = minimumSummaryDatesSizes - datesFromYearStart.length

export function Home() {
  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />

      <View className="flex-row mt-6 mb-2">
        {
          weekDays.map((weekDays, i) => (  //percore o dias da semana
            <Text
              key={`${weekDays}-${i}`}  //mostra os dias da semana, identificando eles pelo i
              className="text-zinc-400 text-xl font-bold text-center mx-1"
              style={{ width: DAY_SIZE }}  //pega o estilo do HabtiDay.tsx
            >
              {weekDays}
            </Text>
          ))
        }
      </View>


      <ScrollView  //Habitos
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >

        <View className="flex-row flex-wrap">
          {
            datesFromYearStart.map(date => (
              <HabtiDay
                key={date.toISOString()}
              />
            ))
          }

          {
            amountOfDaysToFill > 0 && Array
              .from({ length: amountOfDaysToFill })
              .map((_, index) => (
                <View
                  key={index}
                  className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                  style={{ width: DAY_SIZE, height: DAY_SIZE }}
                />
              ))
          }
        </View>
      </ScrollView >
    </View >
  )
}
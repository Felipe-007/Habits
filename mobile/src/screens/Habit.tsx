//Detalhes do habito
import { useState, useEffect } from "react";
import { View, ScrollView, Text, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";  //pega os parametros da rota
import { BackButton } from "../components/BackButton";
import dayjs from "dayjs";  //define o portugues como padrão
import { ProgressBar } from "../components/ProgressBar";
import { Checkbox } from "../components/Checkbox";
import { Loading } from "../components/Loading";
import { api } from "../lib/axios";
import { generateProgressPercentage } from "../utils/generate-progress-percentage";  //calculo do progresso
import { HabitEmpty } from "../components/HabitEmpty";  //caso não exista nenhum hábito, hábito vazio
import clsx from "clsx";

interface Params {
  date: string;
}

//define as propriedades que dayInfo poderá ter
interface DayInfoProps {
  completedHabits: string[];
  possibleHabits: {
    id: string;
    title: string;
  }[];
}

export function Habit() {

  const [loading, setLoading] = useState(true);
  const [dayInfo, setDayInfo] = useState<DayInfoProps | null>(null);  //armazena as informações do hábito, pegando o tipo que foi definido em DayInfoProps, | null = ou poderá ser tbem nulo
  const [completedHabits, setCompletedHabits] = useState<string[]>([]);  //armazena os hábitos completados
  const route = useRoute();
  const { date } = route.params as Params;  //pega a data
  //alert(date) //mostra a data

  const parsedDate = dayjs(date)  //converte a data para o dayjs
  const isDateInPast = parsedDate.endOf('day').isBefore(new Date());  //verifica se a data já passou
  const dayOfWeek = parsedDate.format('dddd');  //mostra os dias da semana
  const dayAndMonth = parsedDate.format('DD/MM')  //mostra os dias
  const habitsProgress = dayInfo?.possibleHabits.length ? generateProgressPercentage(dayInfo.possibleHabits.length, completedHabits.length) : 0;  //calcula a barra de progresso, dayInfo.possibleHabits.length = quantos habitos existem

  //Busca os hábitos
  async function fetchHabits() {
    try {
      setLoading(true);

      const response = await api.get('/day', { params: { date } });
      setDayInfo(response.data);  //guarda os dados da resposta
      setCompletedHabits(response.data.completedHabits);  //armazena os hábitos completados

    } catch (error) {
      console.log(error);
      Alert.alert('Ops', 'Não foi possível carregar as informações dos hábitos.')
    }
    finally {
      setLoading(false);  //desativa o loading
    }
  }

  //verifica se esta marcado ou nao
  async function handleToggleHabit(habitId: string) {
    if (completedHabits.includes(habitId)) {
      setCompletedHabits(prevState => prevState.filter(habit => habit !== habitId));
    } else {
      setCompletedHabits(prevState => [...prevState, habitId]);
    }
  }

  //é montado assim que a aplicação abrir
  useEffect(() => {
    fetchHabits();
  }, []);

  //se a os hábitos não estiverem carregados, irá mostrar o loading do Loading.tsx
  if (loading) {
    return (
      <Loading />
    )
  }

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

        <ProgressBar progress={habitsProgress} />

        <View className={clsx("mt-6", {
          ["opacity-50"] : isDateInPast
        })}>
          {
            //verifica se existe hábitos
            dayInfo?.possibleHabits ?
              dayInfo?.possibleHabits.map(habit => (
                <Checkbox
                  key={habit.id}
                  title={habit.title}
                  checked={completedHabits.includes(habit.id)}  //verifica se o hábito esta completado
                  disabled={isDateInPast}  //a data já passou
                  onPress={() => handleToggleHabit(habit.id)}  ////verifica se esta marcado ou nao
                />
              ))
              : <HabitEmpty />  //caso não exista nenhum hábito, hábito vazio
          }

          {
            //verifica se a data já passou
            isDateInPast && (
              <Text className="text-white mt-10 text-center">
                Você não pode editar hábitos de uma data passada
              </Text>
            )
          }
        </View>
      </ScrollView>
    </View>
  )
}
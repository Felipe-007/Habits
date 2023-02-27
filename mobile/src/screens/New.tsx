//Cadastrar hábito
import { View, ScrollView, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";
import { useState } from "react";
import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';
import { api } from "../lib/axios";  //conexão com o servidor

const availableWeekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']

export function New() {

  const [weekDays, setWeekDays] = useState<number[]>([]);  //useState sera um numero, com o valor inicial de uma lista vazia
  const [title, setTitle] = useState('');  //guarda o titulo

  //marca ou desmarca o icone
  function handleToggleWeekDay(weekDayIndex: number) {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex));
    } else {
      setWeekDays(prevState => [...prevState, weekDayIndex])
    }
  }

  //criando novo habito
  async function handleCreateNewHabit() {
    try {
      if (!title.trim() || weekDays.length === 0) {  //se o titulo for vazio ou não selecionar o dia, cai aqui, .trim() não conta os espaços vazios
        return Alert.alert('Novo hábito', 'Informe o nome do novo hábito.')
      }

      await api.post('/habits', { title, weekDays });  //envia as informações para o backend

      setTitle('');
      setWeekDays([]);
      Alert.alert('Novo hábito.', 'Hábito criado com sucesso.')

    } catch (error) {
      console.log(error);
      Alert.alert('Ops', 'Não foi possível criar um novo hábito.')
    }
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <BackButton />

        <Text className="mt-6 text-white font-extrabold text-3xl">
          Criar hábito
        </Text>

        <Text className="mt-6 text-white font-semibold text-base">
          Qual o seu comprometimento?
        </Text>

        <TextInput
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600"
          placeholder="Exercícios, dormir bem, etc..."
          placeholderTextColor={colors.zinc[400]}
          onChangeText={setTitle}  //guarda o texto
          value={title}
        />

        <Text className="font-semibold mt-4 mb-3 text-white text-base">
          Qual a sua recorrência?
        </Text>

        {  //aqui gera cada dia da semana
          availableWeekDays.map((weekDay, index) => (
            <Checkbox
              key={weekDay}
              title={weekDay} //title vem do components/Checkbox.tsx, recebendo os dias de availableWeekDays
              onPress={() => handleToggleWeekDay(index)}  //onPress vem da config do extends TouchableOpacityProps
              checked={weekDays.includes(index)}
            />
          ))
        }

        <TouchableOpacity
          activeOpacity={0.7}
          className="flex-row w-full h-14 items-center justify-center bg-green-600 rounded-md mt-6"
          onPress={handleCreateNewHabit}  //cria um novo hábito
        >

          <Feather
            name="check"
            size={20}
            color={colors.white}
          />

          <Text className="font-semibold text-base text-white ml-2">
            Confirmar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}
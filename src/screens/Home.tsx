import { ExerciseCard } from '@components/ExerciseCard';
import { Group } from '@components/Group';
import { HomeHeader } from '@components/HomeHeader';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import {  VStack, HStack, FlatList, Text, Heading} from 'native-base';
import React, { useState } from 'react';

export function Home() {
  const [ groups, SetGroups] = useState(['Ombro', 'Costas', 'Pernas', 'Triceps', 'Biceps'])
  const [ groupSelected, SetGroupSelected ] = useState('Ombro');
  const [exercises, setExercises] = useState(['Puxada frontal', 'Remada curvada', 'Remada unilateral', 'Levantamento terras']);

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleOpenExerciseDetails() {
    navigation.navigate('exercise')

  }

  return (
    <VStack flex={1}>
        <HomeHeader />

        <FlatList
          data={groups}
          keyExtractor={ item => item }
          renderItem={( { item } ) => (
            <Group
              name={item}
              isActive={groupSelected.toLocaleUpperCase() === item.toLocaleUpperCase()}
              onPress={() => SetGroupSelected(item)}
            />
          )}
          horizontal
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{px:8}}
          my={10}
          maxH={10}
        />

      <VStack flex={1} px={ 8 }>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.100" fontSize="md">
              Exercicios
          </Heading>
          <Text color="gray.100" fontSize="md">
            {exercises.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <ExerciseCard
              onPress={handleOpenExerciseDetails}
            />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ paddingBottom:20}}
        />

        

           

      </VStack>
    
  </VStack>
  );
}
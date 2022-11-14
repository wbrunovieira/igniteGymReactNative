import { Group } from '@components/Group';
import { HomeHeader } from '@components/HomeHeader';
import {  VStack, HStack, FlatList, Text, Heading} from 'native-base';
import React, { useState } from 'react';

export function Home() {
  const [ groups, SetGroups] = useState(['Ombro', 'Costas', 'Pernas', 'Triceps', 'Biceps'])
  const [ groupSelected, SetGroupSelected ] = useState('Costas');

  return (
    <VStack flex={1}>
    <HomeHeader />

    <FlatList
      data={groups}
      keyExtractor={ item => item }
      renderItem={( { item } ) => (
        <Group
          name={item}
          isActive={groupSelected === item }
          onPress={() => SetGroupSelected(item)}
        />
      )}
      horizontal
      showsVerticalScrollIndicator={false}
      _contentContainerStyle={{px:8}}
      my={10}
      maxH={10}
    />
  <VStack flex={1} px={8  }>
    <HStack justifyContent="space-between" mb={5}>
      <Heading color="gray.100" fontSize="md">
          Exercicios
      </Heading>
      <Text color="gray.100" fontSize="md">
        4
      </Text>
    </HStack>


  </VStack>
    
  </VStack>
  );
}
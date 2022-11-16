import { useState } from 'react';
import { TouchableOpacity } from 'react-native';

import { Center, ScrollView, Text, VStack, Skeleton, Heading } from 'native-base';

import * as ImagePicker from 'expo-image-picker'

import { ScreenHeader } from '@components/ScreenHeader';
import { UserPhoto } from '@components/UserPhoto';
import { Input } from '@components/Input';
import { Button } from '@components/Button';



const PHOTO_SIZE = 33


export function Profile() {

  const [ photoIsLoading, setPhotoIsLoading ] = useState(false)
  const [ userPhoto, setUserPhoto ] = useState<string>('https://github.com/wbrunovieira.png')

  async function handleUserPhotoSelect(){
    
    setPhotoIsLoading(true)

    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes:ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect:[4 , 4],
        allowsEditing: true,
        
      });
  
      if(photoSelected.canceled){
        
        return;
      }
      
  
      setUserPhoto(photoSelected.assets[0].uri)
      
    } catch (error) {
      console.log(error)
    } finally {
      setPhotoIsLoading(false)
    }
    
  }

  return (
    <ScrollView>
      <VStack>
        <ScreenHeader title="Perfil"/>

        <ScrollView contentContainerStyle={{ paddingBottom: 36 }} >
          <Center mt={6} px={10}>
            { photoIsLoading ? <Skeleton
                                  w={PHOTO_SIZE}
                                  h={PHOTO_SIZE}
                                  rounded="full"
                                  startColor="gray.500"
                                  endColor="gray.400"
                                  /> :

            <UserPhoto
                source={{ uri: userPhoto}}
                alt="foto do usuário"
                size={33}
            />
            }

            <TouchableOpacity onPress={handleUserPhotoSelect}>
              <Text 
                color="green.500"
                fontWeight="bold"
                fontSize="sm"
                mt={2}
                mb={8}
                >
                Alterar foto
              </Text>
            </TouchableOpacity>

            <Input
              bg="gray.600"
              placeholder="Nome"
            />
            <Input
              bg="gray.600"
              placeholder="bruno@email.com"
              isDisabled
            />
          </Center>

          <Center px={10} mt={6} >
              <Heading
                color="gray.200"
                fontSize="md"
                mb={2}
                alignSelf="flex-start"
                mt={6}
                >
                  Alterar a Senha
              </Heading>

              <Input
                bg="gray.600"
                placeholder="Senha Antiga"
                secureTextEntry
              />

              <Input
                bg="gray.600"
                placeholder="Nova Senha"
                secureTextEntry
              />
              <Input
                bg="gray.600"
                placeholder="Confirme a Nova Senha"
                secureTextEntry
              />

              <Button
                title="Atualizar"
                mt={4}
                mb={8}
              />
          </Center>
        </ScrollView>
      </VStack>
    </ScrollView>
  );
}
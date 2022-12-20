import { useState } from 'react';
import {  TouchableOpacity } from 'react-native';

import { Center, ScrollView, Text, VStack, Skeleton, Heading, useToast } from 'native-base';

import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'

import { ScreenHeader } from '@components/ScreenHeader';
import { UserPhoto } from '@components/UserPhoto';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { useAuth } from '@hooks/useAuth';
import { Controller, useForm } from 'react-hook-form';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const PHOTO_SIZE = 33

type FormDataProps = {
  name: string;
  email: string;
  oldPassword: string;
  password: string;
  confirm_password: string;
}

const profileSchema = yup.object({
  name: yup.string().required('Informe o nome'),
  password: yup.string().min(6, 'A senha deve ter pelo menos 6 dígitos.').nullable().transform((value) => !!value ? value : null),
  confirm_password: yup.string().nullable().transform((value) => !!value ? value : null).oneOf([yup.ref('password'), null], 'A confirmação de senha não confere.').when('password',{
    is:(Field: any) => Field,
    then: yup.string().nullable().required('Informe a confirmação da nova senha').transform((value) => !!value ? value : null)
  }),
})



export function Profile() {

const [ photoIsLoading, setPhotoIsLoading ] = useState(false)
const [ userPhoto, setUserPhoto ] = useState<string>('https://github.com/wbrunovieira.png')

const toast = useToast()
const { user } = useAuth();
const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({ 
  defaultValues: { 
    name: user.name,
    email: user.email
  },
  resolver: yupResolver(profileSchema) 
});

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
      
      if(photoSelected.assets[0].uri){

        const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri)

        if(photoInfo.size && (photoInfo.size / 1024 / 1024) > 1){

          return toast.show({
            title:"Imagem muito grande, selecione uma menor que 3MB",
            placement: 'top',
            bgColor:'red.500',
            paddingTop: 5,
            paddingBottom: 5,
            fontSize: 20
          })
          

        }

        setUserPhoto(photoSelected.assets[0].uri)

      }
  
      
    } catch (error) {

      console.log(error)

    } finally {

      setPhotoIsLoading(false)
    }
    
  }

  async function handleProfileUpdate(data: FormDataProps) {
    console.log(data);
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

            <Controller 
            control={control}
            name="name"
            render={({ field: { value, onChange } }) => (
              <Input 
                bg="gray.600" 
                placeholder='Nome'
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller 
            control={control}
            name="email"
            render={({ field: { value, onChange } }) => (
              <Input 
                bg="gray.600" 
                placeholder="E-mail"
                isDisabled
                onChangeText={onChange}
                value={value}
              />
            )}
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

              <Controller 
                control={control}
                name="oldPassword"
                render={({ field: {  onChange } }) => (
              <Input
                bg="gray.600"
                placeholder="Senha Antiga"
                secureTextEntry
                onChangeText={onChange}
              />
            )}
          />



          <Controller 
            control={control}
            name="password"
            render={({ field: { onChange } }) => (
              <Input 
                bg="gray.600"
                placeholder="Nova senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />


          <Controller 
            control={control}
            name="confirm_password"
            render={({ field: { onChange } }) => (
              <Input 
                bg="gray.600"
                placeholder="Confirme a nova senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.confirm_password?.message}
              />
            )}
          />
              

              <Button
                title="Atualizar"
                mt={4}
                mb={8}
                onPress={handleSubmit(handleProfileUpdate)}
              />
          </Center>
        </ScrollView>
      </VStack>
    </ScrollView>
  );
}
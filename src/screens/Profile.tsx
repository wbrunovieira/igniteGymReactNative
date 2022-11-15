import { useState } from 'react';

import { Center, ScrollView, Text, VStack, Skeleton } from 'native-base';

import { ScreenHeader } from '@components/ScreenHeader';
import { UserPhoto } from '@components/UserPhoto';
import { TouchableOpacity } from 'react-native';

const PHOTO_SIZE = 33

export function Profile() {
  const [ photoIsLoading, SetPhotoIsLoading ] = useState(false)

  return (
    <VStack>
      <ScreenHeader title="Perfil"/>

      <ScrollView>
        <Center mt={6} px={10}>
          { photoIsLoading ? <Skeleton
                                w={PHOTO_SIZE}
                                h={PHOTO_SIZE}
                                rounded="full"
                                startColor="gray.500"
                                endColor="gray.400"
                                /> :

          <UserPhoto
              source={{ uri: 'https://github.com/wbrunovieira.png'}}
              alt="foto do usuário"
              size={33}
          />
          }
          <TouchableOpacity>
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
        </Center>
      </ScrollView>
    </VStack>
  );
}
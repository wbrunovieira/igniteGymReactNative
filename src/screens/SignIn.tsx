import { useNavigation } from "@react-navigation/native";

import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import { VStack, Image, Text, Center, Heading, ScrollView } from "native-base";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

import BackgroundImg from '@assets/background.png';

import LogoSvg from '@assets/logo.svg';

export function SignIn() {

  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  function handleNewAccount(){
    navigation.navigate('signUp')
  }

  return (

    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <VStack flex={1}  px={10} pb={16}>
        <Image 
          source={BackgroundImg}
          alt="Pessoas treinando"
          resizeMode="contain"
          position="absolute"
        />
        <Center my={24}>

        <LogoSvg />
          <Text color="gray.100" fontSize="sm">

            Treine sua mente e o seu corpo.
          </Text>
        </Center>

        <Center>
              <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">

                  Acesse a sua conta
              </Heading>

              <Input
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"

              />
              
              <Input
              placeholder="Senha"
              secureTextEntry
              />

              <Button title="Acessar" />
        </Center>

        <Center mt={24}>
            <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
              Ainda não tem acesso?
            </Text>
          </Center>
              <Button
               title="Criar conta"
                variant="outline"
                onPress={handleNewAccount}
                />


      </VStack>
    </ScrollView>
  );
}
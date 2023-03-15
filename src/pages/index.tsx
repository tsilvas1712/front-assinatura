/* eslint-disable jsx-a11y/alt-text */
import {Input} from "@/components/Form/Input";
import {AuthContext} from "@/Context/AuthContext";
import {withSSRGuest} from "@/utils/withSSRGuest";
import {Flex, Button, Stack, Image, Link, Text} from "@chakra-ui/react";
import {GetServerSideProps} from "next";
import {redirect} from "next/dist/server/api-utils";
import {parseCookies} from "nookies";
import {FormEvent, useContext, useState} from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const {signIn} = useContext(AuthContext);
  
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const data = {
      email,
      password,
    };
    await signIn(data);
  }
  
  return (
    <Flex w="100vw" h="100vh" alignItems="center" justifyContent="center">
      <Flex
        boxShadow="lg"
        as="form"
        width="100%"
        maxWidth={360}
        bg="white"
        px="4"
        py="4"
        borderRadius={8}
        flexDir="column"
        justifyItems="center"
        onSubmit={handleSubmit}
      >
        <Flex
          maxWidth={300}
          width="100%"
          justifyContent="center"
          alignItems="center"
        >
          <Image src="/assets/img/logo_seize.png" w="60%"/>
        </Flex>
        <Stack spacing="4">
          <Input
            name="email"
            label="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            name="password"
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" mt="6" colorScheme="blue">
            Entrar
          </Button>
          <Flex direction="column" justify="center" align="center">
            <Text as="b">Deseja Contratar um Plano de Assinatura?</Text>
          <Link href="https://lifewall.art/plano-de-assinatura/" color="blue.300">Clique Aqui!</Link>
          </Flex>
          
        </Stack>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
  
  return {
    props: {}
  }
})

/* eslint-disable jsx-a11y/alt-text */
import { Input } from "@/components/Form/Input";
import { withSSRGuest } from "@/utils/withSSRGuest";
import { Button, Flex, Heading, Image, Stack } from "@chakra-ui/react";
import { FormEvent, useState } from "react";

export default function Home() {
  const [name,setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const data = {
      name,
      email,
      password,

    };

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
          <Flex direction="column" alignItems="center" mb="4">
          <Image src="/assets/img/logo_seize.png" w="60%"/>
          <Heading as="h4" size="lg">Cadastro de Usuário</Heading>
          </Flex>
        </Flex>
        <Stack spacing="4">
          <Input
            name="name"
            label="Nome Completo"
            type="text"
            value={name}
            onChange={(e) => setEmail(e.target.value)}
          />
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
          <Input
            name="password"
            label="Confirme a sua senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" mt="6" colorScheme="blue">
            Entrar
          </Button>
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

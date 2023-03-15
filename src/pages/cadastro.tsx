/* eslint-disable jsx-a11y/alt-text */
import { Input } from "@/components/Form/Input";
import { api } from "@/services/api";
import { withSSRGuest } from "@/utils/withSSRGuest";
import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { redirect } from "next/navigation";
import { FormEvent, useState } from "react";
import { useForm, Controller } from "react-hook-form";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, handleSubmit, control } = useForm();
  const toast = useToast();

  async function handleSignIn(values) {
    const { name, email, password } = values;

    await api
      .post("/users", { name, email, password })
      .then((res) => {
        console.log(res.status);
        toast({
          title: "Cadastro Efetuado com Sucesso",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });

        window.location.href = " https://lifewall.art/plano-de-assinatura/";
      })
      .catch((err) => {
        toast({
          title: "Erro ao Cadastrar",
          description: "Verifique as informações digitadas",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      });
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
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Flex
          maxWidth={300}
          width="100%"
          justifyContent="center"
          alignItems="center"
        >
          <Flex direction="column" alignItems="center" mb="4">
            <Image src="/assets/img/logo_seize.png" w="60%" />
            <Heading as="h4" size="lg">
              Cadastro de Usuário
            </Heading>
          </Flex>
        </Flex>
        <Stack spacing="4">
          <Input
            name="name"
            label="Nome Completo"
            type="text"
            {...register("name")}
          />
          <Input
            name="email"
            label="E-mail"
            type="email"
            {...register("email")}
          />
          <Input
            name="password"
            label="Senha"
            type="password"
            {...register("password")}
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
    props: {},
  };
});

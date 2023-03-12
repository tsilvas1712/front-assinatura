/* eslint-disable react/jsx-key */
import { Input } from "@/components/Form/Input";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { api } from "@/services/api";
import { withSSRSig } from "@/utils/withSSRSig";
import { Box, Button, Flex, HStack, Text, useToast } from "@chakra-ui/react";
import { FormEvent, useEffect, useState } from "react";

type CreateAddressFormData = {
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  zip: string;
  city: string;
  state: string;
};

export default function Profile() {
  const [user, setUser] = useState([]);
  const [plan, setPlan] = useState([]);
  const [address, setAddress] = useState([]);
  const [newAddress, setNewAddress] = useState<CreateAddressFormData>();

  const toast = useToast();

  function handleCreateAddress(e) {
    const data = { ...newAddress };
    data[e.target.id] = e.target.value;
    setNewAddress(data);
  }

  function submitAddress(e) {
    e.preventDefault();
    console.log("Address", newAddress);
    api
      .post("address", newAddress)
      .then((res) => {
        console.log(res);
        toast({
          title: "Endereço Cadastrado com Sucesso",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Erro ao Cadastrar Endereço",
          description: "Verifique as informações digitadas",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      });
  }

  useEffect(() => {
    api
      .get("/profile")
      .then((response) => {
        const { user, plan, address } = response.data;
        setUser(user);
        setPlan(plan);
        setAddress(address);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Flex direction="column" h="100vh">
      <Header />
      <Flex w="100%" my="6" maxW={1480} mx="auto" px="2" h="100vh">
        <Sidebar />
        <Flex as="div" direction="column" w="100%" gap="4">
          <Box p="4">
            <Text as="b">Meu Perfil</Text>

            <Box bg="white" boxShadow="lg" p="4" borderRadius="lg" m="8">
              <Text as="b" fontSize="lg">
                Plano Contratado
              </Text>
              <HStack gap="24">
                <HStack>
                  <Text as="b">Plano:</Text>
                  <Text>{plan.name}</Text>
                </HStack>
                <HStack>
                  <Text as="b">Quantidade de Fotos:</Text>
                  <Text>{plan.limit_photos}</Text>
                </HStack>
                <HStack>
                  <Text as="b">Quantidade de Quadros</Text>
                  <Text>{plan.limit_factor}</Text>
                </HStack>
              </HStack>
            </Box>
            <Box bg="white" boxShadow="lg" p="4" borderRadius="lg" m="8">
              <Text as="b" fontSize="lg">
                Dados do Usuário
              </Text>
              <HStack gap="16">
                <HStack>
                  <Text as="b">Nome Completo:</Text>
                  <Text>{user.name}</Text>
                </HStack>
                <HStack>
                  <Text as="b">E-mail:</Text>
                  <Text>{user.email}</Text>
                </HStack>
                <HStack>
                  <Text as="b">Data de Assinatura</Text>
                  <Text>{user.createdAt}</Text>
                </HStack>
              </HStack>
            </Box>
            {address && (
              <Box bg="white" boxShadow="lg" p="4" borderRadius="lg" m="8">
                <Text as="b" fontSize="lg">
                  Endereços
                </Text>
                <HStack gap="8" m="4">
                  <HStack>
                    <Text as="b">Logradouro:</Text>
                    <Text>{address.street}</Text>
                  </HStack>
                  <HStack>
                    <Text as="b">Número</Text>
                    <Text>{address.number}</Text>
                  </HStack>
                  <HStack>
                    <Text as="b">Complemento</Text>
                    <Text>{address.complement}</Text>
                  </HStack>
                </HStack>
                <HStack gap="8" m="4">
                  <HStack>
                    <Text as="b">Bairro</Text>
                    <Text>{address.neighborhood}</Text>
                  </HStack>
                  <HStack>
                    <Text as="b">Cidade</Text>
                    <Text>{address.city}</Text>
                  </HStack>
                  <HStack>
                    <Text as="b">CEP</Text>
                    <Text>{address.zip}</Text>
                  </HStack>
                  <HStack>
                    <Text as="b">Estado</Text>
                    <Text>{address.state}</Text>
                  </HStack>
                </HStack>
              </Box>
            )}
            {!address && (
              <Box bg="white" boxShadow="lg" p="4" borderRadius="lg" m="8">
                <Flex
                  as="form"
                  direction="column"
                  gap="4"
                  onSubmit={(e) => submitAddress(e)}
                  action="POST"
                >
                  <Flex gap="4">
                    <Input
                      w="96"
                      name="street"
                      label="Logradouro"
                      type="text"
                      onChange={(e) => handleCreateAddress(e)}
                    />
                    <Input
                      name="number"
                      label="Número"
                      type="text"
                      onChange={(e) => handleCreateAddress(e)}
                    />
                    <Input
                      name="complement"
                      label="Complemento"
                      type="text"
                      onChange={(e) => handleCreateAddress(e)}
                    />
                  </Flex>
                  <Flex gap="4">
                    <Input
                      w="96"
                      name="neighborhood"
                      label="Bairro"
                      type="text"
                      onChange={(e) => handleCreateAddress(e)}
                    />
                    <Input
                      name="zip"
                      label="CEP"
                      type="text"
                      onChange={(e) => handleCreateAddress(e)}
                    />
                    <Input
                      name="city"
                      label="Cidade"
                      type="text"
                      onChange={(e) => handleCreateAddress(e)}
                    />
                    <Input
                      name="state"
                      label="UF"
                      type="text"
                      onChange={(e) => handleCreateAddress(e)}
                    />
                  </Flex>
                  <Flex justify="flex-end">
                    <Button type="submit" mt="6" colorScheme="green" w="64">
                      Enviar
                    </Button>
                  </Flex>
                </Flex>
              </Box>
            )}
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps = withSSRSig(async (ctx) => {
  return {
    props: {},
  };
});

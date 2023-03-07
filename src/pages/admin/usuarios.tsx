import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { api } from "@/services/api";
import { withSSRSig } from "@/utils/withSSRSig";
import { Box, Flex, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export default function Usuários() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/admin/users").then((response) => {
      console.log(response.data);
      setUsers(response.data);
    });
  }, []);

  return (
    <Flex direction="column" h="100vh">
      <Header />
      <Flex w="100%" my="6" maxW={1480} mx="auto" px="2" h="100vh">
        <Sidebar />
        <Flex as="div" direction="column" w="100%" gap="4">
          <h1>ENTREGA</h1>

          <Box p="8" flex="1" bg="lifewall-pastel">
            <Table colorScheme="blackAlpha">
              <Thead>
                <Tr>
                  <Th>#ID</Th>
                  <Th>Nome</Th>
                  <Th>E-mail</Th>
                  <Th>Data de Cadastro</Th>
                </Tr>
              </Thead>
              <Tbody>
                {users.map((user, key) => {
                  return (
                    <Tr key={key}>
                      <Td>{user.id}</Td>
                      <Td>{user.name}</Td>
                      <Td>{user.email}</Td>
                      <Td>
                        {new Intl.DateTimeFormat("pt-BR").format(
                          new Date(user.createdAt)
                        )}
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
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

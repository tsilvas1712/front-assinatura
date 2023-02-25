import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { AuthContext } from "@/Context/AuthContext";
import { api } from "@/services/api";
import {
  Flex,
  Container,
  SimpleGrid,
  Box,
  Text,
  Icon,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Image,
  Card,
  Stack,
  CardBody,
  Heading,
  CardFooter,
  Button,
} from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { RiImage2Fill, RiRedPacketFill } from "react-icons/ri";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    api.get("/profile").then((response) => console.log(response.data));
  });
  return (
    <Flex direction="column" h="100vh">
      <Header />
      <Flex w="100%" my="6" maxW={1480} mx="auto" px="2" h="100vh">
        <Sidebar />
        <Flex as="div" direction="column" w="100%" gap="4">
          <Flex as="div" h="64" p="4" gap="8">
            <Card
              direction={{ base: "column", sm: "row" }}
              overflow="hidden"
              variant="outline"
              w="100%"
            >
              <Icon as={RiImage2Fill} fontSize="176" />

              <Stack>
                <CardBody textAlign="right">
                  <Heading size="md">Total de Imagens</Heading>

                  <Text py="2" fontSize="64">
                    100
                  </Text>
                </CardBody>
              </Stack>
            </Card>
            <Card
              direction={{ base: "column", sm: "row" }}
              overflow="hidden"
              variant="outline"
              w="100%"
            >
              <Icon as={RiRedPacketFill} fontSize="176" />

              <Stack>
                <CardBody textAlign="right">
                  <Heading size="md">Total de Entregas</Heading>

                  <Text py="2" fontSize="64">
                    100
                  </Text>
                </CardBody>
              </Stack>
            </Card>
          </Flex>
          <Flex h="100%" p="4" direction="column" gap="4">
            <Heading size="md">Últimas Imagens Importadas</Heading>
            <TableContainer bg="yellow.100">
              <Table>
                <Thead bg="yellow.500" color="black">
                  <Tr>
                    <Th>To convert</Th>
                    <Th>into</Th>
                    <Th isNumeric>multiply by</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>inches</Td>
                    <Td>millimetres (mm)</Td>
                    <Td isNumeric>25.4</Td>
                  </Tr>
                  <Tr>
                    <Td>feet</Td>
                    <Td>centimetres (cm)</Td>
                    <Td isNumeric>30.48</Td>
                  </Tr>
                  <Tr>
                    <Td>yards</Td>
                    <Td>metres (m)</Td>
                    <Td isNumeric>0.91444</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

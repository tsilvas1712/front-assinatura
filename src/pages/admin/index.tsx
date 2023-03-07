import { api } from "@/services/api";
import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Icon,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";

import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
export default function AdminHome() {
  const [users, setUsers] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [files, setFiles] = useState([]);
  const [shipped, setShipped] = useState([]);

  useEffect(() => {
    api.get("/admin").then((res) => {
      const { users, deliveries, files, shipped } = res.data;

      setUsers(users);
      setDeliveries(deliveries);
      setFiles(files);
      setShipped(shipped);
    });
  });
  return (
    <Flex direction="column" h="100vh">
      <Header />
      <Flex w="100%" my="6" maxW={1480} mx="auto" px="2" h="100vh">
        <Sidebar />
        <Flex as="div" direction="column" w="100%" gap="4">
          <h1>Dashboard</h1>
          <Flex wrap="wrap" w="100%" direction="row" gap="8">
            <Card boxShadow="lg" w="64">
              <CardBody>
                <CardHeader>
                  <Text textAlign="center" as="b" fontSize="4xl">
                    Pedidos
                  </Text>
                </CardHeader>
                <Text textAlign="center" fontSize="2xl">
                  {deliveries.length}
                </Text>
              </CardBody>
            </Card>
            <Card boxShadow="lg" w="64">
              <CardBody>
                <CardHeader>
                  <Text textAlign="center" as="b" fontSize="4xl">
                    Usuários
                  </Text>
                </CardHeader>
                <Text textAlign="center" fontSize="2xl">
                  {users.length}
                </Text>
              </CardBody>
            </Card>
            <Card boxShadow="lg" w="64">
              <CardBody>
                <CardHeader>
                  <Text textAlign="center" as="b" fontSize="4xl">
                    Fotos
                  </Text>
                </CardHeader>
                <Text textAlign="center" fontSize="2xl">
                  {files.length}
                </Text>
              </CardBody>
            </Card>
            <Card boxShadow="lg" w="64">
              <CardBody>
                <CardHeader>
                  <Text textAlign="center" as="b" fontSize="4xl">
                    Entregues
                  </Text>
                </CardHeader>
                <Text textAlign="center" fontSize="2xl">
                  {shipped.length}
                </Text>
              </CardBody>
            </Card>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

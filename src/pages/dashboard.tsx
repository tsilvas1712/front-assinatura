/* eslint-disable react/jsx-key */
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { api } from "@/services/api";
import { withSSRSig } from "@/utils/withSSRSig";
import {
  Card,
  CardBody,
  Flex,
  Heading,
  Icon,
  Progress,
  ProgressLabel,
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
import { useEffect, useState } from "react";
import { RiImage2Fill, RiRedPacketFill } from "react-icons/ri";

export default function Dashboard() {
  const [imgUser, setimgUser] = useState([]);
  const [deliveryUser, setdeliveryUser] = useState([]);
  const [plan, setPlan] = useState([]);
  const [termModal, setTermModal] = useState(false);

  useEffect(() => {
    api
      .get("/plan")
      .then((response) => {
        setPlan(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    api
      .get("/file")
      .then((response) => {
        setimgUser(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    api
      .get("/delivery")
      .then((response) => {
        setdeliveryUser(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleOpenTermModal() {
    setTermModal(true);
  }

  function handleCloseTermModal() {
    setTermModal(false);
  }

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
                    {imgUser.length}
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
                    {deliveryUser.length}
                  </Text>
                </CardBody>
              </Stack>
            </Card>
          </Flex>
          <Text as="b">Capacidade de Fotos</Text>
          <Progress
            colorScheme="telegram"
            height="64px"
            size="xs"
            value={imgUser.length}
            max={plan.limit_photos}
            isAnimated={true}
          >
            <ProgressLabel fontSize="lg" color="black">
              Fotos: {imgUser.length}
            </ProgressLabel>
          </Progress>
          <Flex h="100%" p="4" direction="column" gap="4">
            <Heading size="md">Últimas Imagens Importadas</Heading>
            <TableContainer bg="lifewall-yellow">
              <Table>
                <Thead bg="yellow.500" color="black">
                  <Tr>
                    <Th>Imagem</Th>
                    <Th>Impresso</Th>
                    <Th>Data de Upload</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {imgUser.map((image, key) => {
                    return (
                      <Tr key={key}>
                        <Td>{image.name}</Td>
                        {image.printed ? <Td> Sim</Td> : <Td> Não</Td>}
                        <Td>
                          {new Intl.DateTimeFormat("pt-BR").format(
                            new Date(image.createdAt)
                          )}
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </Flex>
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

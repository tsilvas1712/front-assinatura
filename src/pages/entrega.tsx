import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { api } from "@/services/api";
import { withSSRSig } from "@/utils/withSSRSig";
import { Box, Flex, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import {useState,useEffect} from 'react'

export default function Entrega(){
  const [deliveries,setDeliveries] = useState([])

  useEffect(() => {
    api.get('/delivery').then(response => {
      console.log(response.data);
      setDeliveries(response.data)
      
    })
  }, []);

  return(
    <Flex direction="column" h="100vh">
      <Header/>
      <Flex w="100%" my="6" maxW={1480} mx="auto" px="2" h="100vh">
        <Sidebar/>
        <Flex as="div" direction="column" w="100%" gap="4">
          <h1>ENTREGA</h1>

          <Box p="8" flex="1" bg="lifewall-pastel">
            <Table colorScheme="blackAlpha">
              <Thead>
                <Tr>
                  <Th>#ID</Th>
                  <Th>Status do Pedido</Th>
                  <Th>Quantidade de Fotos</Th>
                  <Th>Data de Upload</Th>
                </Tr>
              </Thead>
              <Tbody>
              { deliveries.map((delivery, key) => {
                return(
                  <Tr  key={key}>
                    <Td>{delivery.id}</Td>
                    <Td >{delivery.StatusDelivery.status}</Td>
                    <Td>{delivery.q_photos}</Td>
                    <Td>{new Intl.DateTimeFormat('pt-BR').format(new Date(delivery.created_at))}</Td>
                  </Tr>
                )
              })}
              </Tbody>
            </Table>

          </Box>
        </Flex>
      </Flex>

    </Flex>
  )
}

export const getServerSideProps = withSSRSig(async(ctx) =>{
 
  return {
    props:{}
  }
})
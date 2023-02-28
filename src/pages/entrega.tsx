import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { withSSRSig } from "@/utils/withSSRSig";
import { Flex } from "@chakra-ui/react";

export default function Entrega(){
  return(
    <Flex direction="column" h="100vh">
      <Header/>
      <Flex w="100%" my="6" maxW={1480} mx="auto" px="2" h="100vh">
        <Sidebar/>
        <Flex as="div" direction="column" w="100%" gap="4">
          <h1>ENTREGA</h1>
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
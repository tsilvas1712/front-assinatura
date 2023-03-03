// @ts-ignore
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { api } from "@/services/api";
import { withSSRSig } from "@/utils/withSSRSig";
import {Flex, Image, Wrap, WrapItem, Text, Button} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import { RiDownload2Fill } from "react-icons/ri";

export default function Galeria(){
  const [imgsUser, setimgsUser] = useState([]);
  useEffect(() => {
    api.get('/file').then(response =>{      
      setimgsUser(response.data)
      console.log(response.data)
      console.log('IMAGE USER',imgsUser)
      
    })
  }, []);

  const downloadImage = (image) =>{
    console.log("image",image);
    saveAs(image.url,image.name)
  }
  return(
    // @ts-ignore
    <Flex direction="column" h="100vh" >
      <Header/>
      <Flex w="100%" my="6" maxW={1480} mx="auto" px="2" h="100vh">
        <Sidebar/>
        <Flex as="div" direction="column" w="100%" gap="4">
          <h1>GALERIA</h1>
          <Wrap spacing="6">
          {imgsUser.map((image,key) =>{
            return(
              <Flex as="div" direction="column">
                <WrapItem>
                  <Image src={image.url} fallbackSrc='https://via.placeholder.com/150' maxW="300px" />
                </WrapItem>
                <Flex>
                  <Text>{image.name}</Text>
                  <Button leftIcon={<RiDownload2Fill />} colorScheme='teal' variant='solid' onClick={downloadImage(image)}>

                  </Button>

                </Flex>

            </Flex>
            )})}          
          </Wrap>
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
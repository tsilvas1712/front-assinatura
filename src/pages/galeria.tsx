// @ts-ignore
import {Header} from "@/components/Header";
import {Sidebar} from "@/components/Sidebar";
import {api} from "@/services/api";
import {withSSRSig} from "@/utils/withSSRSig";
import {
  Flex, Image, Wrap, WrapItem, Text, Button, Spacer, Icon, Heading, Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, useDisclosure, Loren, Input
} from "@chakra-ui/react";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {saveAs} from "file-saver";
import {RiDownload2Fill, RiDeleteBin2Fill} from "react-icons/ri";

export default function Galeria() {
  const [imgsUser, setimgsUser] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  useEffect(() => {
    api.get('/file').then(response => {
      setimgsUser(response.data)
      
    })
  }, []);
  const limit_factor = 3;
  const delivered = 2;
  
  const limit_photos = 10;
  const photos = 2
  
  function downloadImage(image) {
    console.log("image");
    saveAs(image.url, image.name)
  }
  
  const onChangeImage = (event) => {
    setSelectedFile('')
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0]
      setSelectedFile(i)
      console.log("Set Image", selectedFile)
    }
  }
  
  const submitUpload = async(event) =>{
    const body = new FormData();
    body.append("file",selectedFile);
    console.log("Data",body)
    await api.post('/file',{body})
  }
  
  
  const {isOpen, onOpen, onClose} = useDisclosure()
  return (
    <Flex direction="column" h="100vh">
      <Header/>
      <Flex w="100%" my="6" maxW={1480} mx="auto" px="2" h="100vh">
        <Sidebar/>
        <Flex as="div" direction="column" w="100%"
              gap="4">
          <Flex>
            <Heading>GALERIA</Heading>
            <Spacer/>
            <Flex gap="4">
              <Button colorScheme="blue" isDisabled={!((limit_photos - photos) > 0)} onClick={onOpen}>Importar</Button>
              <Button colorScheme="green" isDisabled={!((limit_factor - delivered) > 0)}>Produzir</Button>
            </Flex>
          </Flex>
          <Wrap spacing="6">
            {imgsUser.map((image, key) => {
              return (
                <Flex
                  as="div"
                  direction="column"
                  key={key}
                  width="350px"
                  bg="white"
                  p="8"
                  boxShadow="lg"
                
                >
                  <WrapItem>
                    <Image
                      src={image.url}
                      fallbackSrc='https://via.placeholder.com/150'
                      maxW="300px"/>
                  </WrapItem>
                  <Flex mt="2" justifyContent="center">
                    <Text>{image.name}</Text>
                    <Spacer/>
                    <Button
                      colorScheme='blue'
                      variant='solid'
                      onClick={() => {
                        downloadImage(image)
                      }}
                    >
                      <Icon as={RiDownload2Fill} font="16"/>
                    </Button>
                    <Button
                      ml="2"
                      colorScheme='red'
                      variant='solid'
                    
                    >
                      <Icon as={RiDeleteBin2Fill} font="16"/>
                    </Button>
                  
                  </Flex>
                
                </Flex>
              )
            })}
          </Wrap>
        </Flex>
      </Flex>
      
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>Importar Imagem</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            <Flex
              boxShadow="lg"
              width="100%"
              as="form"
              maxWidth={360}
              bg="white"
              px="4"
              py="4"
              borderRadius={8}
              flexDir="column"
              justifyItems="center"
              
              
            
            
            >
              <Input type="file" onChange={onChangeImage}/>
            </Flex>
          </ModalBody>
          
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme='green' mr={3} onClick={submitUpload}>
              Upload
            </Button>
          
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  )
}

export const getServerSideProps = withSSRSig(async (ctx) => {
  
  return {
    props: {}
  }
})
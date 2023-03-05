import { Button, Flex, Text, CloseButton, Image, Input, Box, Table, Thead, Th, Tr, Tbody, Td, Checkbox } from '@chakra-ui/react';
import Modal from 'react-modal';
import { useState,useEffect } from 'react'
import { api } from '@/services/api';
import Router from 'next/router';
import { Pagination } from '@/components/Paginaton';



interface ModalImportImageProps {
  isOpen: boolean;
  onRequestClose: () => void;
  images:[];
}


export function ModalDelivery({ isOpen, onRequestClose,images }: ModalImportImageProps) {
 
  const reload=()=>window.location.reload();  

  const [imgsSelect,setImgsSelect] = useState([])
  let data =[]

  function onSelectImage(image,event){
    console.log("evento",event.target.checked,image)

    if(event.target.checked){
      data.push(image);
    }else{
      const position = data.indexOf(event.target.value);
      data.splice(position, 1);
    }

    console.log("Data",data);
    
  }

  async function sendDelivery(){
    console.log("Send Data",data)
    await api.post('/delivery',{image:data}).then(res =>{console.log(res.data)})
    onRequestClose()
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} ariaHideApp={false}  onAfterClose={reload} >
      <Flex as="div" direction="column" h="100%">
        <Flex h="8" w="100%" justifyContent="right">
          <CloseButton onClick={onRequestClose} />
        </Flex>
        <Flex h="100%" w="100%" direction="column"  gap="8" p="8">
          <Flex justify="space-between">
            <Text as="b" fontSize="4xl">Solicitar Quadro</Text>
            <Button colorScheme="green" onClick={sendDelivery}>Enviar para Produção</Button>
          </Flex>          
          <Box p="8" flex="1" bg="lifewall-pastel">
            <Table colorScheme="blackAlpha">
              <Thead>
                <Tr>
                  <Th></Th>
                  <Th>Imagem</Th>
                  <Th>Nome</Th>
                  <Th>Data de Upload</Th>
                </Tr>
              </Thead>
              <Tbody>
              {images.map((image, key) => {
                return(
                  <Tr key={key}>
                    <Td><Checkbox 
                      colorScheme="blue" 
                      px="6"
                      onChange={(event)=>{                       
                          onSelectImage(image.id,event)
                      }}
                    /></Td>
                    <Td><Image src={image.url} w="16"/></Td>
                    <Td>{image.name}</Td>
                    <Td>{new Intl.DateTimeFormat('pt-BR').format(new Date(image.createdAt))}</Td>
                  </Tr>
                )
              })}
              </Tbody>
            </Table>
            <Pagination/>
          </Box>
          
        </Flex>

      </Flex>
    </Modal>
  );
}
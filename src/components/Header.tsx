/* eslint-disable jsx-a11y/alt-text */
import { AuthContext, signOut } from "@/Context/AuthContext";
import {
  Avatar,
  Box,
  Flex,
  HStack,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import Router from "next/router";
import { useContext, useState } from "react";
import { RiNotification2Line } from "react-icons/ri";
import { ModalTermo } from "./ModalTermo";

export function Header() {
  const { user } = useContext(AuthContext);
  const [termModal, setTermModal] = useState(false);
  function handleOpenTermModal() {
   
    setTermModal(true);
  }

  function handleCloseTermModal() {
    setTermModal(false);
  }

  function handleProfile(){
    Router.push('/perfil')
  }

  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto"
      px="6"
      align="center"
      boxShadow="md"
      bg="lifewall-yellow"
    >
      <Image src="/assets/img/logo_seize.png" w="10%" />
      <Text>Meu Plano: {user?.plan.name}</Text>

      <Flex align="center" ml="auto">
        <HStack
          spacing="8"
          mx="8"
          pr="8"
          py="1"
          color="gray.900"
          borderRightWidth={1}
          borderColor="gray.700"
        >
          <Icon as={RiNotification2Line} fontSize="20" />
        </HStack>
        <Flex align="center">
          <Box mr="4" textAlign="right">
            <Text>{user?.user.name}</Text>
            <Text color="gray.900" fontSize="small">
              {user?.user.email}
            </Text>
          </Box>
          <Menu direction="rtl">
            <MenuButton>
              <Avatar bg="blue.200" size="md" name={user?.user.name} src="" />
            </MenuButton>
            <MenuList>
              <MenuGroup title="Perfil">
                <MenuItem onClick={()=>{handleProfile()}}>Meu Perfil</MenuItem>
                <MenuItem>Pagamentos </MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuGroup title="Ajuda">
                <MenuItem>Docs</MenuItem>
                <MenuItem onClick={()=>{handleOpenTermModal()}}>Instruções</MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuItem onClick={() => signOut()}>Sair</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
      <ModalTermo isOpen={termModal} onRequestClose={handleCloseTermModal} />
    </Flex>
  );
}

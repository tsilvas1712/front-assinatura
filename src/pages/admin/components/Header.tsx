/* eslint-disable jsx-a11y/alt-text */
import { AuthContext, signOut } from "@/Context/AuthContext";
import { api } from "@/services/api";
import {
  Flex,
  Image,
  Icon,
  HStack,
  Box,
  Text,
  Avatar,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuDivider,
  MenuList,
} from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { RiNotification2Line, RiUserAddLine } from "react-icons/ri";

export function Header() {
  const { user } = useContext(AuthContext);

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
      bg="yellow.100"
    >
      <Image src="/assets/img/logo_seize.png" w="10%" />
      <Text>Área Administrativa</Text>

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
                <MenuItem>Meu Perfil</MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuGroup title="Ajuda">
                <MenuItem>Docs</MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuItem onClick={() => signOut()}>Sair</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Flex>
  );
}

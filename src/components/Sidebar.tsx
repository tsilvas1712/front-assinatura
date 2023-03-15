import { Box, Icon, Link, Stack, Text } from "@chakra-ui/react";
import { RiDashboardLine } from "react-icons/ri";
export function Sidebar() {
  return (
    <Box
      as="aside"
      w="64"
      mr="8"
      minW="64"
      bg="lifewall-yellow"
      p="2"
      boxShadow="lg"
      borderRadius={8}
    >
      <Stack spacing="12" align="flex-start">
        <Box width="100%">
          <Text fontWeight="bold" color="gray.900" fontSize="small">
            MENU
          </Text>
          <Stack spacing="4" mt="8" align="stretch" width="100%">
            <Link
              href="/dashboard"
              display="flex"
              alignItems="center"
              borderRadius="md"
              p="2"
              _hover={{
                background: "yellow.500",
              }}
            >
              <Icon as={RiDashboardLine} fontSize="20" />
              <Text ml="4" fontWeight="medium">
                Painel
              </Text>
            </Link>
            <Link
              href="/galeria"
              display="flex"
              alignItems="center"
              borderRadius="md"
              p="2"
              _hover={{
                background: "yellow.500",
              }}
            >
              <Icon as={RiDashboardLine} fontSize="20" />
              <Text ml="4" fontWeight="medium">
                Galeria
              </Text>
            </Link>
            <Link
              href="/entrega"
              display="flex"
              alignItems="center"
              borderRadius="md"
              p="2"
              _hover={{
                background: "yellow.500",
              }}
            >
              <Icon as={RiDashboardLine} fontSize="20" />
              <Text ml="4" fontWeight="medium">
                Entregas
              </Text>
            </Link>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

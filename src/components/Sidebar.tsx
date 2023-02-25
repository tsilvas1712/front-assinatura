import { Box, Stack, Text, Link, Icon } from "@chakra-ui/react";
import { RiDashboardLine } from "react-icons/ri";
export function Sidebar() {
  return (
    <Box
      as="aside"
      w="64"
      mr="8"
      bg="yellow.100"
      p="2"
      boxShadow="lg"
      borderRadius={8}
    >
      <Stack spacing="12" align="flex-start">
        <Box>
          <Text fontWeight="bold" color="gray.900" fontSize="small">
            MENU
          </Text>
          <Stack spacing="4" mt="8" align="stretch">
            <Link display="flex" alignItems="center" color="gray.900" py="1">
              <Icon as={RiDashboardLine} fontSize="20" />
              <Text ml="4" fontWeight="medium">
                Painel
              </Text>
            </Link>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

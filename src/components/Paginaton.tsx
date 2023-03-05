import { Box, Button, Stack } from "@chakra-ui/react";

export function Pagination(){
  return(
    <Stack direction="row" mt="8" justify="space-between" align="center" spacing="6">
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
      </Box>
      <Stack direction="row" spacing="2">
      <Button 
        size="sm" 
        fontSize="xs" 
        width="4" 
        colorScheme="blue" 
        disabled 
        _disabled={{
          bg: 'blue.400',
          cursor:'default'
        }}
      >
        1
      </Button>
      <Button 
        size="sm" 
        fontSize="xs" 
        width="4" 
        bg="blue.200"
        _hover={{
          bg: 'blue.400',
          color:'white'
        }}
      >
        2
      </Button>
      <Button 
        size="sm" 
        fontSize="xs" 
        width="4" 
        bg="blue.200"
        _hover={{
          bg: 'blue.400',
          color:'white'
        }}
      >
        3
      </Button>
      <Button 
        size="sm" 
        fontSize="xs" 
        width="4" 
        bg="blue.200"
        _hover={{
          bg: 'blue.400',
          color:'white'
        }}
      >
        4
      </Button>
      <Button 
        size="sm" 
        fontSize="xs" 
        width="4" 
        bg="blue.200"
        _hover={{
          bg: 'blue.400',
          color:'white'
        }}
      >
        5
      </Button>
      </Stack>

    </Stack>
  )
}
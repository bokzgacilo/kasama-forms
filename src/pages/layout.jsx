import { ColorModeButton } from "@/components/ui/color-mode";
import { Center, Container, Flex, Heading, Stack } from "@chakra-ui/react";

export default function Layout({ children }) {
  return (
    <Container>
      <Stack>
        <Flex alignItems="center" justifyContent="space-between" p={4}>
          <Heading>Kasama Forms</Heading>
          <ColorModeButton />
        </Flex>
        {children}
      </Stack>
    </Container>
  )
}
import { Alert, Button, Card, Field, Flex, Heading, Icon, IconButton, Input, Separator, Stack, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { LuArrowDown, LuArrowUp, LuCheck, LuTrash } from "react-icons/lu";
import Layout from "./layout";



export default function CreateForm() {
  const [formStructure, setFormStructure] = useState([])

  return (
    <Layout>
      <Stack
        px={4}
        gap={4}
      >
        <Heading>Create Form</Heading>
        <Flex gap={2}>
          <Button
            variant="outline"
            onClick={() => setFormStructure([
              ...formStructure,
              {
                type: "text",
              }
            ])}
          >Text</Button>
          <Button
            variant="outline"
            onClick={() => setFormStructure([
              ...formStructure,
              {
                type: "tel",
                label: "Phone"
              }
            ])}
          >Phone</Button>
          <Button
            variant="outline"
            onClick={() => setFormStructure([
              ...formStructure,
              {
                type: "email",
                label: "Email"
              }
            ])}
          >Email</Button>
          <Button
            variant="outline"
            onClick={() => setFormStructure([
              ...formStructure,
              {
                type: "email",
                label: "Email"
              }
            ])}
          >Textarea</Button>

          <Button ml="auto" bg={formStructure.length === 0 ? "gray" : "green.700"} disabled={formStructure.length === 0} variant={formStructure.length === 0 ? "outline" : "solid"}>Save Form <LuCheck /></Button>
        </Flex>
        {formStructure.length === 0 && <Alert.Root status="error">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Form is empty</Alert.Title>
            <Alert.Description>Please add at least one field</Alert.Description>
          </Alert.Content>
        </Alert.Root>}

        {formStructure.length !== 0 &&
          <Card.Root>
            <Card.Header p={4}>
              <Card.Title>Preview</Card.Title>
            </Card.Header>
            <Separator />
            <Card.Body p={4}>
              <Stack>
                {formStructure.map((field, index) => (
                  <Flex key={index} gap={4} alignItems="center">
                    <Flex>
                      <IconButton size="xs"
                        onClick={() => {
                          if (index === 0) return; // already at top
                          const newArr = [...formStructure];
                          [newArr[index - 1], newArr[index]] = [newArr[index], newArr[index - 1]];
                          setFormStructure(newArr);
                        }}
                      >
                        <LuArrowUp />
                      </IconButton>
                      <IconButton size="xs"
                        onClick={() => {
                          if (index === formStructure.length - 1) return; // already at bottom
                          const newArr = [...formStructure];
                          [newArr[index + 1], newArr[index]] = [newArr[index], newArr[index + 1]];
                          setFormStructure(newArr);
                        }}
                      >
                        <LuArrowDown />
                      </IconButton>
                    </Flex>
                    <Field.Root>
                      <Field.Label>{field.label}</Field.Label>
                      <Input />
                    </Field.Root>
                    <IconButton onClick={() => setFormStructure(formStructure.filter((_, i) => i !== index))}>
                      <LuTrash />
                    </IconButton>
                  </Flex>
                ))}
              </Stack>
            </Card.Body>
          </Card.Root>
        }
        <Card.Root>
          <Card.Header p={4}>
            <Card.Title>Document File</Card.Title>
            <Card.Description>This will be download after form submission.</Card.Description>
          </Card.Header>
          <Separator />
          <Card.Body p={4}>

          </Card.Body>
        </Card.Root>
      </Stack>
    </Layout>
  )
}
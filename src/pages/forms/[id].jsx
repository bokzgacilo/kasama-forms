"use client";

import { Button, Center, Field, Flex, Heading, Input, Stack, Textarea } from "@chakra-ui/react";
import axios from "axios";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Form() {
  const router = useRouter();
  const { id, link, file_name } = router.query;

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({
    form_id: id,
    first_name: "",
    last_name: "",
    email: "",
    company: "",
    message: "",
    file_name: file_name,
    link: link,
  })

  const isFormEmpty =
    Object.entries(form)
      .filter(([key]) => key !== "link" && key !== "file_name" && key !== "form_id")
      .every(([_, value]) => value.trim() !== "");

  const downloadPDF = async () => {
    setLoading(true);

    try {
      const response = await axios.post("/api/sendEmail", form);
      const fileUrl = response.data.download_link;
      await new Promise((resolve) => setTimeout(resolve, 2500));
      if (fileUrl) {
        const res = await fetch(fileUrl);
        const blob = await res.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = `Kasama_Form_${Date.now()}.pdf`;
        a.click();
        window.URL.revokeObjectURL(blobUrl);
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }

    setLoading(false);
    setSuccess(true)
  };

  const { setTheme } = useTheme()

  useEffect(() => {
    setTheme("light")
  }, [])

  const handleChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  return (
    <Stack
      gap={4}
      padding={4}
      bg="transparent"
      width="100dvw"
      height="100dvh"
    >
      {success ?
        <Center>
          <Heading size="md">Thank you for downloading</Heading>
        </Center>
        :
        <>
          <Flex direction={{ base: "column", lg: "row" }} gap={4}>
            <Field.Root required>
              <Field.Label>First Name <Field.RequiredIndicator /></Field.Label>
              <Input
                value={form.first_name}
                onChange={handleChange("first_name")}
              />
            </Field.Root>

            <Field.Root required>
              <Field.Label>Last Name <Field.RequiredIndicator /></Field.Label>
              <Input
                value={form.last_name}
                onChange={handleChange("last_name")}
              />
            </Field.Root>
          </Flex>

          <Field.Root required>
            <Field.Label>Email <Field.RequiredIndicator /></Field.Label>
            <Input
              value={form.email}
              onChange={handleChange("email")}
            />
          </Field.Root>

          <Field.Root required>
            <Field.Label>Company <Field.RequiredIndicator /></Field.Label>
            <Input
              value={form.company}
              onChange={handleChange("company")}
            />
          </Field.Root>

          <Field.Root required>
            <Field.Label>Message <Field.RequiredIndicator /></Field.Label>
            <Textarea
              value={form.message}
              onChange={handleChange("message")}
            />
          </Field.Root>
          <Button
            size="xl"
            variant={!isFormEmpty ? "outline" : "solid"}
            bg={!isFormEmpty ? "" : "blue.600"}
            onClick={downloadPDF}
            disabled={!isFormEmpty}
            loading={loading}
          >Submit</Button>
        </>
      }

    </Stack>
  )
}
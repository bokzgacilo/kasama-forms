import { Button, Stack } from "@chakra-ui/react";
import Link from "next/link";

export default function Form() {
  const downloadPDF = async () => {
    const response = await fetch("https://framerusercontent.com/assets/MMK1mk80NmP8pBFGQMK4Khsxwc.pdf");
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "TEST FILENAME.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <Stack>
      <Button onClick={downloadPDF}>Download PDF</Button>
    </Stack>
  )
}
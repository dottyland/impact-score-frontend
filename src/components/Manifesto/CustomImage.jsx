import { Container } from "@mui/material";
import Image from "next/image";
import { styled } from "@mui/system";
const Img = styled(Image)(({ theme }) => ({
  borderRadius: "20px",
}));

export default function CustomImage({ size, source }) {
  return (
    <Container>
      <Img
        src={source}
        width={size}
        height={size}
        alt="Dottyland Impact Self - environmental footprint as identity"
      />
    </Container>
  );
}
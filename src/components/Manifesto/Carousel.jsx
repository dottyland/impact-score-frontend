import Carousel from "react-material-ui-carousel";
import CustomImage from "./CustomImage";
import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";

export default function ImgCarousel() {
  const images = ["/193.png", "/2.png", "/177.png", "/186.png", "/115.png"];
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div style={{ textAlign: "center" }}>
      <Carousel
        indicatorIconButtonProps={{
          style: {
            padding: smallScreen ? "20px" : "20px 28px",
          },
        }}
      >
        {images.map((image, index) => {
          return <CustomImage key={index} size={"500"} source={image} />;
        })}
      </Carousel>
    </div>
  );
}
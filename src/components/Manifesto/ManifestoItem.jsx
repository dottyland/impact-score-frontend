import StyledChip from "./StyledChip";
import { Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";

export default function ManifestoItem({ chipLabel, text, isOnLeftSide }) {
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div
      style={{
        paddingRight: smallScreen ? 0 : isOnLeftSide ? 20 : 0,
        paddingLeft: smallScreen ? 0 : !isOnLeftSide ? 20 : 0,
        marginBottom: smallScreen ? 20 : 40,
        minHeight: 172,
      }}
    >
      <StyledChip label={chipLabel} />
      <Typography variant={"h4"} sx={{ marginTop: 2 }}>
        {text}
      </Typography>
    </div>
  );
}
import { styled } from "@mui/system";
import { Chip as MuiChip } from "@mui/material";

const Chip = styled(MuiChip)(({ theme }) => ({
  marginRight: theme.spacing(2),
  color: theme.palette.primary.main,
  background: "linear-gradient(90deg, #B8F1C6 -0.32%, #EBF8A1 99.68%)",
  borderRadius: "48px",
  fontFamiliy: "RalewayMedium",
  fontWeight: 500,
  fontSize: "18px",
  lineHeight: "150%",
  padding: `${theme.spacing(4)} ${theme.spacing(1)}`,

  [theme.breakpoints.down("md")]: {
    marginTop: theme.spacing(6),
  },
}));

export default function StyledChip({ label }) {
  return <Chip label={label} />;
}
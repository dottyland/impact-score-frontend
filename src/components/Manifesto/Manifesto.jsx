import { Grid, Typography, useMediaQuery } from "@mui/material";
import ManifestoItem from "./ManifestoItem";
import Carousel from "./Carousel";
import { useTheme } from "@emotion/react";

export default function Manifesto() {
	const title = "Dottyland Manifesto";
	const subText =
		"The world is close to becoming uninhabitable both environmentally and socio-economically. Change, however, is still possible.";
	const manifestoText = [
		"Everyone must be able to afford a more sustainable lifestyle",
		"Impact of our individual choices must be assigned monetary value",
		"Time to turn around business models relying purely on selling more",
		"People should earn from buying less and not buying at all",
		"Web3 is a new opportunity to own and shape our consumer identity",
		"Effective change will be driven by individuals not institutions",
	];

	const theme = useTheme();
	const mediumScreen = useMediaQuery(theme.breakpoints.down("md"));
	const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<div
			style={{
				paddingTop: smallScreen ? 60 : 145,
				width: "100%",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				paddingBottom: smallScreen ? 40 : 145,
			}}
		>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: smallScreen ? "baseline" : "center",
					maxWidth: 820,
					marginBottom: 56,
				}}
			>
				<Typography
					sx={{ marginBottom: 6 }}
					variant={smallScreen ? "h4" : "h2a"}
				>
					{title}
				</Typography>
				<Typography
					sx={{ textAlign: smallScreen ? "left" : "center" }}
					variant={smallScreen ? "body2" : "body1"}
				>
					{subText}
				</Typography>
			</div>
			<Grid container>
				<Grid
					item
					sm
					sx={[
						mediumScreen && { order: 2, paddingTop: 15 },
						smallScreen && { paddingTop: 0 },
					]}
				>
					<ManifestoItem
						isOnLeftSide={true}
						chipLabel={"01"}
						text={manifestoText[0]}
					/>
					<ManifestoItem
						isOnLeftSide={true}
						chipLabel={"02"}
						text={manifestoText[1]}
					/>
					<ManifestoItem
						isOnLeftSide={true}
						chipLabel={"03"}
						text={manifestoText[2]}
					/>
				</Grid>
				<Grid item md={5} sx={[mediumScreen && { order: 1, width: "100%" }]}>
					<Carousel />
				</Grid>
				<Grid
					item
					sm
					sx={[
						mediumScreen && { order: 3, paddingTop: 15 },
						smallScreen && { paddingTop: 0 },
					]}
				>
					<ManifestoItem
						isOnLeftSide={false}
						chipLabel={"04"}
						text={manifestoText[3]}
					/>
					<ManifestoItem
						isOnLeftSide={false}
						chipLabel={"05"}
						text={manifestoText[4]}
					/>
					<ManifestoItem
						isOnLeftSide={false}
						chipLabel={"06"}
						text={manifestoText[5]}
					/>
				</Grid>
			</Grid>
		</div>
	);
}
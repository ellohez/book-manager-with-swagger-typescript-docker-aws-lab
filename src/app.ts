import express from "express";
import { router } from "./routes/routes";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

export const app = express();

const swaggerConfiguration = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "📖 Minimalist Book Manager API",
			version: "0.1.0",
			description:
				"Need a helping hand to manage your books 😺?" +
				"Well, you're in luck! This API will let you manage your books with ease! 😻",
		},
	},
	apis: ["src/routes/routes.js", "swagger.yaml"],
};

const swaggerDocs = swaggerJSDoc(swaggerConfiguration);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/", (req, res) => {
	res.status(200).json({ status: "HEALTHY" });
});

app.use(express.json());
app.use("/api/v1", router);

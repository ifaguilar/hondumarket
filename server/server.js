// Importing dependencies
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import cron from "node-cron";
import path from "path";
import {
  generatePDF,
  getSubscriptions,
  getUsers,
} from "./src/utils/generatePDF.js";
import transporter from "./src/utils/nodemailerGenerator.js";

// Importing routes
import authRoutes from "./src/routes/authRoutes.js";
import categoryRoutes from "./src/routes/categoryRoutes.js";
import complaintRoutes from "./src/routes/complaintsRoutes.js";
import dashboardRoutes from "./src/routes/dashboardRoutes.js";
import departmentRoutes from "./src/routes/departmentRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";
import subscriptionRoutes from "./src/routes/subscriptionRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";

// Initializing .env
dotenv.config();

// Variables
const PORT = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/products", productRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/complaints", complaintRoutes);

// Listening for requests
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Sends email every Wednesday at 12:30
cron.schedule("30 12 * * WED", async () => {
  const users = await getUsers();

  users.map(async (user) => {
    const subscriptions = await getSubscriptions(user);

    if (subscriptions.length !== 0) {
      let pdfName = await generatePDF(user, subscriptions);

      let mailOptions = {
        from: `"HonduMarket" ${process.env.MAIL_USER}`,
        to: user.email,
        subject: "Suscripciones | HonduMarket",
        text: `¡Hola, ${user.first_name} ${user.last_name}!`,
        template: "simpleTemplate",
        context: {
          user: user,
          body: `Como es constumbre cada semana, hemos recopilado una lista de los últimos
        productos de cada categoría a las que te has suscrito.`,
        },
        attachments: [
          {
            filename: `${pdfName}`,
            path: path
              .join(process.cwd(), `./src/pdf/${pdfName}`)
              .replace(/\\/g, "/"),
            contentType: "application/pdf",
          },
        ],
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error.message);
        } else {
          console.log("Correo enviado: " + info.response);
        }
      });
    }
  });
});

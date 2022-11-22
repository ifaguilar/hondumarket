import fs from "fs";
import fetch from "node-fetch";
import path from "path";
import pdf from "pdf-creator-node";
import options from "../utils/options.js";

export const getUsers = async () => {
  const response = await fetch(`http://127.0.0.1:3000/api/users/`);
  const data = await response.json();

  return data.users;
};

export const getSubscriptions = async (user) => {
  const response = await fetch(
    `http://127.0.0.1:3000/api/subscriptions/${user.id}`
  );
  const data = await response.json();

  return data.subscriptions;
};

export const getTopProducts = async (categoryId) => {
  const response = await fetch(
    `http://127.0.0.1:3000/api/categories/${categoryId}/top`
  );
  const data = await response.json();

  return data.topProducts;
};

export const generatePDF = async (user, subscriptions) => {
  const topProducts = await Promise.all(
    subscriptions.map(async (subscription) => {
      const result = await getTopProducts(subscription.category_id);
      return result;
    })
  );

  const html = fs.readFileSync(
    path
      .join(process.cwd(), "./src/views/subscriptionsPDF.html")
      .replace(/\\/g, "/"),
    "utf-8"
  );

  const filename = `${user.first_name.toLowerCase()}_${user.last_name.toLowerCase()}_subscriptions.pdf`;

  const document = {
    html: html,
    data: {
      user: user,
      topProducts: topProducts,
    },
    path: path.join(process.cwd(), `./src/pdf/${filename}`).replace(/\\/g, "/"),
  };

  try {
    const response = await pdf.create(document, options);
    console.log(`${filename} creado correctamente.`);
    return filename;
  } catch (error) {
    console.error(error);
  }
};

export default generatePDF;

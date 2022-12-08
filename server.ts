import express, { Request, Response } from "express";
import axios, { AxiosResponse } from "axios";
import { QuizData } from "./interfaces";

const PORT = 8000;
const app = express();

app.get("/quiz-item", async (req: Request, res: Response) => {
  try {
    const response: AxiosResponse = await axios.get(
      "https://59c52b62-9fb5-4b54-99b7-ae23d6117ab7-westeurope.apps.astra.datastax.com/api/rest/v2/namespaces/quizes/collections/quirky_quizes",
      {
        headers: {
          "X-Cassandra-Token":
            "AstraCS:UMydhEZZIErcRyHpBFQjJIUG:c2b23fa5174e358e2f98fff7d2b2338b019b44cad0fcfa9764a3539c9179987c",
          accept: "application/json",
        },
      }
    );
    if (response.status === 200) {
      const quizItem: QuizData = await response.data.data['20bef6ab-f035-4c99-9fcc-3cf19e13b70e'];
      res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
      res.send(quizItem);
    }
  } catch (err) {
    console.error(err);
  }
});

app.listen(PORT, () => console.log("server is running on post", PORT));

const fs = require("fs");

const logData = fs.readFileSync("access.log", "utf8");

const lines = logData.split("\n");

let count200 = 0;
let count500 = 0;

for (let line of lines) {

    if (line.includes(" 200")) {
        count200++;
    }

    if (line.includes(" 500")) {
        count500++;
    }
}

const summary = {
    totalRequests: count200 + count500,
    statusCodes: {
        "200": count200,
        "500": count500
    }
};

fs.writeFileSync(
    "summary.json",
    JSON.stringify(summary, null, 2)
);

console.log("HTTP 200:", count200);
console.log("HTTP 500:", count500);
console.log("Summary saved to summary.json");



// create a summary.json

// in main dir, open terminal run 
// 1). cd .. 
// 2). npx create-next-app@latest log-dashboard
// 3). cd log-dashboard
// 4). npm run dev 
// 5). in lo-dashboard open app->page.js 
// 6). copy summary.json to log-dashboard folder

// put the code in page.js
import fs from "fs";
import path from "path";

export default function Home() {
  const filePath = path.join(process.cwd(), "summary.json");

  const fileData = fs.readFileSync(filePath, "utf8");

  const summary = JSON.parse(fileData);

  return (
    <main>
      <h1>Server Log Dashboard</h1>

      <p>Total Requests: {summary.totalRequests}</p>

      <p>HTTP 200: {summary.statusCodes["200"]}</p>

      <p>HTTP 500: {summary.statusCodes["500"]}</p>
    </main>
  );
}
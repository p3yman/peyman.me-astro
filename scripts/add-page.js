import welcome from "cli-welcome";
import inquirer from "inquirer";
import chalk from "chalk";
import { customAlphabet } from "nanoid";
import slugify from "slugify";
import fs from "fs";
import { categories } from "../src/configs/categories.js";

const nanoid = customAlphabet(
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  16
);
const question = chalk.hex("#fbbf24");

welcome({
  title: `Peyman.me CLI`,
  tagLine: `by @p3yman`,
  bgColor: `#1755f6`,
  color: `#ffffff`,
  bold: true,
  clear: true,
  version: `0.1.0`,
});

inquirer
  .prompt([
    {
      type: "input",
      name: "title",
      message: question("What is the title of your post?"),
      validate: (title) => {
        if (!title.length) {
          return "Please provide a title";
        }

        return true;
      },
    },
    {
      type: "checkbox",
      name: "categories",
      choices: categories,
      message: question("Select categories:"),
      validate: (categories) => {
        if (!categories.length) {
          return "Please select at least one category";
        }

        return true;
      },
    },
  ])
  .then((answers) => {
    const id = nanoid();
    const date = new Date().toISOString().slice(0, 10);
    const template = `---
id: ${id}
title: ${answers.title}
description: A short description
date: ${date}
tags: sample-tag
category: [${answers.categories.map((c) => `"${c}"`).join(", ")}]
---

# Enjoy writing...
`;

    const slug = slugify(answers.title, {
      remove: /[*+~.()'"!:@?]/g,
    }).toLocaleLowerCase();
    const path = `./src/content/blog/${slug}`;
    fs.mkdirSync(path, { recursive: true });
    fs.writeFileSync(`${path}/${slug}.md`, template);
    console.log(`\n${chalk.green("✔")} ${chalk.bold("Done")}\n`);
  })
  .catch((error) => {
    console.log("\nSomething went wrong!\n");
  });

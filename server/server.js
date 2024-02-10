require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const OpenAI = require("openai");
const nodemailer = require('nodemailer');
const path = require('path');

const OpenAI_API_KEY = process.env.OPENAI_API_KEY;
const OpenAIClient = new OpenAI(OpenAI_API_KEY);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'i.am.yurith@gmail.com',
    pass: 'nicn hboh tvrd mner'
  }
});


/*
OpenAIClient.chat.completions.create({
  messages: [
    { role: 'system', content: 'What would you ask this person in order to clarify their worries.' },
    { role: 'user', content: 'I am worried about not loosing weight even after trying so many diets and fasting. I wonder if it is possible that my body just does not want to loose weight.' },
  ],
  model: 'gpt-3.5-turbo',
}).then(response => {
  console.log("ChatGPT response: ");
  console.log(response.choices[0].message);
})
*/

app.use(bodyParser.json());

let db = new sqlite3.Database("../db/database.db", (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the in-memory SQlite database.");
});

db.run(`PRAGMA foreign_keys = ON;`);

db.run(
  `
  CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, nickname TEXT, age INTEGER, country TEXT, email TEXT);
  `
);
db.run(
  `
  CREATE TABLE IF NOT EXISTS worries (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, worry TEXT, summary, TEXT, FOREIGN KEY(user_id) REFERENCES users(id));
  `
);
db.run(
  "CREATE TABLE IF NOT EXISTS answers (id INTEGER PRIMARY KEY AUTOINCREMENT, worry_id INTEGER, nickname TEXT, country TEXT, age INTEGER, answer TEXT, FOREIGN KEY(worry_id) REFERENCES worries(id));"
);

function generateRandomName() {
  // generate an array of 100 different names
 
  const names = ["Lars", "Sven", "Björn", "Gustav", "Johan", "Karl", "Erik", "Anders", "Nils", "Olof", "Lennart", "Stefan", "Per", "Hans", "Mats", "Göran", "Bo", "Jan", "Ulf", "Lennart", "Stig", "Gunnar", "Bengt", "Lennart", "Stig", "Gunnar", "Bengt", "Lennart", "Stig", "Gunnar", "Bengt", "Lennart", "Stig", "Gunnar", "Bengt", "Lennart", "Stig", "Gunnar", "Bengt", "Lennart", "Stig", "Gunnar", "Bengt", "Lennart", "Stig", "Gunnar", "Bengt", "Lennart", "Stig", "Gunnar", "Bengt",
    "Pedro", "Maria", "Cristobal", "Juan", "Carlos", "Luis", "Rosa", "Ana", "Elena", "Javier", "Miguel", "Pablo", "Sergio", "Raul", "Ricardo", "Ivan", "Jose", "Antonio", "Manuel", "Francisco", "David", "Daniel", "Jorge", "Alberto", "Alvaro", "Alejandro", "Adrian", "Diego", "Fernando", "Ruben", "Oscar", "Victor", "Miguel", "Pablo", "Sergio", "Raul", "Ricardo", "Ivan", "Jose", "Antonio", "Manuel", "Francisco", "David", "Daniel", "Jorge", "Alberto", "Alvaro", "Alejandro", "Adrian", "Diego", "Fernando", "Ruben", "Oscar", "Victor", "Miguel", "Pablo", "Sergio", "Raul", "Ricardo", "Ivan", "Jose", "Antonio", "Manuel", "Francisco", "David", "Daniel", "Jorge", "Alberto", "Alvaro", "Alejandro", "Adrian", "Diego", "Fernando", "Ruben", "Oscar", "Victor"];

  function takeRandom() {
    return names[Math.floor(Math.random() * names.length)]; 
  }

  const firstName = takeRandom();
  const lastName = takeRandom() + "son";
  return firstName + " " + lastName;
}

function generateRandomUser() {
  const countries = ["Germany", "Sweden", "Spain", "Italy", "France", "Portugal", "Netherlands", "Belgium", "Austria", "Switzerland", "Denmark", "Norway", "Finland", "Iceland", "Ireland", "United Kingdom", "Greece", "Poland", "Czech Republic", "Slovakia", "Hungary", "Romania", "Bulgaria", "Croatia", "Slovenia", "Bosnia and Herzegovina", "Serbia", "Montenegro", "Albania", "Macedonia", "Kosovo", "Ukraine", "Belarus", "Lithuania", "Latvia", "Estonia", "Moldova", "Russia", "Turkey", "Cyprus"]

  const name = generateRandomName();

  return {
    nickname: name,
    age: 10 + Math.floor(Math.random() * 80),
    country: countries[Math.floor(Math.random() * countries.length)],
    email: name.replace(" ", "") + "@gmail.com"
  };
}

function generateRandomWorry() {
  const worries = [
    "I am worried about not loosing weight even after trying so many diets and fasting. I wonder if it is possible that my body just does not want to loose weight.",
    "I am worried about the future of my children. I am afraid that they will not be able to find a job and have a good life.",
    "I am worried about the future of the planet. I am afraid that we are not doing enough to stop climate change.",
    "I am worried about my health. I am afraid that I will get sick and die.",
    "I am worried about my job. I am afraid that I will be fired and not be able to find another job.",
    "I am worried about my relationship. I am afraid that my partner will leave me.",
    "I am worried about my family. I am afraid that something bad will happen to them.",
    "I am worried about the future. I am afraid that things will not get better.",
    "I am worried about the present. I am afraid that things will get worse.",
    "I am worried about the past. I am afraid that I have made too many mistakes.",
  ];

  return worries[Math.floor(Math.random() * worries.length)];
}

function getRandomWorrySummaries() {
  const summaries = ["Worried about spiders", "Worried about the future", "Worried about my health", "Worried about my job", "Worried about my family", "Worried about my relationship", "Worried about my children", "Worried about the planet", "Worried about the past", "Worried about the present"];

  return summaries[Math.floor(Math.random() * summaries.length)];
}

function generateRandomData(db) {
  const user = generateRandomUser();
  const worry = generateRandomWorry();
  const summary = getRandomWorrySummaries();
  db.run("insert into users(nickname, age, country, email) values(?,?,?,?)", [user.nickname, user.age, user.country, user.email], function (err) { 
    const userId = this.lastID;
    db.run("insert into worries(user_id, worry, summary) values(?,?,?)", [userId, worry,summary], function (err) {
      console.log(`inserted user ${user.nickname} with worry ${worry}`);
    });
  })
}

/*
setTimeout(() => { 
  for (let i = 0; i < 200; i++) {
    generateRandomData(db);
  }
}, 1000);
*/

// OpenAIClient.chat.completions.create({
//   messages: [
//     { role: 'system', content: 'Make a short summary of max 20 words of the worry.' },
//     { role: 'user', content: row.worry },
//   ],
//   model: 'gpt-3.5-turbo',
// }).then(response => {
//   console.log("ChatGPT response: ");
//   console.log(response.choices[0].message);
// })

// GET REQUESTS
app.get("/api/worries/overview/:age", (req, res) => {
  console.log("=== get worries overview handler");
  const age = parseInt(req.params.age);
  // Return the information of the worried users
  db.all(`SELECT worries.id, summary, nickname, age FROM worries JOIN users ON worries.user_id = users.id WHERE users.age < ? ORDER BY RANDOM() LIMIT 100 `, [age], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
});

// GET SELECTED WORRY INFO
app.get("/api/load-worry/:id", (req, res) => {
  console.log("=== load worry handler");
  // Return the information of the worried users
  const id = req.params.id;
  db.all(`SELECT worry, nickname, age FROM worries JOIN users ON worries.user_id = users.id WHERE worries.id = ?`, [id], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows[0]);
  });
});

app.get("/api/load-answers/:id", (req, res) => {
  const id = req.params.id;
  db.all(`SELECT worry_id, answer, answers.nickname, answers.age FROM answers WHERE worry_id = ?`, [id], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
});
  

//POST REQUESTS
app.post("/api/users", (req, res) => {
  console.log("=== post user handler");
  console.log(req.body);
  db.all("select * from users where email = ?", [req.body.email], (err, rows) => {
    if (err) {
      console.log("=== error getting user by email");
      // console.log(err);
      // console.log(req.body.email);
      res.status(500);
      return;
    }
    console.log("=== user by email");
    console.log(rows);
    res.status(200).json(rows);
  })
});

app.post("/api/submit-answer", (req, res) => {
  console.log("=== submit answer handler");
  console.log(req.body);

  const answer = req.body;

  db.run(
    `INSERT INTO answers(worry_id, nickname, country, age, answer) VALUES(?,?,?,?,?)`,
    [answer.worry_id, answer.nickname, answer.country, answer.age, answer.answer],
    function (err) {
      if (err) {
        console.log(err.message);
        res.json({ error: err.message });
        return;
      }

      const anserId = this.lastID;

      db.all(`select email, answers.nickname, answers.age from answers join worries on answers.worry_id = worries.id join users on worries.user_id = users.id where answers.worry_id = ? and answers.id = ?`, [answer.worry_id, anserId], (err, rows) => {
        if (err) {
          throw err;
        }

        const answer = req.body.answer;

        const mailOptions = {
          from: 'iamyurith@gmail.com',
          to: rows[0].email,
          subject: 'Good news! Someone in your shoes has answered your worry',
          text: `
          ${answer}
          from: ${rows[0].nickname}
          age: ${rows[0].age}
          
          If you it was not you who submitted the worry, please send us a request to delete your email from our database to iamyurith@gmail.com`
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        res.status(200).json({});
      });
    }
  );
});

//PUT REQUEST
app.put("/api/users", (req, res) => {
  console.log("=== put user handler");
  // console.log(req.body);
  const user = req.body;
  db.run(
    `INSERT INTO users(nickname, age, country, email) VALUES(?,?,?,?)`,
    [user.nickname, user.age, user.country, user.email],
    function (err, rows) {
      if (err) {
        console.log(err.message);
        res.json({ error: err.message });
        return;
      }
      // get the last insert id
      res.status(200).json(this.lastID);
    }
  );
});

// PUT WORRIES ADDING A SUMMARY FROM CHAT GPT
app.put("/api/worries", (req, res) => {
  console.log("=== put worry handler");
  console.log(req.body);

  const worry = req.body;
  
  OpenAIClient.chat.completions.create({
    messages: [
      { role: 'system', content: 'Make a short summary of max 20 words of the worry.' },
      { role: 'user', content: req.body.worry },
    ],
    model: 'gpt-3.5-turbo',
  }).then(response => {
    const summary = response.choices[0].message.content;
    db.run(
      `INSERT INTO worries(user_id, worry, summary) VALUES(?,?,?)`,
      [worry.user_id, worry.worry, summary],
      function (err) {
        if (err) {
          console.log(err.message);
          res.json({ error: err.message });
          return;
        }
        console.log("=== put worry success");
        res.status(200).json({});
      }
    );
  });
});

app.use(express.static('../dist'));

app.get("/", function (req, res) {
  const p = path.resolve(__dirname + "/../dist" + "/index.html");
  res.sendFile(p);
});

app.listen(5000, () => console.log("Server running on port 5000"));

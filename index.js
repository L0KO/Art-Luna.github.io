const express = require('express');
const nodemailer = require("nodemailer");
const bodyparser = require('body-parser');
const path = require('path');
const { isUndefined } = require('util');
const app = express();
const port = 3000;
app.use(express.static('public'));
app.use(bodyparser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile('./index.html', {
    root: path.join(__dirname, './')
  })
})

app.get('/news', (req, res) => {
  res.sendFile('./news.html', {
    root: path.join(__dirname, './')
  })
})

app.get('/creativity', (req, res) => {
  res.sendFile('./creativity.html', {
    root: path.join(__dirname, './')
  })
})

app.get('/vocation', (req, res) => {
  res.sendFile('./vocation.html', {
    root: path.join(__dirname, './')
  })
})

app.get('/onlineLections', (req, res) => {
  res.sendFile('./onlineLections.html', {
    root: path.join(__dirname, './')
  })
})

app.get('/masterClass', (req, res) => {
  res.sendFile('./masterClass.html', {
    root: path.join(__dirname, './')
  })
})

app.post('/masterClass', (req, res) => {
  // console.log(req.body.name, req.body.phone)
  main("Мастер-класс", req.body.name + ": " + req.body.phone + "<br> хочет записаться на мастер-класс");
  res.redirect('/masterClass')
})

app.get('/abonements', (req, res) => {
  res.sendFile('./abonements.html', {
    root: path.join(__dirname, './')
  })
})

app.post('/abonements', (req, res) => {
  // console.log(req.body)
  let text = `Заказчик: ${req.body.parent_FIO}, <br>\n`
  if (req.body.eightLessons && typeof (req.body.eightLessons) != "undefined") {
    text += "Желает абонемент на 8 занятий, <br>\n"
  }
  if (req.body.fourLessons && typeof (req.body.fourLessons) != "undefined") {
    text += "Желает абонемент на 4 занятия, <br>\n"
  }
  if (req.body.oneLesson && typeof (req.body.oneLesson) != "undefined") {
    text += "Желает разовое занятие, <br>\n"
  }
  if (req.body.privateLesson && typeof (req.body.privateLesson) != "undefined") {
    text += "Желает индивидуальный урок, <br>\n"
  }
  text += `Для ${req.body.Child_FIO} ${req.body.child_age} лет,<br><br>\n\n`
  text += `${req.body.parent_Email} <br>\n`
  text += `${req.body.phone}`
  console.log(text);
  main("Абонемент", text);
  res.redirect('/abonements')
})

app.get('/myWork', (req, res) => {
  res.sendFile('./myWork.html', {
    root: path.join(__dirname, './')
  })
})

app.get('/myStudentsWork', (req, res) => {
  res.sendFile('./myStudentsWork.html', {
    root: path.join(__dirname, './')
  })
})

app.get('/feedback', (req, res) => {
  res.sendFile('./feedback.html', {
    root: path.join(__dirname, './')
  })
})

app.post('/feedback', (req, res) => {
  // console.log(req.body)
  main("Отзыв", `${req.body.text} <br><br>\n\n ${req.body.mail}`);
  res.redirect('/feedback')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

async function main(subject, text) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.mail.ru",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'daria-ukhova@mail.ru', // generated ethereal user
      pass: 'rCgXBJ4h9gazffjPy3MM', // generated ethereal password
    },
  });
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"daria-ukhova@mail.ru', // sender address
    to: "eucalipttree@mail.ru", // list of receivers
    subject: `${subject}`, // Subject line
    text: "", // plain text body
    html: `${text}`, // html body
  });
  console.log("Message sent: %s", info.messageId);
}
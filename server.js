jest.mock('fs', () => ({
  existsSync: jest.fn(),
  writeFileSync: jest.fn()
}));

const request = require('supertest');
const fs = require('fs');
const app = require('./server');

app.use(express.urlencoded({ extended: true }));
app.use('/posts', express.static(__dirname + '/posts'));

app.post("/newpost", (req, res) => {
  let number = 1;
  while (fs.existsSync(`posts/post${number}.html`)) number++;

  const { title, content } = req.body;

  const html = `
<!DOCTYPE html>
<html lang="fi">
<head>
<meta charset="UTF-8" />
<title>${title}</title>
</head>
<body>
<h1>${title}</h1>
<p>${content.replace(/\n/g,"<br>")}</p>
</body>
</html>`;

  fs.writeFileSync(`posts/post${number}.html`, html);

  res.redirect(`/posts/post${number}.html`);
});

/* ✅ IMPORTANT */
if (require.main === module) {
  app.listen(3000, () =>
    console.log("Palvelin käynnissä → http://localhost:3000")
  );
}

module.exports = app;
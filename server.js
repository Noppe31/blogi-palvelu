const fs = require("fs");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use('/posts', express.static(__dirname + '/posts')); // uusi polku

app.post("/newpost", (req, res) => {
    let number = 1;
    while (fs.existsSync(`posts/post${number}.html`)) number++; // tarkista oikea polku

    const title = req.body.title;
    const content = req.body.content;

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
    console.log("Luotu:", `posts/post${number}.html`);

    res.redirect(`/posts/post${number}.html`);
});

app.listen(3000, () => console.log("Palvelin käynnissä → http://localhost:3000"));
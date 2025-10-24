# blogi-sivusto

Siisti ja yksinkertainen staattinen blogipohja.

Tiedostot lisätty:

- `index.html` — etusivu, luettelo artikkeleista
- `styles.css` — kevyt responsiivinen tyylitiedosto
- `posts/post1.html`, `posts/post2.html` — kaksi esimerkkikirjoitusta

Uusi toiminnallisuus:

- `create.html` — lomake, jolla kuka tahansa voi lisätä blogikirjoituksen selaimessa. Julkaisut tallennetaan käyttäjän selaimen localStorageen.
- `viewer.html` — lukusivu käyttäjän lisäämille julkaisuilla.

Huom: tällä toteutuksella julkaisut tallentuvat vain paikallisesti selaimeen. Jos haluat että kuka tahansa (eri käyttäjät) voi lisätä ja nähdä toistensa julkaisut, tarvitaan palvelin ja tallennus (esim. Node + SQLite / Firebase / tms.).

Näin katsot sivustoa paikallisesti (tarvitset Pythonin tai muun pienen HTTP-palvelimen):

```powershell
# Python 3:n mukana tuleva yksinkertainen palvelin
python -m http.server 8000

# Selaimella avaa:
http://localhost:8000/
```

Voit myös avata `index.html` suoraan tiedostona, mutta joissain selaimissa linkkien ja resurssien lataus voi toimia luotettavammin paikallisen HTTP-palvelimen yli.

Seuraavat askeleet (ehdotus):
- Lisää artikkelit `posts/`-hakemistoon
- Harkitse Markdown -> HTML -käännöstä staattisella generaattorilla (esim. Eleventy, Hugo)
- Lisää RSS/JSON-feed ja hakutoiminto tarvittaessa

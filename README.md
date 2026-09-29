# Geo Map - Mouza Viewer (GitHub Pages)

Halka (light) PWA: mobile me install hoti hai, jaldi khulti hai, offline bhi chalti hai.
KML / KMZ / GeoJSON teeno support. Feet me measurement, area (sq ft / marla / kanal / acre).

## Upload kaise karein
1. GitHub par nayi repo banayein (Public), is folder ki **saari files** upload karein (`Add file > Upload files`).
2. `Settings > Pages > Branch: main / (root) > Save`.
3. Link: `https://<username>.github.io/<repo-name>/`
4. Mobile Chrome me link kholen > menu > **Install app** (ya app ke andar ⬇ button).

## Naya mouza kaise add karein (sirf 2 kaam)
1. File (`.geojson`, `.kml` ya `.kmz`) `data/` folder me upload karein.
2. `mouza-list.txt` kholen aur aik nayi line me naam likhein, Commit karein. Bas.

Line ke formats:
```
175p                     # data/175p.geojson / .kml / .kmz khud dhoond lega
Goth Jungo.kmz           # exact file naam
Chak 175/P = 175p.kmz    # dropdown me "Chak 175/P" dikhega
```
Website har baar `mouza-list.txt` taza parhti hai, is liye naya mouza foran dropdown me aa jata hai.

## Tips
- KMZ bhari ho to GeoJSON use karein (generator se "Export GeoJSON"). GitHub par gzip hoti hai, is liye tez khulti hai.
- Kisi mouza ka seedha link: `...github.io/<repo>/?m=175p`
- File replace karein to app kholte hi purani dikhegi, phir "File update hui" ka message aayega, us par tap karein.
- Phone se koi bhi file seedha kholne ke liye 📂 button.

## Tools
- 📏 Distance (feet + meter, har segment ke feet) | ⬚ Area (sq ft, marla, kanal, acre)
- ◎ GPS | 🗺 Satellite / Esri / Streets | ⤢ Mouza fit
- Search box: `28.30,70.12` ya killa/block ka naam (dobara Enter = agla match)
- Kisi killa/muraba/block par tap = detail

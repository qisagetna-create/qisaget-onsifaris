# Qisaget

Bio üçün tək link platformasının açılış səhifəsi və addım-addım qeydiyyat axını.

## İşə salmaq

Kompüterdə Node.js 18 və ya daha yeni versiya olmalıdır.

```bash
npm install
npm run dev
```

Sonra brauzerdə http://localhost:3000 ünvanını aç. Port dəyişmək üçün: `PORT=4000 npm run dev`.

Layihədə kənar paket yoxdur, ona görə `npm install` heç nə yükləmir və dərhal bitir.

## Struktur

```
public/
  index.html        Açılış səhifəsi və qeydiyyat pəncərəsinin boş qabığı
  css/style.css     Bütün üslublar (qeydiyyat axını #reg altındadır)
  js/landing.js     Menyu, sual-cavab, sabit menyu çərçivəsi
  js/signup.js      Qeydiyyat axını (hər ekran bir funksiyadır)
server.js           Yerli server
```

## Qeydiyyat axını

Landing-də link adı yazılır, sonra: e-poçt, istifadəçi adı, kod, plan, məqsəd, platformalar, linklər, profil, tema, admin paneli.

## Hələ qoşulmayıb

- Məlumatlar serverə getmir, yalnız brauzerdə qalır.
- `js/signup.js` başında `DEMO = true` var: real e-poçt göndərilmir, istənilən 6 rəqəm qəbul olunur. Supabase qoşanda `false` edin.
- Supabase üçün yerlər kodda şərh kimi qeyd olunub: `u1()` (istifadəçi adı yoxlanışı) və `c1()` (kodun təsdiqi).
- Google ilə giriş, "Daxil ol", Pro planlar və footer sosial linkləri (`#`) hələ aktiv deyil.

## GitHub-a yükləmək

```bash
git init
git add .
git commit -m "Qisaget ilk versiya"
git branch -M main
git remote add origin https://github.com/ISTIFADECI/qisaget.git
git push -u origin main
```

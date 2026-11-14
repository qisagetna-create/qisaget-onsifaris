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

## Supabase qoşmaq (ön sifariş və e-poçt kodu)

1. supabase.com-da layihə yarat.
2. SQL Editor-da `supabase/schema.sql` faylının içindəkini işə sal. Bu, `preorders` cədvəlini və qaydaları yaradır.
3. Authentication, sonra Email Templates bölməsində "Confirm signup" və "Magic Link" şablonlarına `{{ .Token }}` yaz. E-poçtla gedən 6 rəqəmli kod budur. Məsələn: `Qisaget təsdiq kodun: {{ .Token }}`
4. Project Settings, sonra API bölməsindən "Project URL" və "anon public" açarını `public/js/config.js` faylına yaz. `service_role` açarını heç yerə yazma.
5. `npm run dev` ilə yoxla. Sifarişləri Supabase panelində Table Editor, sonra `preorders` bölməsində görürsən.

Supabase-in daxili e-poçt göndərməsi saatda cəmi bir neçə mesajla məhdudlaşır. Çoxlu istifadəçi üçün Project Settings, sonra Authentication bölməsində öz SMTP xidmətini (məsələn Resend) qoş.

`config.js` boş qalarsa, sayt demo rejimdə işləyir.

## Hələ qoşulmayıb

- Profil şəkli hələ Supabase-ə yüklənmir, yalnız brauzerdə qalır.
- Açıq profil səhifəsi (`qisaget.az/ad`) hələ yoxdur.
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

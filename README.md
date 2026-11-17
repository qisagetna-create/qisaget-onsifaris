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
  info.html         Footer keçidləri üçün məlumat səhifəsi
  admin.html        İdarə paneli (/admin): məzmun, başlıq, dizayn, önizləmə
  css/style.css     Bütün üslublar (qeydiyyat axını #reg altındadır)
  js/landing.js     Menyu, sual-cavab, sabit menyu çərçivəsi
  js/signup.js      Qeydiyyat axını (hər ekran bir funksiyadır)
  js/footer-pages.js Footer səhifələrinin məzmunu və keçidləri
server.js           Yerli server
vercel.json         Vercel ayarı (public qovluğu, /admin qısa ünvanı)
supabase/schema.sql Cədvəl, qaydalar, şəkil anbarı
```

## Qeydiyyat axını

Landing-də link adı yazılır, sonra: e-poçt, istifadəçi adı, kod, plan, məqsəd, platformalar, linklər, profil, tema. Tema addımından sonra istifadəçi `/admin` panelinə keçir.

## Supabase qoşmaq (ön sifariş və e-poçt kodu)

1. supabase.com-da layihə yarat.
2. SQL Editor-da `supabase/schema.sql` faylının içindəkini işə sal. Bu, `preorders` cədvəlini və qaydaları yaradır.
3. Authentication, sonra Email Templates bölməsində "Confirm signup" və "Magic Link" şablonlarına `{{ .Token }}` yaz. E-poçtla gedən 6 rəqəmli kod budur. Məsələn: `Qisaget təsdiq kodun: {{ .Token }}`
4. Project Settings, sonra API bölməsindən "Project URL" və "anon public" açarını `public/js/config.js` faylına yaz. `service_role` açarını heç yerə yazma.
5. `npm run dev` ilə yoxla. Sifarişləri Supabase panelində Table Editor, sonra `preorders` bölməsində görürsən.

Supabase-in daxili e-poçt göndərməsi saatda cəmi bir neçə mesajla məhdudlaşır. Çoxlu istifadəçi üçün Project Settings, sonra Authentication bölməsində öz SMTP xidmətini (məsələn Resend) qoş.

`config.js` boş qalarsa, sayt demo rejimdə işləyir.

### Google ilə giriş

Google ilə giriş düyməsi Supabase OAuth-dan istifadə edir; işləməsi üçün Google və Supabase panellərində birdəfəlik sazlama lazımdır:

1. Google Cloud Console-da OAuth 2.0 Web client yarat. Authorized redirect URI kimi `https://lfnuyzzmfcnkfwfrbktw.supabase.co/auth/v1/callback` əlavə et.
2. Supabase Dashboard-da Authentication → Sign In / Providers → Google bölməsində Google Client ID və Client Secret-i daxil edib provider-i aktiv et.
3. Authentication → URL Configuration → Redirect URLs siyahısına lokal `http://localhost:4321/` və yayımdakı saytın tam URL-ni əlavə et.
4. Client Secret-i yalnız Supabase Dashboard-a daxil et; `config.js`-ə, GitHub-a və ya brauzer koduna yazma.

Giriş zamanı Google hesab seçimi soruşulur. Yeni Google istifadəçisi təsdiqdən sonra istifadəçi adını seçib qeydiyyata davam edir. Mövcud hesabda profil varsa, əvvəlki qeydiyyat bərpa olunur.

### Məlumat necə saxlanır

- Kod təsdiqlənən kimi e-poçt və istifadəçi adı `preorders` cədvəlinə yazılır. Sonra plan, məqsəd, platformalar, linklər, ad, bio və tema hər addımda yenilənir.
- Eyni cihazda sayta yenidən girəndə sessiya yadda qalır və istifadəçi birbaşa admin panelə düşür. Başqa cihazda "Daxil ol" düyməsi admin panelin giriş səhifəsinə aparır, e-poçta gələn kodla daxil olur. Yalnız qeydiyyatdan keçmiş e-poçtlar daxil ola bilir.
- Admin panelin məlumatı (ad, bio, linklər, sosial hesablar, dizayn, şəkil) `preorders.profile` sütununda saxlanır. İlk girişdə qeydiyyatdakı məlumatlardan avtomatik hazırlanır. Profil şəkli `media` anbarına yüklənir.
- Admin paneldə "Ön sifariş" nişanı göstərilir. "Paylaş" düyməsi hələlik linkin hazır olanda e-poçta göndəriləcəyini bildirən mesaj göstərir.
- Admin paneldə istifadəçi adını dəyişəndə yeni ad `username_taken` ilə yoxlanılır və `preorders` cədvəlində yenilənir.

Supabase-də `supabase/schema.sql` faylının bütün hissələrini işə salmaq lazımdır, çünki admin panel `profile` sütunundan və `media` anbarından istifadə edir.

## Hələ qoşulmayıb

- Açıq profil səhifəsi (`qisaget.az/ad`) hələ yoxdur. Admin paneldəki "Öz səhifəni aç" düyməsi bu səbəbdən mesaj göstərir.
- Admin paneldə Kolleksiya, Mağaza ödənişi və Gücləndir bölmələri "Tezliklə" göstərir.
- Google OAuth düyməsinin işləməsi üçün Supabase-də Google Client ID/Secret sazlanmalıdır; Pro planlar və footer sosial linkləri (`#`) hələ aktiv deyil.
- Footer-in məlumat keçidləri `info.html?page=...` ünvanında açılır. Hazır olmayan xidmətlər həmin səhifələrdə aktiv funksiya kimi təqdim edilmir; hüquqi mətnlər yayımdan əvvəl yoxlanmalıdır.

## Vercel-də yayımlamaq

Landing və admin panel eyni domendə qalır: `sayt.vercel.app` və `sayt.vercel.app/admin`. Domen alınanda bu `qisaget.az` və `qisaget.az/admin` olur. Menyudakı "Daxil ol" düyməsi `/admin`-ə aparır. Ayrı domenlərdə brauzer girişi ötürmədiyi üçün qeydiyyatdan sonra ikinci kod tələb olunardı, ona görə bir domen saxlanılır.

GitHub reposunu Vercel-ə bağla. `vercel.json` faylı `public` qovluğunu yayımlayır və `/admin` ünvanını `admin.html` ilə eyniləşdirir. Supabase-də Authentication, URL Configuration bölməsinə Vercel və qisaget.az ünvanlarını yaz.

## GitHub-a yükləmək

```bash
git init
git add .
git commit -m "Qisaget ilk versiya"
git branch -M main
git remote add origin https://github.com/ISTIFADECI/qisaget.git
git push -u origin main
```

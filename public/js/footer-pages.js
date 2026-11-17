(function () {
  'use strict';

  var groups = [
    { title: 'Şirkət', links: [
      ['Qisaget Bloqu', 'blog'],
      ['Mühəndislik Bloqu', 'engineering'],
      ['Bazar', 'marketplace'],
      ['Alətlər', 'tools'],
      ['Yeniliklər', 'updates'],
      ['Haqqımızda', 'about'],
      ['Əlaqə', 'contact']
    ]},
    { title: 'İcma', links: [
      ['Müəssisə üçün Qisaget', 'business'],
      ['Yaradıcı hesabatı', 'creator-insights'],
      ['Profil kataloqu', 'discover'],
      ['Şablonlar', 'templates']
    ]},
    { title: 'Dəstək', links: [
      ['Yardım mövzuları', 'help'],
      ['Başlamaq', 'getting-started'],
      ['Qisaget Pro', 'pro'],
      ['Xüsusiyyətlər və təlimatlar', 'features'],
      ['Tez-tez verilən suallar', 'faq']
    ]},
    { title: 'Etibar və Hüquqi', links: [
      ['Şərtlər və qaydalar', 'terms'],
      ['Məxfilik bildirişi', 'privacy'],
      ['Kuki bildirişi', 'cookies'],
      ['Etibar mərkəzi', 'trust'],
      ['İnsan hüquqları', 'human-rights']
    ]}
  ];

  var pages = {
    blog: {
      group: 'Şirkət',
      title: 'Rəqəmsal görünüşünüzü daha yaxşı qurun.',
      lead: 'Qisaget-dən istifadə, şəxsi brend, sosial media və onlayn auditoriya barədə praktik məqalələr.',
      sections: [
        { title: 'Bloqda nə olacaq?', text: 'Məqalələr şəxsi brend, sosial media, kiçik biznes və Qisaget-dən istifadə mövzularında faydalı məsləhətlər təqdim edəcək.' },
        { title: 'Hazırkı vəziyyət', text: 'Bloqda hələ dərc olunmuş məqalə yoxdur. Yeni yazılar hazır olduqda burada görünəcək.' }
      ],
      status: 'Bloq məzmunu hazırlanır; hazırda dərc olunmuş yazı yoxdur.'
    },
    engineering: {
      group: 'Şirkət',
      title: 'Qisaget necə qurulur və inkişaf edir?',
      lead: 'Məhsulun arxasındakı texnologiya, yeniliklər və texniki qərarlar haqqında məlumat.',
      sections: [
        { title: 'Mövzular', items: ['Məhsul və dizayn qərarları', 'Performans və əlçatanlıq', 'Təhlükəsizlik və inteqrasiyalar'] },
        { title: 'Hazırkı vəziyyət', text: 'Texniki bloqda hələ dərc olunmuş yazı yoxdur. Yayımlanacaq məlumatlar real məhsul dəyişikliklərinə əsaslanacaq.' }
      ],
      status: 'Texniki bloq hələ aktiv deyil.'
    },
    marketplace: {
      group: 'Şirkət',
      title: 'Səhifənizə uyğun görünüşü seçin.',
      lead: 'Müxtəlif məqsədlər üçün hazırlanmış profil dizaynlarını araşdırın.',
      sections: [
        { title: 'Hazırda nə mümkündür?', text: 'Qeydiyyat zamanı hazır tema seçib profil görünüşünü önizləyə bilərsiniz. İdarə panelində də dizaynı fərdiləşdirmək mümkündür.' },
        { title: 'Bazarın vəziyyəti', text: 'Hazır şablonları paylaşmaq və ya almaq imkanı verən bazar hazırda işləmir. Bu səhifə ödəniş və ya şablon satışı vəd etmir.' }
      ],
      status: 'Şablon bazarı hələ istifadəyə verilməyib.'
    },
    tools: {
      group: 'Şirkət',
      title: 'İşinizi asanlaşdıran alətlər.',
      lead: 'Profilinizi qurmaq və paylaşmağa hazırlamaq üçün Qisaget-də olan imkanlardan istifadə edin.',
      sections: [
        { title: 'Profil önizləməsi', text: 'Qeydiyyat və dizayn addımlarında seçdiyiniz temanı və profil məlumatlarını önizləyə bilərsiniz.' },
        { title: 'Link yoxlaması', text: 'Profilə əlavə etdiyiniz platforma linkləri uyğun domen və format baxımından yoxlanılır.' },
        { title: 'Hələ mövcud olmayan alətlər', text: 'QR kod yaratma və UTM qurucusu hazırda aktiv deyil.' }
      ],
      status: 'Yalnız mövcud olan profil önizləməsi və link yoxlaması təqdim edilir.'
    },
    updates: {
      group: 'Şirkət',
      title: 'Qisaget-də nə yenidir?',
      lead: 'Platformada baş verən real dəyişikliklər və vacib elanlar burada paylaşılacaq.',
      sections: [
        { title: 'Hazırkı prototip', text: 'Qisaget-də e-poçt kodu ilə qeydiyyat, profil məlumatlarının redaktəsi, link əlavə etmə və tema seçimi var.' },
        { title: 'Yeniliklərin paylaşılması', text: 'Yalnız tətbiq edilmiş və istifadə oluna bilən dəyişikliklər yenilik kimi qeyd ediləcək. Hazırda ayrıca tarixli yenilik siyahısı yoxdur.' }
      ],
      status: 'Yeniliklər lentində hələ dərc olunmuş elan yoxdur.'
    },
    about: {
      group: 'Şirkət',
      title: 'Rəqəmsal dünyada bir ünvan.',
      lead: 'Qisaget vacib linklərinizi, sosial profillərinizi və məzmununuzu bir fərdi səhifədə toplamağa kömək edən bio-link platformasıdır.',
      sections: [
        { title: 'Hansı problemi həll edir?', text: 'Sosial şəbəkələr və başqa kanallar arasında dağılmış keçidləri bir ünvanda paylaşmağı asanlaşdırır.' },
        { title: 'İnkişaf prinsipləri', items: ['Sadə və anlaşıqlı istifadə', 'Məhsulun hazırkı imkanları barədə şəffaflıq', 'İstifadəçinin öz profilinə nəzarəti'] },
        { title: 'Missiyamız', text: 'İnsanların və bizneslərin rəqəmsal mövcudluğunu daha rahat idarə etməsinə kömək etmək.' }
      ]
    },
    contact: {
      group: 'Şirkət',
      title: 'Sizə necə kömək edə bilərik?',
      lead: 'Sualınız, təklifiniz və ya əməkdaşlıq müraciətiniz varsa, Qisaget ilə əlaqə saxlamaq üçün bu səhifədən istifadə edə bilərsiniz.',
      sections: [
        { title: 'Əlaqə kanalı', text: 'Müraciət formu və dəstək e-poçtu hələ qoşulmayıb. Buna görə mesajın göndərildiyini bildirən forma göstərmirik.' },
        { title: 'Müraciət mövzuları', items: ['Texniki dəstək', 'Hesab və profil', 'Əməkdaşlıq və media'] }
      ],
      status: 'Əlaqə kanalı hazırlanır. Hələlik bu səhifə mesaj göndərmir.'
    },
    business: {
      group: 'İcma',
      title: 'Brendinizin vacib keçidləri bir yerdə.',
      lead: 'Məhsulları, əlaqə kanallarını, sosial profilləri və kampaniyaları vahid səhifədə təqdim etmək üçün Qisaget profilindən istifadə edin.',
      sections: [
        { title: 'Kimlər üçün?', items: ['Kiçik mağaza və restoranlar', 'Xidmət göstərən şirkətlər', 'Agentliklər və tədbir təşkilatçıları'] },
        { title: 'Bu gün istifadə edə biləcəyiniz imkanlar', text: 'Profil adı, bio, linklər və dizaynı fərdiləşdirib vahid profil linki yarada bilərsiniz.' },
        { title: 'Məhdudiyyətlər', text: 'Komanda hesabları, biznes analitikası və kartla ödəniş funksiyaları hazırda mövcud deyil.' }
      ],
      cta: ['Biznes profilinizi yaradın', '/#signup']
    },
    'creator-insights': {
      group: 'İcma',
      title: 'Auditoriyanızla əlaqənizi ölçün.',
      lead: 'Profil baxışları və link klikləri kimi göstəricilər məzmununuzun necə qarşılandığını anlamağa kömək edə bilər.',
      sections: [
        { title: 'Analitika haqqında', text: 'Qisaget-də hazırda real profil baxışları və link kliklərini hesablayan analitika yoxdur.' },
        { title: 'Məxfilik', text: 'İstifadəçi analitikası yaradıldıqda şəxsi göstəricilər yalnız profil sahibinə göstərilməlidir. Hazırda bu məlumatları təqdim etmirik.' }
      ],
      status: 'Analitika paneli hələ istifadəyə verilməyib.'
    },
    discover: {
      group: 'İcma',
      title: 'Maraqlı profilləri kəşf edin.',
      lead: 'İctimai paylaşılmış yaradıcıları, biznesləri və layihələri araşdırmaq üçün nəzərdə tutulan profil kataloqu.',
      sections: [
        { title: 'İctimai görünürlük', text: 'Profil kataloqu hazırda aktiv deyil və istifadəçi profillərini axtarışda göstərmir.' },
        { title: 'İcazə və məxfilik', text: 'Kataloq istifadəyə veriləndə yalnız ictimai görünməyə razılıq verən profillər orada göstərilməlidir.' }
      ],
      status: 'Profil kataloqu hələ mövcud deyil.'
    },
    templates: {
      group: 'İcma',
      title: 'Öz üslubunuza uyğun şablon seçin.',
      lead: 'Məqsədinizə uyğun görünüşü seçin və profilinizi fərdiləşdirin.',
      sections: [
        { title: 'Tema seçimi', text: 'Qeydiyyatın tema addımında mövcud dizayn seçimlərini önizləyib birini seçə bilərsiniz. İdarə panelində əlavə dizayn parametrləri də var.' },
        { title: 'Şablon bazarı', text: 'Şablonları ayrıca kəşf etmək və paylaşmaq üçün kataloq hələ yoxdur.' }
      ],
      cta: ['Profil yaratmağa başla', '/#signup']
    },
    help: {
      group: 'Dəstək',
      title: 'Qisaget-dən istifadə ilə bağlı kömək.',
      lead: 'Hesabınızı qurmaq və profilinizi fərdiləşdirmək üçün əsas məlumatlar.',
      sections: [
        { title: 'Hesab və giriş', text: 'Qeydiyyat zamanı e-poçt ünvanınızı təsdiqləmə kodu ilə yoxlayın. Mövcud hesabınıza /admin səhifəsindən daxil ola bilərsiniz.' },
        { title: 'Profil və linklər', text: 'İdarə panelində profil məlumatlarını, sosial hesabları, linkləri və dizaynı redaktə edə bilərsiniz.' },
        { title: 'QR kod və statistika', text: 'QR kod və istifadə statistikası hazırda aktiv deyil.' },
        { title: 'Daha çox kömək', text: 'Dəstək müraciəti üçün ayrıca forma və e-poçt kanalı hələ qurulmayıb.' }
      ]
    },
    'getting-started': {
      group: 'Dəstək',
      title: 'Qisaget səhifənizi bir neçə addımda yaradın.',
      lead: 'İlk profilinizi hazırlamaq üçün mövcud qeydiyyat axınını izləyin.',
      sections: [
        { title: '1. Link adını seçin', text: 'Ana səhifədə qisaget.az/ ünvanından sonra istifadə etmək istədiyiniz adı daxil edin.' },
        { title: '2. Hesabı təsdiqləyin', text: 'E-poçt ünvanınızı yazın, istifadəçi adınızı seçin və e-poçta gələn 6 rəqəmli kodu daxil edin.' },
        { title: '3. Profilinizi qurun', text: 'Məqsədinizi və platformaları seçin, linklərinizi əlavə edin, adınızı, bio-nu və profil şəklinizi daxil edin.' },
        { title: '4. Görünüşü seçin', text: 'Tema seçib profil önizləməsinə baxın. Sonra idarə panelində profilinizi yeniləyə bilərsiniz.' },
        { title: '5. Paylaşım', text: 'Hazırda açıq profil səhifəsi və QR kod hələ yoxdur; bu imkanlar istifadəyə veriləndə buradan paylaşmaq mümkün olacaq.' }
      ],
      cta: ['İndi profil yarat', '/#signup']
    },
    pro: {
      group: 'Dəstək',
      title: 'Daha çox imkan üçün Qisaget Pro.',
      lead: 'Ödənişli planın üstünlükləri yalnız real funksiyalar və təsdiqlənmiş qiymətlərlə təqdim edilməlidir.',
      sections: [
        { title: 'Hazırkı vəziyyət', text: 'Qisaget Pro, ödəniş qəbulu və plan müqayisəsi hələ aktiv deyil.' },
        { title: 'Ödəniş barədə', text: 'Qiymət, ödəniş üsulu və ləğv qaydaları təsdiqlənməyib. Buna görə bu səhifədə ödəniş düyməsi və saxta qiymət göstərilmir.' }
      ],
      status: 'Pro plan hələ istifadəyə verilməyib.'
    },
    features: {
      group: 'Dəstək',
      title: 'Qisaget imkanlarını kəşf edin.',
      lead: 'Profilinizi qurmaq və fərdiləşdirmək üçün hazırda mövcud olan əsas imkanlarla tanış olun.',
      sections: [
        { title: 'Profil', text: 'Ad, bio və profil şəklini əlavə edin, sonra səhifə görünüşü üçün tema seçin.' },
        { title: 'Linklər', text: 'Sosial platforma və digər veb linklərini profilinizə əlavə edib redaktə edin.' },
        { title: 'İdarə paneli', text: 'Profil məlumatlarını, linkləri və dizaynı idarə panelindən yeniləyin.' },
        { title: 'Hələ mövcud olmayanlar', text: 'İctimai profil səhifəsi, QR kod və analitika hazırda istifadəyə verilməyib.' }
      ],
      cta: ['İdarə panelinə keç', '/admin']
    },
    faq: {
      group: 'Dəstək',
      title: 'Tez-tez verilən suallar',
      lead: 'Qisaget hesabı və hazırkı imkanlarla bağlı qısa cavablar.',
      sections: [
        { title: 'Qisaget nədir?', text: 'Vacib linklərinizi bir fərdi səhifədə birləşdirməyə kömək edən bio-link platformasıdır.' },
        { title: 'Necə başlayım?', text: 'Qeydiyyatdan keçin, istifadəçi adınızı seçin və profil məlumatları ilə linklərinizi əlavə edin.' },
        { title: 'Qisaget pulsuzdurmu?', text: 'Hazırda ödənişli plan aktiv deyil. Gələcək planların şərtləri və limitləri təsdiqlənəndə açıqlanacaq.' },
        { title: 'Profil linkimi dəyişə bilərəmmi?', text: 'İdarə panelində istifadəçi adını dəyişmək mümkündür; yeni adın boş olması yoxlanılır.' },
        { title: 'QR kod və statistika varmı?', text: 'Xeyr, bu imkanlar hazırda aktiv deyil.' },
        { title: 'Məlumatlarımı kim görə bilər?', text: 'Hesab məlumatları istifadəçiyə bağlı saxlanır. İctimai profil səhifəsi hələ aktiv deyil.' }
      ],
      cta: ['Başlamaq', '/info.html?page=getting-started']
    },
    terms: {
      group: 'Etibar və Hüquqi',
      title: 'İstifadə şərtləri',
      lead: 'Bu məlumat səhifəsi Qisaget-in hazırkı prototipini izah edir; hüquqi baxımdan yekun istifadə müqaviləsi deyil.',
      sections: [
        { title: 'Xidmət', text: 'Qisaget istifadəçiyə hesab yaradıb profil məlumatlarını və linkləri idarə etməyə imkan verən prototipdir.' },
        { title: 'İstifadəçi məzmunu', text: 'Profilinizə əlavə etdiyiniz mətn, şəkil və linklərin məzmununa və paylaşmaq hüququna görə siz cavabdehsiniz.' },
        { title: 'Məhdudiyyətlər', text: 'Xidmətin funksiyaları dəyişə bilər; ictimai profillər, ödəniş və analitika hazırda aktiv deyil.' },
        { title: 'Hüquqi yoxlama', text: 'Qadağan olunmuş məzmun, hesabın dayandırılması, məsuliyyət və mübahisələrin həlli qaydaları hüquqşünas tərəfindən təsdiqlənməyib.' }
      ],
      status: 'Hüquqi sənəd deyil. Yayımdan əvvəl Azərbaycan qanunvericiliyinə uyğun hüquqi yoxlama tələb olunur.'
    },
    privacy: {
      group: 'Etibar və Hüquqi',
      title: 'Məxfilik bildirişi',
      lead: 'Bu ilkin məlumat hazırkı prototipdə istifadə olunan məlumat növlərini ümumi şəkildə izah edir; tam məxfilik siyasəti kimi qəbul edilməməlidir.',
      sections: [
        { title: 'Hansı məlumatlar saxlanır?', text: 'Qeydiyyat zamanı e-poçt və istifadəçi adı; profil qurarkən plan, məqsəd, platformalar, linklər, görünən ad, bio və tema saxlanıla bilər. Profil şəkli Supabase media anbarında saxlanır.' },
        { title: 'İstifadə məqsədi', text: 'Bu məlumatlar hesabı və profil parametrlərini işlətmək, giriş kodunu təsdiqləmək və idarə panelində məlumatları göstərmək üçün istifadə olunur.' },
        { title: 'Saxlama və provayderlər', text: 'Baza və autentifikasiya Supabase üzərində qurulub. Dəqiq saxlama müddəti, silinmə prosesi və məlumatların emalı şərtləri hələ sənədləşdirilməyib.' },
        { title: 'İstifadəçi hüquqları', text: 'Məlumatlara baxmaq, düzəliş və silinmə üçün dəstək prosesi hələ tətbiq edilməyib. İctimai yayımdan əvvəl real əlaqə kanalı və silinmə qaydası qurulmalıdır.' }
      ],
      status: 'İlkin məlumatdır, hüquqi yoxlama tələb edir; tam məxfilik siyasəti deyil.'
    },
    cookies: {
      group: 'Etibar və Hüquqi',
      title: 'Kuki bildirişi',
      lead: 'Saytın brauzerdə məlumat saxlama üsulları barədə hazırkı prototipə əsaslanan ilkin məlumat.',
      sections: [
        { title: 'Giriş sessiyası', text: 'Supabase autentifikasiyası giriş sessiyasını brauzerin lokal yaddaşında saxlaya bilər ki, istifadəçi təkrar daxil olanda hesabı tanısın.' },
        { title: 'Analitika və reklam', text: 'Layihənin hazırkı kodunda reklam və analitika kukiləri quraşdırılmayıb. Bu vəziyyət yayımdan əvvəl istifadə ediləcək bütün xidmətlərlə yenidən yoxlanmalıdır.' },
        { title: 'Üçüncü tərəf resursları', text: 'Səhifələr şrift və Supabase kitabxanası kimi xarici resurslardan istifadə edir. Bu provayderlərin öz texniki qaydaları ola bilər.' },
        { title: 'Seçimlər və yenilənmə', text: 'Kuki razılığını idarə edən ayrıca panel hələ yoxdur. Bu mətn məhsulun real konfiqurasiyasına uyğun hüquqi yoxlamadan keçməlidir.' }
      ],
      status: 'İlkin məlumatdır; hüquqi yoxlama və razılıq ehtiyacı qiymətləndirilməlidir.'
    },
    trust: {
      group: 'Etibar və Hüquqi',
      title: 'Qisaget-də təhlükəsizlik və etibar.',
      lead: 'Hesab və profil məlumatlarına diqqətlə yanaşmaq Qisaget-in əsas prinsiplərindəndir.',
      sections: [
        { title: 'Hesab məlumatları', text: 'Supabase-də istifadəçi səviyyəli RLS qaydaları aktivdir; hesab məlumatları istifadəçinin öz hesabına bağlanır.' },
        { title: 'Şübhəli link və profil', text: 'Şikayət göndərmək üçün forma və yoxlanmış təhlükəsizlik əlaqə kanalı hələ qurulmayıb. Təcili müraciət prosesi yayımdan əvvəl hazırlanmalıdır.' },
        { title: 'Təhlükəsizlik iddiaları', text: 'Qisaget bu səhifədə müstəqil təhlükəsizlik auditi və ya sertifikat iddiası etmir.' }
      ],
      status: 'Şikayət prosesi və əlaqə kanalı hələ aktiv deyil.'
    },
    'human-rights': {
      group: 'Etibar və Hüquqi',
      title: 'Hər kəs üçün açıq və əlçatan rəqəmsal məkan.',
      lead: 'Qisaget istifadəçi ləyaqətinə hörmət, ayrı-seçkiliyə yol verməmək və məxfiliyə diqqət prinsiplərini dəstəkləyir.',
      sections: [
        { title: 'Prinsiplər', items: ['Ayrı-seçkiliyə yol verməmək', 'İstifadəçi ləyaqətinə hörmət', 'Məxfilik və istifadəçi nəzarəti', 'Məhsulu daha əlçatan etməyə çalışmaq'] },
        { title: 'Əlçatanlıq', text: 'Klaviatura, kontrast və ekran oxuyucu uyğunluğu üzrə tam audit aparılmayıb; bu səbəbdən uyğunluq zəmanəti verilmir.' },
        { title: 'Müraciət kanalı', text: 'İnsan hüquqları və əlçatanlıqla bağlı müraciətlər üçün ayrıca əlaqə ünvanı hələ müəyyən edilməyib.' }
      ],
      status: 'Bu ilkin prinsiplər səhifəsidir; formal siyasət və müraciət prosesi hələ hazırlanmayıb.'
    }
  };

  function pageUrl(slug) {
    return 'info.html?page=' + encodeURIComponent(slug);
  }

  function setFooterLinks(root) {
    if (!root) return;
    root.querySelectorAll('a').forEach(function (link) {
      var label = link.textContent.trim();
      groups.some(function (group) {
        var item = group.links.find(function (entry) { return entry[0] === label; });
        if (!item) return false;
        link.href = pageUrl(item[1]);
        return true;
      });
    });
  }

  document.querySelectorAll('.footer').forEach(setFooterLinks);

  var footer = document.getElementById('info-footer');
  if (footer) {
    groups.forEach(function (group) {
      var column = document.createElement('div');
      var heading = document.createElement('h3');
      heading.textContent = group.title;
      column.appendChild(heading);
      group.links.forEach(function (entry) {
        var link = document.createElement('a');
        link.textContent = entry[0];
        link.href = pageUrl(entry[1]);
        column.appendChild(link);
      });
      footer.appendChild(column);
    });
    var bottom = document.createElement('div');
    bottom.className = 'info-bottom';
    bottom.textContent = '© 2026 Qisaget';
    footer.appendChild(bottom);
  }

  function addText(parent, tag, text, className) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    node.textContent = text;
    parent.appendChild(node);
    return node;
  }

  function renderPage() {
    var root = document.getElementById('info-content');
    if (!root) return;

    var slug = new URLSearchParams(location.search).get('page') || '';
    var page = pages[slug];
    if (!page) {
      page = {
        group: 'Məlumat',
        title: 'Bu səhifə tapılmadı',
        lead: 'Axtardığınız məlumat səhifəsi mövcud deyil.',
        sections: [{ title: 'Davam edin', text: 'Ana səhifəyə qayıdıb Qisaget haqqında məlumat ala bilərsiniz.' }],
        cta: ['Ana səhifəyə qayıt', '/']
      };
    }

    document.title = 'Qisaget — ' + page.title;
    root.replaceChildren();

    var article = document.createElement('article');
    article.className = 'info-article';
    addText(article, 'p', page.group, 'info-kicker');
    addText(article, 'h1', page.title);
    addText(article, 'p', page.lead, 'info-lead');

    page.sections.forEach(function (section) {
      var sectionNode = document.createElement('section');
      sectionNode.className = 'info-section';
      addText(sectionNode, 'h2', section.title);
      if (section.text) addText(sectionNode, 'p', section.text);
      if (section.items) {
        var list = document.createElement('ul');
        section.items.forEach(function (item) { addText(list, 'li', item); });
        sectionNode.appendChild(list);
      }
      article.appendChild(sectionNode);
    });

    if (page.status) addText(article, 'p', page.status, 'info-status');
    if (page.cta) {
      var cta = addText(article, 'a', page.cta[0], 'pill info-cta');
      cta.href = page.cta[1];
    }
    root.appendChild(article);
  }

  renderPage();
})();

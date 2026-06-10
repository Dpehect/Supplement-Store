SoftBridge Supplements - Proje Dokümantasyonu

Bu proje, siradan bir e-ticaret sitesinden cok daha otesini hedefleyen, cizgi roman (comic) stiliyle tasarlanmis, yuksek performansli ve tamamen interaktif bir supplement (sporcu gidalari) vitrinidir. Tasarimda hicbir hazir ikon veya emoji kullanilmamis, tum hissiyat tipografi, renk gecisleri ve ozel animasyonlar uzerinden kurgulanmistir. Arayuzun dogal, el yapimi ve profesyonel durmasina ozen gosterilmistir.

Kullanilan Teknolojiler ve Mimari

Proje, modern web standartlarinin en guncel surumleriyle insa edildi. Temelde Next.js 15 ve React 19 mimarisi uzerinde calisiyor. Tip guvenligi icin TypeScript, stillendirme ve tasarim sistemi icin Tailwind CSS (v3.4) kullanildi. 

Animasyonlar ve etkilesimler bu projenin kalbini olusturuyor. Basit CSS gecisleri yerine, endustri standardi olan GSAP (GreenSock) ve ScrollTrigger eklentisi kullanildi. Urun kartlarindaki dalgalanma (ripple) efektleri icin dogrudan WebGL ve GLSL custom shader'lar yazildi. Sepet ve siparis yonetimi icin React Context API kullanilarak global bir state yonetimi kuruldu.

Teknik Detaylar ve Ozellikler

Parcacik (Particle) Animasyonlu Acilis Ekrani (Preloader)
Kullanici siteye girdiginde siradan bir yuklenme bari gormez. HTML Canvas uzerinde calisan ozel bir parcacik simulasyonu baslar. Binlerce kucuk toz parcacigi, tipki bir supplement tozu gibi fizik kurallarina (yercekimi, ruzgar direnci, turbulans) uygun olarak ekrana savrulur ve merkezde toplanarak "SoftBridge Supplements" yazisini olusturur. Bu animasyon session storage ile kontrol edilir ve kullaniciyi yormamak adina oturum basina sadece bir kez gosterilir.

Iksonsuz ve Dinamik Tipografi
Sitede herhangi bir svg, png veya emoji ikon kullanilmamaktadir. Bunun yerine yazilarin kendisi birer tasarim objesi olarak kurgulanmistir. Unlem isaretleri, soru isaretleri, "YES!", "NO!" gibi ifadeler, cizgi roman konseptine uygun olarak farkli renkler, boyutlar, asimetrik donus (rotation) acilari ve kalin golgelerle (text-shadow) tasarlanmistir.

Scroll'a Duyarli Arkaplan (Dynamic Background)
Site durağan degildir. Kullanici sayfayi asagi dogru kaydirdikca (scroll), GSAP ScrollTrigger devreye girer. Sitenin ana krem rengi arkaplani, scroll yuzdesine bagli olarak pruzsuz bir sekilde ucuk sari ve bej tonlari arasinda gidip gelir. Bu gecisler bilerek cok yumusak tutulmustur, boylece goz yormaz ama sitenin yasadigi hissini verir.

WebGL ve Fizik Tabanli Etkilesimler
Ana sayfadaki urun resimlerinin uzerine gelindiginde (hover), siradan bir buyume efekti yerine WebGL fragment shader'lar tetiklenir. Fare imlecinin hizina ve yonune gore resim uzerinde sivi dalgalanmalari yaratilir. Ayni zamanda fare imleci (MouseFollower), kullanicinin sayfa icindeki hareketlerine gore sekil degistiren, baglama duyarli ozel bir bilesen olarak kodlanmistir.

Mobil Uyumluluk ve Dokunmatik Destegi
Eski nesil projelerde animasyonlar mobilde kapatilirken, bu projede tum mimari mobil oncelikli (mobile-first) olarak elden gecirildi. Urun kartlarindaki GSAP 3D hareket efektleri (mousemove) dokunmatik ekranlara (touchmove) tam entegre edildi. Ust navigasyon bar, tablet ve telefonlarda profesyonel bir hamburger menuye donusur. Tum animasyonlar, tablet ve telefonda da masaustundeki akiciligiyla calisir.

Tam Tesekkullu E-Ticaret Akisi
Sepete urun ekleme (CartContext), urun miktarini ayarlama ve siparisi tamamlama surecleri tamamen gercekci bir e-ticaret altyapisina sahiptir. "Siparisi Tamamla" butonuna basildiginda kullanici ozel olarak tasarlanmis /checkout (Odeme) sayfasina yonlendirilir. Burada adres, kisisel bilgiler ve kredi karti formlari bulunur. Odeme onayi ardindan siparis numarasi ureten /success (Siparis Basarili) ekranina aktarim saglanir.

Klasor Yapisi

- src/app/layout.tsx: Global ayarlar, font yuklemeleri ve metadata tanimlari.
- src/app/page.tsx: Ana sayfa duzeni, ana GSAP scroll tetikleyicileri, dinamik arkaplan hesaplamalari.
- src/app/checkout/page.tsx: Form dogrulamalari ve siparis ozeti iceren odeme sayfasi.
- src/app/success/page.tsx: Siparis onay ekrani.
- src/components/Preloader.tsx: Canvas tabanli toz/parcacik simulasyonu motoru.
- src/components/HoverWaveImage.tsx: WebGL shader yapilandirmalari ve GLSL kodlari.
- src/components/ComicStory.tsx: Cizgi roman mantigiyla calisan, interaktif marka hikayesi bileseni.
- src/components/CartSidebar.tsx: Global sepet durumunu (Context) ekrana yansitan yan panel.
- src/context/CartContext.tsx: Sitenin e-ticaret state'ini (sepet durumu) hafizada tutan React Context yapisi.

Bu proje, kullanici deneyimini (UX) ve kullanici arayuzunu (UI) performanstan odun vermeden en ust duzeye cikarmak amaciyla ozenle gelistirilmistir. Standart bir web sitesinden ziyade, modern bir web uygulamasi (Web App) reflekslerine sahiptir.

export type ProductCategory = "BULK" | "ENERGY" | "RECOVERY" | "DAILY";

export interface ProductType {
  id: string;
  name: string;
  category: ProductCategory;
  price: string;
  description: string;
  image: string;
  badge: string;
  accent: string;
  hoverAccent: string;
  stats: { label: string; value: number }[];
  tagline: string;
  flavor: string;
  size: string;
  level: string;
  detailPunch: string;
  highlights: string[];
}

const PRODUCTS: ProductType[] = [
  {
    id: "premium_isolate",
    name: "WEIDER Premium Whey Isolate",
    category: "BULK",
    price: "3.799 TL",
    description:
      "Düşük ısı ve ultrafiltrasyon teknolojisiyle üretilen yüksek biyoyararlanıma sahip izole whey proteini. Yağ ve karbonhidrat oranı minimize edilmiş içeriğiyle yoğun antrenman sonrası kas onarımını hızlıca destekler.",
    image: "/products/weider-premium-whey-isolate.png",
    badge: "İZOLE GÜÇ!",
    accent: "bg-comicOrange",
    hoverAccent: "bg-comicYellow",
    stats: [
      { label: "Saflık oranı", value: 96 },
      { label: "BCAA desteği", value: 92 },
      { label: "Hızlı emilim", value: 98 },
    ],
    tagline: "Şişkinlik hissi yaratmayan, saf kas kütlesi desteği.",
    flavor: "Kırmızı meyveli",
    size: "2,3 kg",
    level: "İleri seviye",
    detailPunch: "Antrenman sonrası hızlı emilim sağlayan saf protein profili.",
    highlights: ["Ultrafiltre izole whey", "Düşük karbonhidrat", "Yüksek biyolojik değer"],
  },
  {
    id: "hydro_whey",
    name: "WEIDER Premium Hydro Whey",
    category: "RECOVERY",
    price: "3.999 TL",
    description:
      "Hidrolize peptit yapısı sayesinde vücut tarafından anında emilen ve yoğun egzersiz sonrası kas yorgunluğunu en aza indiren premium protein formülü.",
    image: "/products/weider-premium-hydro-whey.png",
    badge: "HIZLI EMİLİM!",
    accent: "bg-comicYellow",
    hoverAccent: "bg-comicOrange",
    stats: [
      { label: "Emilim hızı", value: 99 },
      { label: "Kas onarımı", value: 95 },
      { label: "Lezzet puanı", value: 93 },
    ],
    tagline: "Antrenman sonrası kaslarınıza anında ulaşan hidrolize destek.",
    flavor: "Çikolata & krema",
    size: "2,3 kg",
    level: "İleri seviye",
    detailPunch: "Toparlanma sürecini hızlandıran yüksek teknoloji hidrolize formül.",
    highlights: ["Hidrolize protein", "Antrenman sonrası kullanım", "Kremalı çikolata profili"],
  },
  {
    id: "premium_whey_choc",
    name: "WEIDER Premium Whey",
    category: "BULK",
    price: "3.499 TL",
    description:
      "Weider'ın efsanevi premium whey serisi. İzole whey ile zenginleştirilmiş yüksek kaliteli protein karışımı, hacim kazanımı hedefleriniz için güçlü bir temel oluşturur.",
    image: "/products/weider-premium-whey-cikolata.png",
    badge: "EFSANE FORMÜL!",
    accent: "bg-comicRed",
    hoverAccent: "bg-comicOrange",
    stats: [
      { label: "Kas hacmi", value: 95 },
      { label: "BCAA oranı", value: 92 },
      { label: "Karışabilirlik", value: 96 },
    ],
    tagline: "Efsanevi kalitenin eşsiz çikolata lezzetiyle buluşması.",
    flavor: "Çikolatalı",
    size: "2,3 kg",
    level: "Orta / ileri seviye",
    detailPunch: "Yoğun çikolata aroması ve pürüzsüz içimiyle hacim odaklı protein desteği.",
    highlights: ["İzole whey ilaveli", "Yoğun çikolata aroması", "Hacim odaklı günlük kullanım"],
  },
  {
    id: "premium_whey_strawberry",
    name: "WEIDER Premium Whey",
    category: "DAILY",
    price: "3.499 TL",
    description:
      "Çilek ve vanilya notalarıyla günlük protein ihtiyacınızı keyifli bir rutine dönüştüren, içimi hafif ve dengeli premium whey formülü.",
    image: "/products/weider-premium-whey-cilek-vanilya.png",
    badge: "TATLI KOMBO!",
    accent: "bg-comicYellow",
    hoverAccent: "bg-comicRed",
    stats: [
      { label: "Günlük uyum", value: 94 },
      { label: "Lezzet dengesi", value: 97 },
      { label: "Protein desteği", value: 91 },
    ],
    tagline: "Çilek ve vanilya ferahlığıyla günlük protein döngünüz.",
    flavor: "Çilek & vanilyalı",
    size: "2,3 kg",
    level: "Günlük kullanım",
    detailPunch: "Tatlı ihtiyacınızı sağlıklı bir şekilde karşılayan yüksek kaliteli protein.",
    highlights: ["Günlük protein rutini", "Tatlı aroma dengesi", "Shake ve tarif uyumu"],
  },
  {
    id: "premium_whey_banana",
    name: "WEIDER Premium Whey",
    category: "ENERGY",
    price: "3.499 TL",
    description:
      "Doğal muz aromasıyla zenginleştirilmiş Premium Whey, antrenman öncesi veya sonrasında lezzetli ve yüksek verimli bir protein takviyesi arayanlar için idealdir.",
    image: "/products/weider-premium-whey-muzlu.png",
    badge: "MUZLU ENERJİ!",
    accent: "bg-comicOrange",
    hoverAccent: "bg-comicYellow",
    stats: [
      { label: "Enerji hissi", value: 96 },
      { label: "Güç desteği", value: 93 },
      { label: "Lezzet derecesi", value: 97 },
    ],
    tagline: "Doğal muz lezzetiyle enerjinizi tazeleyin ve setlere geri dönün.",
    flavor: "Muzlu",
    size: "2,3 kg",
    level: "Orta / ileri seviye",
    detailPunch: "Antrenman performansınızı artıracak enerjik ve lezzetli protein desteği.",
    highlights: ["Muz aromalı whey", "Kolay karışım", "Hacim dönemine uygun"],
  },
  {
    id: "casein_coconut_choc",
    name: "WEIDER Day&Night Casein",
    category: "RECOVERY",
    price: "1.299 TL",
    description:
      "Yavaş ve sürekli salınım özelliği sayesinde gece boyunca veya uzun öğün aralıklarında kaslarınızı kesintisiz besleyen yüksek kaliteli kazein proteini.",
    image: "/products/weider-day-night-casein-hindistan-cikolatali.png",
    badge: "GECE KALKANI!",
    accent: "bg-comicGrayLight",
    hoverAccent: "bg-comicRed",
    stats: [
      { label: "Salınım süresi", value: 98 },
      { label: "Gece desteği", value: 94 },
      { label: "Aroma doygunluğu", value: 90 },
    ],
    tagline: "Siz uyurken de kas onarımınız kesintisiz devam etsin.",
    flavor: "Hindistan cevizi & çikolatalı",
    size: "500 g",
    level: "Günlük / gece kullanımı",
    detailPunch: "Uyku sırasında kas yıkımını engelleyen uzun süreli protein koruması.",
    highlights: ["Yavaş salınımlı kazein", "Gece kullanımına uygun", "Tatlı ve yoğun aroma"],
  },
  {
    id: "gold_whey_milk_choc",
    name: "WEIDER Gold Whey",
    category: "BULK",
    price: "3.299 TL",
    description:
      "Sütlü çikolata lezzetine sahip Gold Whey, saf protein takviyesi ve kolay sindirim arayan sporcular için üstün kalitede bir seçenektir.",
    image: "/products/weider-gold-whey-sutlu-cikolatali.png",
    badge: "ALTIN STANDART!",
    accent: "bg-comicOrange",
    hoverAccent: "bg-comicYellow",
    stats: [
      { label: "Temiz kas kütlesi", value: 94 },
      { label: "Sindirim kolaylığı", value: 95 },
      { label: "Çikolata yoğunluğu", value: 93 },
    ],
    tagline: "Sütlü çikolatalı premium whey ile altın standartta beslenme.",
    flavor: "Sütlü çikolatalı",
    size: "2,3 kg",
    level: "Orta / ileri seviye",
    detailPunch: "Kaliteden ödün vermeyen sporcular için altın standart.",
    highlights: ["Sütlü çikolata aroması", "Günlük protein takibi", "Hacim dönemine uyumlu"],
  },
  {
    id: "hardcore_whey_choc",
    name: "WEIDER Hardcore Whey",
    category: "ENERGY",
    price: "3.899 TL",
    description:
      "Hardcore Whey, yoğun ve ağır antrenman programı uygulayan, hedefleri yüksek sporcuların artan protein ihtiyacını karşılamak üzere formüle edilmiştir.",
    image: "/products/weider-hardcore-whey-cikolatali.png",
    badge: "HARDCORE!",
    accent: "bg-comicRed",
    hoverAccent: "bg-comicOrange",
    stats: [
      { label: "Yoğun antrenman", value: 97 },
      { label: "Hacim desteği", value: 96 },
      { label: "Tat yoğunluğu", value: 94 },
    ],
    tagline: "En zorlu antrenmanlarınıza en güçlü protein desteği.",
    flavor: "Çikolatalı",
    size: "3,2 kg",
    level: "İleri seviye",
    detailPunch: "Sınırları zorlayan sporculara özel, maksimum hacim odaklı formül.",
    highlights: ["3,2 kg büyük boy", "Yoğun çikolata aroması", "Ağır antrenman rutini"],
  },
];

export default PRODUCTS;

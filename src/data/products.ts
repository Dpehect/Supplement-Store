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
      "CFM ve CFU teknolojisiyle üretilen izole whey formülü; düşük yağ, düşük karbonhidrat ve hızlı kullanım odağıyla ağır antrenman sonrası kas sistemini besler.",
    image: "/products/weider-premium-whey-isolate.png",
    badge: "İZOLE GÜÇ!",
    accent: "bg-comicOrange",
    hoverAccent: "bg-comicYellow",
    stats: [
      { label: "Saflık oranı", value: 96 },
      { label: "BCAA desteği", value: 92 },
      { label: "Hızlı emilim", value: 98 },
    ],
    tagline: "Şişkinlik hissini azaltan, net kas kütlesi desteği.",
    flavor: "Kırmızı meyveli",
    size: "2,3 kg",
    level: "İleri seviye",
    detailPunch: "20 dakika içinde kullanıma hazır protein desteği.",
    highlights: ["CFM + CFU izole whey", "Düşük karbonhidrat", "Yüksek biyolojik değer"],
  },
  {
    id: "hydro_whey",
    name: "WEIDER Premium Hydro Whey",
    category: "RECOVERY",
    price: "3.999 TL",
    description:
      "Hidrolize whey yapısı ile yoğun antrenmandan sonra hızlı toparlanma ritmine odaklanan premium protein formülü.",
    image: "/products/weider-premium-hydro-whey.png",
    badge: "HIZLI EMİLİM!",
    accent: "bg-comicYellow",
    hoverAccent: "bg-comicOrange",
    stats: [
      { label: "Emilim hızı", value: 99 },
      { label: "Kas onarımı", value: 95 },
      { label: "Lezzet puanı", value: 93 },
    ],
    tagline: "Antrenman biter bitmez kaslara çizgi roman hızıyla destek.",
    flavor: "Çikolata & krema",
    size: "2,3 kg",
    level: "İleri seviye",
    detailPunch: "Toparlanma paneline turbo basan hidrolize formül.",
    highlights: ["Hidrolize protein", "Antrenman sonrası kullanım", "Kremalı çikolata profili"],
  },
  {
    id: "premium_whey_choc",
    name: "WEIDER Premium Whey",
    category: "BULK",
    price: "3.499 TL",
    description:
      "Weider'ın klasik premium whey çizgisi; izole whey ilaveli konsantre protein karışımıyla hacim dönemleri için güçlü bir günlük temel kurar.",
    image: "/products/weider-premium-whey-cikolata.png",
    badge: "EFSANE FORMÜL!",
    accent: "bg-comicRed",
    hoverAccent: "bg-comicOrange",
    stats: [
      { label: "Kas hacmi", value: 95 },
      { label: "BCAA oranı", value: 92 },
      { label: "Karışabilirlik", value: 96 },
    ],
    tagline: "Weider efsanesinin çikolatalı ana karakteri.",
    flavor: "Çikolatalı",
    size: "2,3 kg",
    level: "Orta / ileri seviye",
    detailPunch: "Hacim çizgisinde kalın konturlu, tok aromalı protein.",
    highlights: ["İzole whey ilaveli", "Yoğun çikolata aroması", "Hacim odaklı günlük kullanım"],
  },
  {
    id: "premium_whey_strawberry",
    name: "WEIDER Premium Whey",
    category: "DAILY",
    price: "3.499 TL",
    description:
      "Çilek ve vanilya aromasıyla günlük protein rutinini daha hafif, tatlı ve sürdürülebilir hale getiren premium whey seçeneği.",
    image: "/products/weider-premium-whey-cilek-vanilya.png",
    badge: "TATLI KOMBO!",
    accent: "bg-comicYellow",
    hoverAccent: "bg-comicRed",
    stats: [
      { label: "Günlük uyum", value: 94 },
      { label: "Lezzet dengesi", value: 97 },
      { label: "Protein desteği", value: 91 },
    ],
    tagline: "Çilek ve vanilya ikilisiyle günlük protein paneli.",
    flavor: "Çilek & vanilyalı",
    size: "2,3 kg",
    level: "Günlük kullanım",
    detailPunch: "Tatlı krizine karşı proteinli comic cevabı.",
    highlights: ["Günlük protein rutini", "Tatlı aroma dengesi", "Shake ve tarif uyumu"],
  },
  {
    id: "premium_whey_banana",
    name: "WEIDER Premium Whey",
    category: "ENERGY",
    price: "3.499 TL",
    description:
      "Muz aromalı Premium Whey, antrenman öncesi veya sonrası kolay içimli protein desteği arayanlar için enerjik bir alternatif sunar.",
    image: "/products/weider-premium-whey-muzlu.png",
    badge: "MUZLU ENERJİ!",
    accent: "bg-comicOrange",
    hoverAccent: "bg-comicYellow",
    stats: [
      { label: "Enerji hissi", value: 96 },
      { label: "Güç desteği", value: 93 },
      { label: "Lezzet derecesi", value: 97 },
    ],
    tagline: "Muzlu lezzet patlamasıyla setlere geri dön.",
    flavor: "Muzlu",
    size: "2,3 kg",
    level: "Orta / ileri seviye",
    detailPunch: "Antrenman ritmini sarı bir patlama efektiyle büyütür.",
    highlights: ["Muz aromalı whey", "Kolay karışım", "Hacim dönemine uygun"],
  },
  {
    id: "casein_coconut_choc",
    name: "WEIDER Day&Night Casein",
    category: "RECOVERY",
    price: "1.299 TL",
    description:
      "Yavaş salınımlı kazein proteini, gece ve uzun öğün araları için kas sistemini daha uzun süre beslemeye odaklanır.",
    image: "/products/weider-day-night-casein-hindistan-cikolatali.png",
    badge: "GECE KALKANI!",
    accent: "bg-comicGrayLight",
    hoverAccent: "bg-comicRed",
    stats: [
      { label: "Salınım süresi", value: 98 },
      { label: "Gece desteği", value: 94 },
      { label: "Aroma doygunluğu", value: 90 },
    ],
    tagline: "Sen uyurken kas paneli kapanmasın.",
    flavor: "Hindistan cevizi & çikolatalı",
    size: "500 g",
    level: "Günlük / gece kullanımı",
    detailPunch: "Gece sahnesinde uzun süreli protein koruması.",
    highlights: ["Yavaş salınımlı kazein", "Gece kullanımına uygun", "Tatlı ve yoğun aroma"],
  },
  {
    id: "gold_whey_milk_choc",
    name: "WEIDER Gold Whey",
    category: "BULK",
    price: "3.299 TL",
    description:
      "Sütlü çikolata aromalı Gold Whey, temiz protein desteği ve kolay içim arayan sporcular için parlak bir hacim paneli açar.",
    image: "/products/weider-gold-whey-sutlu-cikolatali.png",
    badge: "ALTIN STANDART!",
    accent: "bg-comicOrange",
    hoverAccent: "bg-comicYellow",
    stats: [
      { label: "Temiz kas kütlesi", value: 94 },
      { label: "Sindirim kolaylığı", value: 95 },
      { label: "Çikolata yoğunluğu", value: 93 },
    ],
    tagline: "Altın efektli, sütlü çikolatalı whey desteği.",
    flavor: "Sütlü çikolatalı",
    size: "2,3 kg",
    level: "Orta / ileri seviye",
    detailPunch: "Klasik whey paneline altın kontur ekler.",
    highlights: ["Sütlü çikolata aroması", "Günlük protein takibi", "Hacim dönemine uyumlu"],
  },
  {
    id: "hardcore_whey_choc",
    name: "WEIDER Hardcore Whey",
    category: "ENERGY",
    price: "3.899 TL",
    description:
      "Hardcore Whey, daha yüksek yoğunluklu antrenman dönemlerinde tok çikolata aromasıyla güçlü protein desteği isteyenler için tasarlandı.",
    image: "/products/weider-hardcore-whey-cikolatali.png",
    badge: "HARDCORE!",
    accent: "bg-comicRed",
    hoverAccent: "bg-comicOrange",
    stats: [
      { label: "Yoğun antrenman", value: 97 },
      { label: "Hacim desteği", value: 96 },
      { label: "Tat yoğunluğu", value: 94 },
    ],
    tagline: "Ağır setlere kalın çizgili protein cevabı.",
    flavor: "Çikolatalı",
    size: "3,2 kg",
    level: "İleri seviye",
    detailPunch: "Sayfaya yumruk gibi giren büyük hacim formülü.",
    highlights: ["3,2 kg büyük boy", "Yoğun çikolata aroması", "Ağır antrenman rutini"],
  },
];

export default PRODUCTS;

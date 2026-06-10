"use client";

import React, { useState } from "react";
import SplitText from "./SplitText";

/* ── Panel data ── */
const PANELS = [
  {
    id: "crash",
    label: "PANEL 1",
    title: "ÇÖKÜŞ",
    emoji: "😴",
    color: "#1a1c23",
    accent: "#6B7280",
    badge: "ESNEME...",
    badgeColor: "#374151",
    badgeText: "white" as const,
    question: "Daha antrenmana başlamadan neden bu kadar yorgun hissediyorum?",
    steps: [
      { icon: "⚡", heading: "Kasların Yakıtı Bitti", body: "Kasların glikojenle çalışır. 6 saatten fazla aç kaldıysan depoların %40'a kadar boşalabilir. Bu da ısınma bitmeden kollarının ve bacaklarının taş gibi ağırlaşmasına sebep olur." },
      { icon: "😴", heading: "Stres Hormonu Devrede", body: "Antrenman öncesi yetersiz beslenmek kortizol hormonunu tetikler. Bu hormon kaslarını yerken motivasyonunu da sıfıra indirir. Klasik bir enerji çöküşünün en garanti tarifidir." },
      { icon: "💧", heading: "Vücudun Susuz Kaldı", body: "%1-2'lik hafif bir susuzluk bile güç çıkışını %8-10 düşürür. Çoğu sporcu vücudunun susuz kaldığını fark etmeden antrenmana başlar." },
      { icon: "🔋", heading: "WEIDER Çözümü", body: "Antrenmandan 30 dakika önce Weider Enerji Barı + EAA Kompleksi. Bara ilk dokunuşundan önce vücudunu hızlı karbonhidrat ve elektrolitlerle tamamen şarj eder." },
    ],
  },
  {
    id: "sparks",
    label: "PANEL 2",
    title: "KIVILCIM",
    emoji: "⚡",
    color: "#7f1d1d",
    accent: "#FF5F1F",
    badge: "GÜM!",
    badgeColor: "#FF5F1F",
    badgeText: "black" as const,
    question: "WEIDER kana karıştığı an ne olur?",
    steps: [
      { icon: "🧠", heading: "Odaklanma Başladı", body: "Kafein ve L-Teanin birlikteliği yaklaşık 15 dakikada etkisini gösterir. Kaygı yaratmadan keskin bir odaklanma sağlar. Zihnin antrenmana bir projektör gibi değil, adeta bir lazer gibi kilitlenir." },
      { icon: "🫀", heading: "Kan Hücumu (Pump)", body: "Klinik dozda (6g) Sitrülin Malat, nitrik oksit üretimini tetikler. Damarların genişler, set aralarında kasların oksijen ve besinle dolar." },
      { icon: "💪", heading: "Son Tekrar Gücü", body: "Beta-Alanin laktik asit birikimini öteler. Böylece sinir sistemin yorulmadan önce %15-20 daha uzun süre en yüksek frekansta çalışabilir." },
      { icon: "🔥", heading: "RAGE Karışımı", body: "300mg Kafein · 6g Sitrülin · 3.2g Beta-Alanin · 2.5g Betaine. Her içerik klinik olarak etkili dozlardadır. Arkasına saklanılacak hiçbir gizli formül yok." },
    ],
  },
  {
    id: "hyperdrive",
    label: "PANEL 3",
    title: "HİPER HIZ",
    emoji: "🚀",
    color: "#78350f",
    accent: "#FFD700",
    badge: "BUMM!",
    badgeColor: "#FFD700",
    badgeText: "black" as const,
    question: "Gerçek zirve performansı hissetmek nasıl bir şey?",
    steps: [
      { icon: "📈", heading: "Limitleri Yukarı Çek", body: "Kreatin Monohidrat (günlük 5g protokolü) kaslardaki fosfokreatin depolarını doldurur. Set aralarında ATP 3 kat daha hızlı yenilenir. 4-6 hafta içinde gücündeki artışı doğrudan hissedersin." },
      { icon: "🧬", heading: "Kas İnşası Başlasın", body: "Tek porsiyondaki Lösin oranı kas inşasının ana şalteri olan mTOR yolunu aktif hale getirir. Weider Whey Gold her ölçekte tam 2.8g lösin içerir." },
      { icon: "🩸", heading: "Kasların Şişmesi", body: "%85-90 eforda kasların kanla dolarak %15-20 oranında hacim kazanır. Bu sadece ayna karşısında iyi görünmek için değil, kas inşasını başlatan anabolik sinyallerin kendisidir." },
      { icon: "⚗️", heading: "Temiz ve Güvenli", body: "WEIDER ürünleri Informed-Sport testlerinden geçer. Yasaklı madde riski yoktur. 12 farklı branşta 47'den fazla profesyonel olimpiyat sporcusu tarafından güvenle kullanılır." },
    ],
  },
  {
    id: "glory",
    label: "PANEL 4",
    title: "ZAFER",
    emoji: "🏆",
    color: "#111827",
    accent: "#D32F2F",
    badge: "REKOR!",
    badgeColor: "#D32F2F",
    badgeText: "white" as const,
    question: "Kazanımları uzun vadede nasıl korurum?",
    steps: [
      { icon: "🌙", heading: "Uykuda Büyüme", body: "Kas inşasının en yoğun olduğu 6 saat uykuda gerçekleşir. Yavaş sindirilen Kazein Proteini kaslarını gece boyunca besler. Kas yıkımını sıfıra indirir, güne daha dolu başlarsın." },
      { icon: "🫒", heading: "Ağrılara Veda", body: "Omega-3 yağ asitleri (günlük 2g EPA+DHA) antrenman sonrası kas ağrılarını %35'e kadar azaltır. WEIDER Omega-3 yüksek saflıkta ve balık kokusu olmadan sunulur." },
      { icon: "🔄", heading: "Zamanın Gücü", body: "4. Hafta: Bench press'te fazladan 5 kg. 8. Hafta: Belirginleşen damarlar. 12. Hafta: Yepyeni bir sen. İstikrar ve WEIDER protokolü birleştiğinde sonuçlar seni bile şaşırtacak." },
      { icon: "🎯", heading: "Şampiyonlar Rutini", body: "Rutinimiz: Antrenman öncesi RAGE → Antrenman sırası/sonrası Whey Gold → Uykudan önce Kazein → Günlük Omega-3 + Multivitamin. İşte buna WEIDER Performans Protokolü™ diyoruz." },
    ],
  },
];

/* ── Single panel content — only rendered when open ── */
function PanelContent({ panel, onClose }: { panel: typeof PANELS[0]; onClose: () => void }) {
  const [step, setStep] = useState(-1);
  const total = panel.steps.length;
  const allDone = step >= total - 1;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (allDone) return;
    setStep(s => s + 1);
  };

  return (
    <div className="relative z-10 px-5 pb-5 flex flex-col gap-2 flex-1" onClick={handleClick}>
      {/* Progress bar */}
      <div className="flex gap-1.5 mb-2 items-center">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className="h-1.5 flex-1 rounded-full transition-all duration-300"
            style={{ background: i <= step ? panel.accent : "rgba(255,255,255,.15)" }}
          />
        ))}
        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="ml-2 text-white/40 hover:text-white text-xs font-bold transition-colors flex-shrink-0 px-2 py-0.5 rounded-md border border-white/10 hover:border-white/30"
        >
          ✕ KAPAT
        </button>
      </div>

      <p className="font-sans text-xs italic text-white/60 mb-1">{panel.question}</p>

      {panel.steps.map((s, i) => (
        <div
          key={i}
          className="flex gap-3 bg-black/60 border border-white/10 rounded-xl p-3"
          style={{
            opacity: i <= step ? 1 : 0,
            transform: i <= step ? "translateY(0)" : "translateY(8px)",
            transition: `opacity .35s ${i * 60}ms, transform .35s ${i * 60}ms`,
            pointerEvents: i <= step ? "auto" : "none",
          }}
        >
          <span className="text-2xl flex-shrink-0 mt-0.5">{s.icon}</span>
          <div>
            <h5 className="font-comic text-sm uppercase tracking-wide text-white mb-1">{s.heading}</h5>
            <p className="font-sans text-[11px] text-gray-300 leading-relaxed">{s.body}</p>
          </div>
        </div>
      ))}

      {allDone ? (
        <div
          className="mt-2 text-center font-comic text-base uppercase tracking-wide rounded-xl py-2.5 border-2 border-black"
          style={{ background: panel.accent, color: panel.badgeText === "black" ? "#000" : "#fff" }}
        >
          ✅ PANEL AÇILDI — BİR SONRAKİNE GEÇ!
        </div>
      ) : (
        <p className="text-center font-sans text-[10px] text-white/35 mt-1 italic animate-pulse">
          Kartları sırayla açmak için panelde herhangi bir yere tıkla…
        </p>
      )}
    </div>
  );
}

/* ── Game panel wrapper ── */
function GamePanel({
  panel,
  isActive,
  onOpen,
  onClose,
}: {
  panel: typeof PANELS[0];
  isActive: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl border-4 border-black flex flex-col
        transition-all duration-400 select-none
        ${isActive
          ? "shadow-[8px_8px_0_#000] scale-[1.01]"
          : "shadow-[4px_4px_0_#000] hover:scale-[1.015] cursor-pointer hover:shadow-[6px_6px_0_#000]"}
      `}
      style={{ background: panel.color }}
      onClick={!isActive ? onOpen : undefined}
    >
      {/* Halftone overlay */}
      <div className="absolute inset-0 bg-halftone-black opacity-20 pointer-events-none" />

      {/* Badge */}
      <span
        className="absolute top-3 right-3 z-10 font-comic text-xs px-3 py-1 rounded-lg border-2 border-black font-black uppercase shadow-[2px_2px_0_#000]"
        style={{ background: panel.badgeColor, color: panel.badgeText === "black" ? "#000" : "#fff" }}
      >
        {panel.badge}
      </span>

      {/* Header row — always visible */}
      <div className="relative z-10 p-5 pb-3 flex items-center gap-4">
        <span className="text-4xl">{panel.emoji}</span>
        <div>
          <p className="font-sans text-[10px] font-black uppercase tracking-widest" style={{ color: panel.accent }}>
            {panel.label}
          </p>
          <h3 className="font-comic text-2xl md:text-3xl text-white leading-none uppercase">{panel.title}</h3>
        </div>
      </div>

      {/* Collapsed hint */}
      {!isActive && (
        <div className="relative z-10 px-5 pb-4 flex items-center gap-3">
          <span className="font-sans text-xs text-white/50 italic flex-1">{panel.question}</span>
          <span
            className="font-comic text-sm px-3 py-1 rounded-xl border-2 border-black font-black whitespace-nowrap flex-shrink-0"
            style={{ background: panel.accent, color: panel.badgeText === "black" ? "#000" : "#fff" }}
          >
            DOKUN →
          </span>
        </div>
      )}

      {/* Expanded content — only mounted when active, fully unmounts on close = full reset */}
      {isActive && (
        <PanelContent key={panel.id} panel={panel} onClose={onClose} />
      )}
    </div>
  );
}

/* ── Root component ── */
export default function ComicStory() {
  // null = all closed; string = that panel's id is open
  const [activePanel, setActivePanel] = useState<string | null>(PANELS[0].id);

  const open  = (id: string) => setActivePanel(id);
  const close = ()           => setActivePanel(null);

  return (
    <section
      id="story"
      className="py-24 px-6 md:px-12 bg-comicBlack border-b-4 border-black relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-halftone-red opacity-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <SplitText
            text="DÖNÜŞÜM SERÜVENİN"
            className="font-comic text-3xl md:text-5xl text-white text-stroke-thick tracking-wider block mb-4"
            animation="bounce"
            stagger={0.05}
          />
          <p className="font-sans text-comicOrange font-bold text-lg md:text-xl uppercase tracking-widest mb-1">
            BİR PANELE TIKLA — İŞİN BİLİMİNİ ÇÖZ
          </p>
          <p className="font-sans text-sm text-white/40 italic">
            Açmak için dokun · Kartları teker teker açmak için içine tıkla · Aynı anda tek bir panel açık kalır
          </p>
        </div>

        {/* 2×2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {PANELS.map(panel => (
            <GamePanel
              key={panel.id}
              panel={panel}
              isActive={activePanel === panel.id}
              onOpen={() => open(panel.id)}
              onClose={close}
            />
          ))}
        </div>

        {/* Tracker */}
        <div className="mt-8 flex justify-center">
          <div className="bg-black border-2 border-comicOrange rounded-2xl px-6 py-3 flex gap-4 items-center shadow-[4px_4px_0_#FF5F1F]">
            <span className="font-comic text-comicOrange text-sm uppercase tracking-wide">
              Şu An Açık:
            </span>
            <span className="font-comic text-white text-base">
              {activePanel
                ? PANELS.find(p => p.id === activePanel)?.title ?? "—"
                : "Yok"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

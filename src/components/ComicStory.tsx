"use client";

import React, { useState } from "react";
import SplitText from "./SplitText";
import { ChevronRight, CheckCircle } from "lucide-react";

const PANELS = [
  {
    id: "crash",
    label: "PANEL 1",
    title: "ÇÖKÜŞ",
    color: "#1a1c23",
    accent: "#6B7280",
    emoji: <span className="font-comic text-5xl text-comicGrayLight shadow-[3px_3px_0_#000] -rotate-6">01</span>,
    badge: "BAŞLANGIÇ",
    badgeColor: "#000",
    badgeText: "white" as const,
    steps: [
      {
        icon: <span className="font-comic text-2xl text-comicOrange font-black italic">#1</span>,
        heading: "BEYİN SİSİ",
        body: "Odaklanma sorunu, gün içi sürekli yorgunluk hissi."
      },
      {
        icon: <span className="font-comic text-2xl text-comicOrange font-black italic">#2</span>,
        heading: "YAVAŞ METABOLİZMA",
        body: "Kilo vermekte zorlanma, düşük enerji seviyeleri."
      },
      {
        icon: <span className="font-comic text-2xl text-comicOrange font-black italic">#3</span>,
        heading: "GÜÇ KAYBI",
        body: "Antrenmanlarda tükenmişlik ve performans düşüklüğü."
      }
    ]
  },
  {
    id: "panel-2",
    title: "KIVILCIM",
    label: "ETKİ ŞEKLİ",
    color: "#D32F2F",
    accent: "#FFD700",
    question: "İlk dozu aldığında vücudunda ne tetiklenir?",
    emoji: <span className="font-comic text-5xl text-comicYellow shadow-[3px_3px_0_#000] rotate-6">02</span>,
    badge: "30 DAKİKA",
    badgeColor: "#FFD700",
    badgeText: "black" as const,
    steps: [
      {
        icon: <span className="font-comic text-2xl text-comicYellow font-black italic">#1</span>,
        heading: "HIZLI EMİLİM",
        body: "Etken maddeler 15 dakikada kana karışmaya başlar."
      },
      {
        icon: <span className="font-comic text-2xl text-comicYellow font-black italic">#2</span>,
        heading: "ATP ARTIŞI",
        body: "Hücresel enerji üretimi maksimize edilir."
      },
      {
        icon: <span className="font-comic text-2xl text-comicYellow font-black italic">#3</span>,
        heading: "SİNİR SİSTEMİ UYARISI",
        body: "Merkezi sinir sistemi aktive olur, reaksiyon süresi kısalır."
      }
    ]
  },
  {
    id: "panel-3",
    title: "DÖNÜŞÜM",
    label: "HÜCRESEL BİYOLOJİ",
    color: "#FF5F1F",
    accent: "#1F2833",
    question: "Düzenli kullanımda kas anatomisi nasıl değişir?",
    emoji: <span className="font-comic text-5xl text-white shadow-[3px_3px_0_#000] -rotate-3">03</span>,
    badge: "14 GÜN",
    badgeColor: "#1F2833",
    badgeText: "white" as const,
    steps: [
      {
        icon: <span className="font-comic text-2xl text-comicGray font-black italic">#1</span>,
        heading: "HİPERTROFİ",
        body: "Kas liflerinde mikro yırtıklar hızla onarılır ve kalınlaşır."
      },
      {
        icon: <span className="font-comic text-2xl text-comicGray font-black italic">#2</span>,
        heading: "NOX ÜRETİMİ",
        body: "Nitrik oksit seviyesi artar, damarlanma ve 'pump' hissi kalıcı hale gelir."
      },
      {
        icon: <span className="font-comic text-2xl text-comicGray font-black italic">#3</span>,
        heading: "DERİN TOPARLANMA",
        body: "REM uykusu kalitesi artar, kas inşası gece boyunca devam eder."
      }
    ]
  },
  {
    id: "panel-4",
    title: "ZİRVE",
    label: "MAXIMUM KAPASİTE",
    color: "#FFD700",
    accent: "#D32F2F",
    question: "Genetik potansiyelinin zirvesine ulaştığında ne olur?",
    emoji: <span className="font-comic text-5xl text-black shadow-[3px_3px_0_#FFF] rotate-3">04</span>,
    badge: "90 GÜN",
    badgeColor: "#D32F2F",
    badgeText: "white" as const,
    steps: [
      {
        icon: <span className="font-comic text-2xl text-comicRed font-black italic">#1</span>,
        heading: "KUSURSUZ YAĞ YAKIMI",
        body: "Bazal metabolizma hızı zirvededir, yağ oranı minimuma iner."
      },
      {
        icon: <span className="font-comic text-2xl text-comicRed font-black italic">#2</span>,
        heading: "BİTMEK BİLMEYEN DAYANIKLILIK",
        body: "Laktik asit birikimi gecikir, antrenman hacmi ikiye katlanır."
      },
      {
        icon: <span className="font-comic text-2xl text-comicRed font-black italic">#3</span>,
        heading: "ZİHİNSEL KESİNLİK",
        body: "Sadece kaslar değil, beyin de %100 kapasiteyle çalışır."
      }
    ]
  },
];

function PanelContent({ panel, onClose, onNextPanel, hasNextPanel }: { panel: typeof PANELS[0]; onClose: () => void; onNextPanel?: () => void; hasNextPanel: boolean }) {
  const [step, setStep] = useState(-1);
  const total = panel.steps.length;
  const allDone = step >= total - 1;

  return (
    <div className="relative z-10 px-5 pb-5 flex flex-col gap-2 flex-1">
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

      <div className="flex items-center justify-center gap-2 text-center font-sans text-xs font-bold text-white/60 mt-3 p-2 rounded-lg bg-white/5 border border-white/10 animate-pulse">
        <ChevronRight className="w-5 h-5 animate-bounce-right" />
        <span>SIRADAKİ BİLGİ İÇİN TIKLA</span>
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
          <div className="flex-shrink-0 mt-0.5">{s.icon}</div>
          <div>
            <h5 className="font-comic text-sm uppercase tracking-wide text-white mb-1">{s.heading}</h5>
            <p className="font-sans text-[11px] text-gray-300 leading-relaxed">{s.body}</p>
          </div>
        </div>
      ))}

      <div className="flex justify-end mt-4">
        {!allDone ? (
          <button 
            onClick={(e) => { e.stopPropagation(); setStep(s => s + 1); }} 
            className="bg-comicYellow text-black font-comic text-sm md:text-base px-6 py-2 border-2 border-black rounded-lg shadow-[2px_2px_0_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all uppercase flex items-center gap-2 animate-pulse-slow"
          >
            İLERİ ➔
          </button>
        ) : hasNextPanel ? (
          <button 
            onClick={(e) => { e.stopPropagation(); onNextPanel?.(); }} 
            className="bg-white text-black font-comic text-sm md:text-base px-6 py-2 border-2 border-black rounded-lg shadow-[2px_2px_0_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all uppercase flex items-center gap-2 animate-bounce"
          >
            SONRAKİ PANELE GEÇ ➔
          </button>
        ) : (
          <div className="bg-green-500 text-black font-comic text-sm px-4 py-2 border-2 border-black rounded-lg shadow-[2px_2px_0_#000] uppercase text-center w-full flex items-center justify-center gap-2">
            <CheckCircle className="w-5 h-5" /> TÜM BİLGİLERİ TAMAMLADIN
          </div>
        )}
      </div>
    </div>
  );
}

function GamePanel({
  panel,
  isActive,
  onOpen,
  onClose,
  onNextPanel,
  hasNextPanel,
}: {
  panel: typeof PANELS[0];
  isActive: boolean;
  onOpen: () => void;
  onClose: () => void;
  onNextPanel?: () => void;
  hasNextPanel: boolean;
}) {
  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl border-4 border-black flex flex-col
        transition-all duration-400 select-none
        ${isActive
          ? "shadow-[8px_8px_0_#000] scale-[1.01] bg-opacity-95 ring-4 ring-comicOrange/30"
          : "shadow-[4px_4px_0_#000] hover:scale-[1.015] cursor-pointer hover:shadow-[6px_6px_0_#000]"}
      `}
      style={{ background: panel.color }}
      onClick={!isActive ? onOpen : undefined}
    >
      <div className={`absolute inset-0 bg-halftone-black opacity-20 pointer-events-none ${isActive ? 'animate-pulse' : ''}`} />

      <span
        className="absolute top-3 right-3 z-10 font-comic text-xs px-3 py-1 rounded-lg border-2 border-black font-black uppercase shadow-[2px_2px_0_#000]"
        style={{ background: panel.badgeColor, color: panel.badgeText === "black" ? "#000" : "#fff" }}
      >
        {panel.badge}
      </span>

      <div className="relative z-10 p-5 pb-3 flex items-center gap-4">
        <div className="flex-shrink-0">{panel.emoji}</div>
        <div>
          <p className="font-sans text-[10px] font-black uppercase tracking-widest" style={{ color: panel.accent }}>
            {panel.label}
          </p>
          <h3 className="font-comic text-2xl md:text-3xl text-white leading-none uppercase">{panel.title}</h3>
        </div>
      </div>

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

      {isActive && (
        <PanelContent key={panel.id} panel={panel} onClose={onClose} onNextPanel={onNextPanel} hasNextPanel={hasNextPanel} />
      )}
    </div>
  );
}

export default function ComicStory() {
  const [activePanels, setActivePanels] = useState<string[]>([PANELS[0].id]);

  const open  = (id: string) => {
    setActivePanels(prev => prev.includes(id) ? prev : [...prev, id]);
  };
  const close = (id: string) => {
    setActivePanels(prev => prev.filter(p => p !== id));
  };

  return (
    <section
      id="story"
      className="py-24 px-6 md:px-12 bg-comicBlack border-b-4 border-black relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-halftone-red opacity-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto">
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
          <p className="font-sans text-sm text-white/60 italic">
            Bir panel açtığında kapanmaz, böylece bilgileri karşılaştırabilirsin. Bilgi kartlarını görmek için İLERİ butonuna tıkla.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {PANELS.map((panel, index) => {
            const hasNextPanel = index < PANELS.length - 1;
            const nextPanelId = hasNextPanel ? PANELS[index + 1].id : null;
            return (
              <GamePanel
                key={panel.id}
                panel={panel}
                isActive={activePanels.includes(panel.id)}
                onOpen={() => open(panel.id)}
                onClose={() => close(panel.id)}
                hasNextPanel={hasNextPanel}
                onNextPanel={nextPanelId ? () => open(nextPanelId) : undefined}
              />
            )
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <div className="bg-black border-2 border-comicOrange rounded-2xl px-6 py-3 flex gap-4 items-center shadow-[4px_4px_0_#FF5F1F]">
            <span className="font-comic text-comicOrange text-sm uppercase tracking-wide">
              Şu An Açık:
            </span>
            <span className="font-comic text-white text-base">
              {activePanels.length > 0
                ? activePanels.map(id => PANELS.find(p => p.id === id)?.title).join(", ")
                : "Yok"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { Suspense, useState, useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import ComicStory from "@/components/ComicStory";
import SplitText from "@/components/SplitText";
import ScrollReveal from "@/components/ScrollReveal";
import Marquee from "@/components/Marquee";
import PRODUCTS, { ProductType } from "@/data/products";
import ProductDetailModal from "@/components/ProductDetailModal";
import HoverWaveImage from "@/components/HoverWaveImage";
import Preloader from "@/components/Preloader";
import { ArrowRight, Star } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PRODUCTS_DATA = PRODUCTS;

const CATEGORY_LABELS: Record<string, string> = {
  ALL: "HEPSİ",
  BULK: "HACİM",
  ENERGY: "ENERJİ",
  RECOVERY: "TOPARLANMA",
  DAILY: "GÜNLÜK",
};

function HomeContent() {
  const searchParams = useSearchParams();
  const skipPreloader = searchParams.get("skipPreloader") === "1";
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const mainBottleRef = useRef<HTMLDivElement>(null);
  const capsule1Ref = useRef<HTMLDivElement>(null);
  const capsule2Ref = useRef<HTMLDivElement>(null);
  const splatBadgeRef = useRef<HTMLDivElement>(null);
  const rivalsRef = useRef<HTMLDivElement>(null);
  const weiderOutperformsRef = useRef<HTMLDivElement>(null);
  const powBadgeRef = useRef<HTMLDivElement>(null);
  const preloaderPreparedRef = useRef(false);

  const filteredProducts = activeCategory === "ALL"
    ? PRODUCTS_DATA
    : PRODUCTS_DATA.filter(p => p.category === activeCategory);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = "Hey, geri dön! 💪";
      } else {
        document.title = "Softbridge Supplements | Premium Athletic Supplements";
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useLayoutEffect(() => {
    if (skipPreloader) {
      setLoading(false);
      return;
    }

    if (preloaderPreparedRef.current) return;
    preloaderPreparedRef.current = true;

    const startPreloader = () => {
      if (document.visibilityState !== "hidden") {
        setLoading(true);
      }
    };

    const skipIfHidden = () => {
      if (document.visibilityState === "hidden") {
        setLoading(false);
      }
    };

    const startTimer = window.setTimeout(startPreloader, 60);
    document.addEventListener("visibilitychange", skipIfHidden);

    return () => {
      window.clearTimeout(startTimer);
      document.removeEventListener("visibilitychange", skipIfHidden);
    };
  }, [skipPreloader]);

  useEffect(() => {
    if (loading) return;

    const ctx = gsap.context(() => {
      gsap.to(".bg-speedlines", {
        rotate: 360,
        duration: 80,
        repeat: -1,
        ease: "none",
      });

      gsap.from(".hero-headline-1", {
        yPercent: 100,
        skewY: 7,
        duration: 0.8,
        ease: "power4.out",
      });

      gsap.from(".hero-headline-2", {
        yPercent: 100,
        skewY: 7,
        duration: 0.8,
        delay: 0.15,
        ease: "power4.out",
      });

      gsap.to(mainBottleRef.current, {
        y: -15,
        rotate: 3,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      gsap.to(capsule1Ref.current, {
        y: 20,
        x: -10,
        rotate: -15,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      gsap.to(capsule2Ref.current, {
        y: -25,
        x: 15,
        rotate: 20,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      gsap.to(splatBadgeRef.current, {
        scale: 1.05,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(mainBottleRef.current, {
        y: 100,
        rotate: 15,
        scrollTrigger: {
          trigger: heroContainerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        }
      });

      gsap.to(capsule1Ref.current, {
        y: -120,
        x: -50,
        scrollTrigger: {
          trigger: heroContainerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        }
      });

      gsap.to(capsule2Ref.current, {
        y: 180,
        x: 60,
        scrollTrigger: {
          trigger: heroContainerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        }
      });

      if (rivalsRef.current && weiderOutperformsRef.current) {
        gsap.from(rivalsRef.current, {
          x: -120,
          opacity: 0,
          rotate: -6,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#why-us",
            start: "top 75%",
            once: true,
          },
        });

        gsap.from(weiderOutperformsRef.current, {
          x: 120,
          opacity: 0,
          rotate: 6,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#why-us",
            start: "top 75%",
            once: true,
          },
        });

        if (powBadgeRef.current) {
          gsap.fromTo(powBadgeRef.current, 
            { scale: 0, opacity: 0, rotate: -30 },
            { 
              scale: 1, 
              opacity: 1, 
              rotate: -12, 
              duration: 0.6, 
              delay: 0.4,
              ease: "elastic.out(1.2, 0.5)",
              scrollTrigger: {
                trigger: "#why-us",
                start: "top 75%",
                once: true,
              }
            }
          );
        }
      }

      gsap.to(".dynamic-bg", {
        backgroundColor: "#E8DAC3", // A deeper beige shade
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        }
      });

    }, heroContainerRef);

    return () => ctx.revert();
  }, [loading]);

  return (
    <>
      {!skipPreloader && loading && <Preloader onComplete={() => {
        setLoading(false);
      }} />}
      <div 
        className="motion-field min-h-screen flex flex-col font-sans select-none overflow-hidden relative"
        style={{ opacity: loading ? 0 : 1, transition: "opacity 0.5s ease" }}
      >
      <Header />

      <section
        ref={heroContainerRef}
        className="dynamic-bg relative min-h-[calc(100vh-80px)] w-full border-b-4 border-black flex flex-col lg:flex-row items-center justify-between py-12 px-6 md:px-12 bg-comicBlack overflow-hidden"
      >
        <div className="absolute inset-0 bg-halftone-orange opacity-[0.08] pointer-events-none z-0"></div>
        <div className="bg-speedlines absolute w-[180%] h-[180%] top-[-40%] left-[-40%] opacity-[0.25] z-0 pointer-events-none">
          <Image
            src="/images/speed_lines.png"
            alt="Speed lines background"
            fill
            className="object-cover mix-blend-multiply filter invert"
          />
        </div>

        <div className="relative z-10 max-w-xl lg:max-w-2xl text-left flex flex-col justify-center order-2 lg:order-1 mt-8 lg:mt-0">
          <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-comicRed rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-comicOrange rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-float-slow"></div>
          <div className="inline-block bg-comicRed border-2 border-black px-4 py-1.5 -skew-x-12 transform rotate-1 mb-6 shadow-comic max-w-max">
            <span className="font-comic text-base md:text-lg text-white font-extrabold uppercase tracking-widest">
              DİKKAT: KLİNİK DOZAJLI ŞEFFAF FORMÜL
            </span>
          </div>

          <h1 className="font-comic text-4xl md:text-6xl text-black tracking-wider leading-none mb-6">
            <span className="block overflow-hidden h-[65px] md:h-[95px] pt-3">
              <span className="hero-headline-1 inline-block text-stroke-black">POTANSİYELİNİ</span>
            </span>
            <span className="block overflow-hidden h-[65px] md:h-[95px] pt-3 text-comicOrange">
              <span className="hero-headline-2 inline-block text-stroke-black">ZİRVEYE TAŞI!</span>
            </span>
          </h1>

          <p className="font-sans text-base md:text-lg font-bold text-comicGray leading-relaxed mb-8 max-w-lg">
            Tescilli karışım (Gizli formül) kullanmıyoruz. Ucuz dolgu maddelerine yer yok. Sadece antrenman yorgunluğunu ertelemek ve performansınızı zirveye taşımak için klinik dozajları kanıtlanmış, tamamen şeffaf içerikler sunuyoruz.
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <button
              onClick={() => {
                const element = document.getElementById("products");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
              className="group relative flex items-center gap-2 bg-comicOrange hover:bg-comicYellow text-black font-comic text-xl md:text-2xl px-8 py-3 border-3 border-black shadow-comic-lg active:translate-x-1 active:translate-y-1 active:shadow-none transition-all uppercase"
              data-cursor="GÖSTER!"
            >
              <span>ÜRÜNLERİ İNCELE</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 border-t-3 border-black pt-8 mt-12 max-w-md">
            <div>
              <span className="font-comic text-2xl text-comicYellow text-stroke-black block">%100</span>
              <span className="font-sans text-[10px] font-black uppercase text-comicGray">KLİNİK DOZAJ</span>
            </div>
            <div>
              <span className="font-comic text-2xl text-comicOrange text-stroke-black block">SIFIR</span>
              <span className="font-sans text-[10px] font-black uppercase text-comicGray">GİZLİ KARIŞIM</span>
            </div>
            <div>
              <span className="font-comic text-2xl text-comicRed text-stroke-black block">MAKS</span>
              <span className="font-sans text-[10px] font-black uppercase text-comicGray">PUMP GÜCÜ</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 w-full lg:w-[45%] h-[400px] lg:h-[600px] flex items-center justify-center order-1 lg:order-2">
          <div className="absolute w-72 h-72 md:w-[450px] md:h-[450px] bg-comicRed rounded-full border-4 border-black shadow-comic z-0 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-halftone-black opacity-30"></div>
          </div>

          <div ref={mainBottleRef} className="relative w-64 h-64 md:w-96 md:h-96 z-10 drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] float-medium">
            <HoverWaveImage
              src="/products/weider-premium-whey-isolate.png"
              alt="WEIDER Supplements Hero product container"
              imageClassName="object-contain rounded-2xl"
              sizes="(max-width: 1024px) 80vw, 420px"
              priority
              intensity={34}
            />
          </div>

          <div
            ref={capsule1Ref}
            className="absolute top-10 left-12 w-20 h-20 z-20 drop-shadow-[0_8px_16px_rgba(0,0,0,0.7)] float-x"
          >
            <Image
              src="/images/flying_capsule.png"
              alt="Floating supplement capsule"
              fill
              className="object-contain -rotate-12"
            />
          </div>

          <div
            ref={capsule2Ref}
            className="absolute bottom-16 right-10 w-24 h-24 z-20 drop-shadow-[0_8px_16px_rgba(0,0,0,0.7)] float-slow"
          >
            <Image
              src="/images/flying_capsule.png"
              alt="Floating supplement capsule detailed"
              fill
              className="object-contain rotate-[45deg]"
            />
          </div>

          <div
            ref={splatBadgeRef}
            className="absolute -top-12 -left-8 md:-left-12 rotate-[-15deg] z-10 animate-float-slow bg-comicYellow text-black border-3 border-black rounded-xl font-comic text-2xl md:text-4xl px-6 py-2 rotate-[-8deg] shadow-comic uppercase font-black"
          >
            BUM!
          </div>
        </div>
      </section>

      <Marquee
        text="WEIDER PERFORMANS SİSTEMİ · %100 ŞEFFAF İÇERİK · LİMİTLERİNİ ZORLA · MAKSİMUM GÜÇ VE PERFORMANS"
        bgColor="bg-comicOrange"
        textColor="text-black"
        direction="left"
        rotate="-rotate-1"
      />

      <section id="products" className="dynamic-bg py-24 px-6 md:px-12 bg-comicBlack border-b-4 border-black relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="motion-rect-b relative inline-block transform -rotate-2 -skew-x-1 mb-4 px-6 py-2">
              <SplitText
                text="WEIDER METODU"
                className="font-lilita text-3xl md:text-5xl text-comicOrange text-stroke-thick tracking-wider block relative z-10"
                animation="bounce"
                stagger={0.05}
              />
              <div className="motion-still absolute inset-0 bg-comicYellow border-4 border-black -z-10 rounded-xl shadow-comic"></div>
            </div>
            <p className="font-sans text-comicOrange font-bold text-lg md:text-xl uppercase tracking-widest mt-4">
              HEDEFİNİZE UYGUN PROFESYONEL FORMÜLÜ SEÇİN
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {["ALL", "BULK", "ENERGY", "RECOVERY", "DAILY"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-comic text-xl md:text-2xl px-7 py-2 border-3 border-black rounded-xl -skew-x-6 transform shadow-comic active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all ${
                  activeCategory === cat
                    ? "bg-comicOrange text-black"
                    : "bg-comicGray text-white hover:bg-comicOrange hover:text-black"
                }`}
                data-cursor={CATEGORY_LABELS[cat]}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, i) => (
              <ScrollReveal key={product.id} delay={i * 100}>
                <ProductCard product={product} onSelect={() => setSelectedProduct(product)} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Marquee
        text="PUMP ETKİSİ · PATLAYICI ENERJİ · HIZLI KAS ONARIMI · ELEKTROLİT DENGESİ · BİLİMSEL OLARAK KANITLANMIŞ FORMÜL"
        bgColor="bg-comicYellow"
        textColor="text-black"
        direction="right"
        rotate="rotate-1"
      />

      <ComicStory />

      <section id="why-us" className="dynamic-bg py-24 px-6 md:px-12 bg-comicBlack border-b-4 border-black relative overflow-hidden">
        <div className="absolute inset-0 bg-halftone-orange opacity-[0.05] pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 relative">
            <div className="inline-block px-4 py-1.5 border-2 border-black font-sans font-black text-sm uppercase tracking-[0.2em] transform -skew-x-12 rotate-2 shadow-[2px_2px_0_#000] mb-8 animate-float bg-comicRed text-white">
              <span className="font-comic text-2xl font-black uppercase tracking-wider">
                DEVRİMSEL FORMÜL
              </span>
            </div>
            <h2 className="font-comic text-2xl md:text-4xl text-black uppercase tracking-wide leading-none mt-2">
              WEIDER FORMÜLLERİNİ BENZERSİZ KILAN NE?
            </h2>
            <p className="font-sans text-sm md:text-base font-bold text-comicGrayLight max-w-2xl mx-auto mt-4 leading-relaxed">
              Birçok takviye markası ucuza kaçar veya tescilli karışım (proprietary blend) adı altında içeriklerini gizler. WEIDER ise en yüksek standartlarda, tamamen şeffaf içerikli ürünler sunar. Farkı kıyaslayın:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch relative">
            
            <div 
              ref={powBadgeRef}
              className="motion-rect-c absolute top-1/2 left-1/2 z-30 bg-comicRed text-comicYellow border-4 border-black rounded-3xl font-lilita text-5xl md:text-7xl px-8 py-3 shadow-[6px_6px_0_#000] uppercase font-black tracking-wider text-stroke-black pointer-events-none select-none hidden lg:block"
              style={{ transform: "translate(-50%, -50%) rotate(-12deg) skewX(-6deg)" }}
            >
              BAM!
            </div>

            <div 
              ref={rivalsRef}
              className="bg-zinc-200 border-4 border-black rounded-2xl p-8 md:p-10 shadow-comic flex flex-col justify-between relative transform -rotate-1 animate-float-slow"
            >
              <div className="absolute inset-0 bg-halftone-black opacity-[0.08] pointer-events-none"></div>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-comic text-4xl text-zinc-500 -rotate-6 shadow-[2px_2px_0_#000]">?</span>
                  <h3 className="font-comic text-2xl md:text-3xl text-zinc-600 uppercase tracking-wide">
                    SIRADAN MARKALAR
                  </h3>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <span className="font-comic text-2xl text-comicRed mr-2 leading-none -rotate-2">NO!</span>
                    <div>
                      <h4 className="font-comic text-base uppercase text-zinc-700 tracking-wide">Tescilli Karışımlar</h4>
                      <p className="font-sans text-xs text-zinc-600 font-semibold leading-relaxed">
                        Etikette hangi maddeden ne kadar olduğu gizlenen, tüketiciyi yanıltan ucuz formüller.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="font-comic text-2xl text-comicRed mr-2 leading-none -rotate-2">NO!</span>
                    <div>
                      <h4 className="font-comic text-base uppercase text-zinc-700 tracking-wide">Etkisiz Etken Maddeler</h4>
                      <p className="font-sans text-xs text-zinc-600 font-semibold leading-relaxed">
                        Reklam amacıyla eklenen ancak klinik etki göstermeyecek kadar düşük dozlar.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="font-comic text-2xl text-comicRed mr-2 leading-none -rotate-2">NO!</span>
                    <div>
                      <h4 className="font-comic text-base uppercase text-zinc-700 tracking-wide">Gereksiz Kafein ve Stimülanlar</h4>
                      <p className="font-sans text-xs text-zinc-600 font-semibold leading-relaxed">
                        Anlık enerji patlaması ve çarpıntı yapan ama kas gelişimini desteklemeyen içerikler.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t-2 border-zinc-400 font-sans text-xs font-black text-zinc-500 uppercase tracking-wider">
                SONUÇ: ANTRENMAN ORTASINDA ENERJİ ÇÖKÜŞÜ VE DÜŞÜK PERFORMANS.
              </div>
            </div>

            <div 
              ref={weiderOutperformsRef}
              className="bg-comicYellow border-4 border-black rounded-2xl p-8 md:p-10 shadow-comic-lg flex flex-col justify-between relative transform rotate-1 animate-float"
            >
              <div className="absolute inset-0 bg-halftone-orange opacity-[0.15] pointer-events-none"></div>

              <div className="pt-4">
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-comic text-4xl text-comicOrange rotate-6 shadow-[2px_2px_0_#000]">!</span>
                  <h3 className="font-comic text-2xl md:text-3xl text-black uppercase tracking-wide">
                    WEIDER STANDARTLARI
                  </h3>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <span className="font-comic text-2xl text-green-600 mr-2 leading-none rotate-2">YES!</span>
                    <div>
                      <h4 className="font-comic text-base uppercase text-black tracking-wide">%100 Şeffaf İçerik</h4>
                      <p className="font-sans text-xs text-black/80 font-bold leading-relaxed">
                        Her ölçekte hangi bileşenden ne kadar aldığınızı net bir şekilde görün. Gizli formül yok.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="font-comic text-2xl text-green-600 mr-2 leading-none rotate-2">YES!</span>
                    <div>
                      <h4 className="font-comic text-base uppercase text-black tracking-wide">Klinik Olarak Kanıtlanmış Dozajlar</h4>
                      <p className="font-sans text-xs text-black/80 font-bold leading-relaxed">
                        Bilimsel araştırmalarca performansı kanıtlanmış miktarlarda aktif maddeler.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="font-comic text-2xl text-green-600 mr-2 leading-none rotate-2">YES!</span>
                    <div>
                      <h4 className="font-comic text-base uppercase text-black tracking-wide">Maksimum Biyoyararlanım</h4>
                      <p className="font-sans text-xs text-black/80 font-bold leading-relaxed">
                        Sindirim sistemini yormayan, yüksek kaliteli ve hızlı emilen aktif bileşenler.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t-2 border-black font-sans text-xs font-black text-black uppercase tracking-wider">
                SONUÇ: MAKSİMUM GÜÇ, PUMP HİSSİ VE ETKİLİ KAS ONARIMI.
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="py-24 px-6 md:px-12 bg-comicBlack border-b-4 border-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="motion-rect-b relative inline-block transform rotate-1 skew-x-1 mb-4 px-6 py-2">
              <SplitText
                text="DÜNYA GENELI YORUMLAR"
                className="font-lilita text-3xl md:text-5xl text-white text-stroke-thick tracking-wider block relative z-10"
                animation="bounce"
                stagger={0.05}
              />
              <div className="motion-still absolute inset-0 bg-comicRed border-4 border-black -z-10 rounded-xl shadow-comic"></div>
            </div>
            <p className="font-sans text-comicOrange font-bold text-lg md:text-xl uppercase tracking-widest mt-4">
              FARKLI ÜLKELERDEN KULLANICI NOTLARI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal delay={0}>
              <div className="bg-white text-black border-4 border-black rounded-2xl p-6 shadow-comic flex flex-col justify-between transform -rotate-1 hover:rotate-0 transition-transform duration-200" data-cursor="EFSANE!">
                <div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-comicOrange text-black" />
                    ))}
                  </div>
                  <p className="font-sans text-sm italic text-comicGray font-bold mb-6">
                    &ldquo;WEIDER RAGE antrenman öncesi takviyesi ağır kaldırış seanslarımı tamamen değiştirdi. Damar genişlemesi (pump) etkisi harika ve antrenman sonrasında halsizlik yaşamıyorum.&rdquo;
                  </p>
                </div>
                <div className="border-t-2 border-black pt-4 flex items-center justify-between">
                  <span className="font-comic text-lg text-comicRed">MARCUS V.</span>
                  <span className="font-sans text-[10px] font-black uppercase text-comicGrayLight">GÜÇ SPORCUSU</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={120}>
              <div className="bg-comicYellow text-black border-4 border-black rounded-2xl p-6 shadow-comic flex flex-col justify-between transform rotate-2 hover:rotate-0 transition-transform duration-200" data-cursor="SEÇKİN!">
                <div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-comicRed text-black" />
                    ))}
                  </div>
                  <p className="font-sans text-sm italic text-black font-bold mb-6">
                    &ldquo;Birçok farklı izole protein tozu denedim ama WEIDER Whey gerçekten başka bir seviye. Hem topaklanma yapmadan kolayca karışıyor hem de tadı çok hafif.&rdquo;
                  </p>
                </div>
                <div className="border-t-2 border-black pt-4 flex items-center justify-between">
                  <span className="font-comic text-lg text-black">SARAH K.</span>
                  <span className="font-sans text-[10px] font-black uppercase text-black/60">CROSSFIT SPORCUSU</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={240}>
              <div className="bg-comicOrange text-black border-4 border-black rounded-2xl p-6 shadow-comic flex flex-col justify-between transform -rotate-2 hover:rotate-0 transition-transform duration-200" data-cursor="ŞAMPİYON!">
                <div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-comicYellow text-black" />
                    ))}
                  </div>
                  <p className="font-sans text-sm italic text-black font-bold mb-6">
                    &ldquo;Çift antrenman yaptığım günlerde bile toparlanma (recovery) sürem çok kısaldı. WEIDER BCAA kas kramplarını engellemeye yardımcı oluyor ve antrenman içi dayanıklılığı artırıyor.&rdquo;
                  </p>
                </div>
                <div className="border-t-2 border-black pt-4 flex items-center justify-between">
                  <span className="font-comic text-lg text-black">ALEX R.</span>
                  <span className="font-sans text-[10px] font-black uppercase text-black/60">HİBRİT KOŞUCU</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <footer className="bg-black py-16 px-6 md:px-12 border-t-4 border-black relative overflow-hidden">
        <div className="absolute inset-0 bg-halftone-red opacity-10 pointer-events-none"></div>
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-12 relative z-10">
          
          <div className="max-w-md flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="bg-comicOrange border-2 border-black rounded-xl px-6 py-2 -skew-x-6 transform rotate-1 mb-6 shadow-comic animate-float">
              <span className="font-comic text-2xl md:text-3xl text-black font-black uppercase">
                WEIDER KULÜBÜNE KATIL!
              </span>
            </div>
            <p className="font-sans text-sm text-gray-400 font-bold mb-6">
              Gizli ürün lansmanları, sınırlı sayıda özel seriler ve profesyonel antrenman rehberlerinden ilk sen haberdar ol.
            </p>

            <div className="w-full flex border-3 border-black rounded-xl overflow-hidden shadow-comic">
              <input
                type="email"
                placeholder="E-POSTA ADRESİNİ YAZ..."
                className="bg-comicGray text-white px-4 py-3 font-sans text-sm font-bold tracking-wider placeholder-gray-500 flex-grow outline-none border-r-3 border-black w-full"
                data-cursor="YAZ..."
              />
              <button
                className="bg-comicYellow hover:bg-comicOrange text-black font-comic text-lg px-6 py-3 transition-colors uppercase font-black"
                data-cursor="KATIL!"
              >
                KATIL
              </button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-12 text-center lg:text-left font-sans text-xs uppercase tracking-widest font-black text-gray-400">
            <div className="flex flex-col gap-3">
              <span className="text-comicOrange text-sm font-comic tracking-wider mb-1">ÜRÜNLER</span>
              <a href="#" className="hover:text-white transition-colors">WHEY PROTEİN</a>
              <a href="#" className="hover:text-white transition-colors">KREATİN MONOHİDRAT</a>
              <a href="#" className="hover:text-white transition-colors">PRE-WORKOUT (GÜÇ & ODAK)</a>
              <a href="#" className="hover:text-white transition-colors">BCAA & TOPARLANMA</a>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-comicOrange text-sm font-comic tracking-wider mb-1">ŞİRKET</span>
              <a href="#" className="hover:text-white transition-colors">HİKAYEMİZ</a>
              <a href="#" className="hover:text-white transition-colors">BİLİMSEL YAYINLAR</a>
              <a href="#" className="hover:text-white transition-colors">SPORCULARIMIZ</a>
              <a href="#" className="hover:text-white transition-colors">BİZE ULAŞIN</a>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-comicOrange text-sm font-comic tracking-wider mb-1">YASAL</span>
              <a href="#" className="hover:text-white transition-colors">KULLANIM KOŞULLARI</a>
              <a href="#" className="hover:text-white transition-colors">GİZLİLİK POLİTİKASI</a>
              <a href="#" className="hover:text-white transition-colors">İADE VE DEĞİŞİM</a>
              <a href="#" className="hover:text-white transition-colors">FDA YASAL UYARISI</a>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto border-t border-comicGray mt-16 pt-8 text-center text-[10px] text-gray-500 font-medium leading-relaxed">
          <p className="mb-4">
            * BU BEYANLAR GIDA VE İLAÇ DAİRESİ (FDA) TARAFINDAN DEĞERLENDİRİLMEMİŞTİR. BU ÜRÜNLER HERHANGİ BİR HASTALIĞI TEŞHİS ETMEK, TEDAVİ ETMEK VEYA ÖNLEMEK AMACI TAŞIMAZ.
          </p>
          <p>
            &copy; {new Date().getFullYear()} SOFTBRIDGE SUPPLEMENTS. ALL RIGHTS RESERVED.
            <br />
            <span className="text-gray-600 mt-1 inline-block">DESIGNED & DEVELOPED BY SOFTBRIDGE SOLUTIONS.</span>
          </p>
        </div>
      </footer>
    </div>
    <ProductDetailModal
      product={selectedProduct}
      onClose={() => setSelectedProduct(null)}
    />
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-comicBlack" />}>
      <HomeContent />
    </Suspense>
  );
}

import React, { useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

// Assets
import karinaImg from "@assets/WhatsApp_Image_2026-04-17_at_12.29.44_1776517044843.jpeg";
import teteiaMp4 from "@assets/teteia_1776517051494.mp4";

const VERSES = [
  {
    text: "O Senhor é o meu pastor; de nada me faltará.",
    reference: "Salmos 23:1",
  },
  {
    text: "Porque eu sei os planos que tenho para vocês, diz o Senhor, planos de fazê-los prosperar e não de causar dano, planos de dar a vocês esperança e um futuro.",
    reference: "Jeremias 29:11",
  },
  {
    text: "Mas os que esperam no Senhor renovarão as suas forças. Voarão alto como águias; correrão e não ficarão exaustos, andarão e não se cansarão.",
    reference: "Isaías 40:31",
  },
  {
    text: "Porque Deus tanto amou o mundo que deu o seu Filho Unigênito, para que todo o que nele crer não pereça, mas tenha a vida eterna.",
    reference: "João 3:16",
  },
  {
    text: "Bem-aventurados os que choram, pois serão consolados.",
    reference: "Mateus 5:4",
  },
  {
    text: "A morte foi destruída pela vitória! Onde está, ó morte, a tua vitória? Onde está, ó morte, o teu aguilhão?",
    reference: "1 Coríntios 15:54-55",
  },
];

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 1, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function App() {
  const [emblaRef] = useEmblaCarousel({ loop: true, duration: 40 }, [
    Autoplay({ delay: 6000, stopOnInteraction: false }),
  ]);
  
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);

  // Use a single image in an array to support future additions
  const carouselImages = [karinaImg];

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/20 selection:text-primary">
      
      {/* 1. Hero Section */}
      <section className="relative h-screen w-full overflow-hidden bg-foreground">
        <div className="absolute inset-0 z-0" ref={emblaRef}>
          <div className="flex h-full w-full touch-pan-y">
            {carouselImages.map((src, index) => (
              <div key={index} className="relative min-w-full flex-none h-full">
                <motion.img 
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 10, ease: "easeOut" }}
                  src={src} 
                  alt="Karina Shimada" 
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
              </div>
            ))}
          </div>
        </div>

        <motion.div 
          className="relative z-10 flex flex-col items-center justify-end h-full pb-24 px-6 text-center"
          style={{ opacity: heroOpacity, y: heroY }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          >
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-wide text-background mb-4 drop-shadow-md">
              Karina Shimada
            </h1>
            <div className="h-px w-24 bg-secondary mx-auto mb-6 opacity-70" />
            <p className="font-sans text-xl md:text-2xl tracking-widest text-background/90 uppercase mb-4">
              Mãe, Tia e Amiga
            </p>
            <p className="font-sans text-lg text-secondary/90 italic tracking-wider">
              25 de Janeiro de 1973 – 16 de Abril de 2026
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <div className="w-px h-16 bg-gradient-to-b from-secondary/80 to-transparent animate-pulse" />
          </motion.div>
        </motion.div>
      </section>

      {/* 2. Tribute / Memory Section */}
      <section className="py-24 md:py-36 px-6 relative max-w-4xl mx-auto text-center">
        <FadeIn>
          <h2 className="font-serif text-4xl md:text-5xl text-primary mb-8">
            Uma Vida de Amor e Luz
          </h2>
        </FadeIn>
        
        <div className="space-y-8 font-sans text-lg md:text-xl leading-relaxed text-foreground/80">
          <FadeIn delay={0.2}>
            <p>
              Karina iluminava os ambientes por onde passava. Com um sorriso gentil e um abraço acolhedor, ela transformava o ordinário em extraordinário.
            </p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p>
              Como mãe, sua dedicação era infinita. Como tia, era o porto seguro de alegrias e conselhos. Como amiga, uma presença constante, sempre pronta para ouvir e estender a mão. Sua generosidade não conhecia limites, e seu legado de afeto continuará vivo em cada coração que teve o privilégio de conhecê-la.
            </p>
          </FadeIn>
          <FadeIn delay={0.6}>
            <p>
              Hoje celebramos não apenas a saudade, mas a imensa sorte de termos compartilhado a vida com alguém tão especial. A luz que ela acendeu em nós jamais se apagará.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 3. Video Section */}
      <section className="py-16 bg-muted/30 relative">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl text-primary mb-4">Momentos Especiais</h2>
              <div className="h-px w-16 bg-secondary mx-auto" />
            </div>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-foreground/5 p-2 ring-1 ring-border/50">
              <div className="aspect-video w-full rounded-xl overflow-hidden bg-black/10">
                <video 
                  controls 
                  preload="metadata"
                  className="w-full h-full object-cover"
                  poster={karinaImg}
                >
                  <source src={teteiaMp4} type="video/mp4" />
                  Seu navegador não suporta a reprodução de vídeos.
                </video>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 4. Biblical Quotes Section */}
      <section className="py-24 md:py-36 px-6 max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl text-primary mb-4">Palavras de Esperança</h2>
            <div className="h-px w-16 bg-secondary mx-auto" />
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {VERSES.map((verse, idx) => (
            <FadeIn key={idx} delay={idx * 0.15} className="flex flex-col h-full justify-between">
              <blockquote className="font-serif text-xl md:text-2xl leading-relaxed text-foreground/80 mb-6 relative">
                <span className="text-4xl text-secondary/40 absolute -top-4 -left-4 font-sans">&quot;</span>
                {verse.text}
                <span className="text-4xl text-secondary/40 absolute -bottom-4 -right-0 font-sans">&quot;</span>
              </blockquote>
              <cite className="font-sans text-sm font-semibold tracking-wider text-primary uppercase mt-auto">
                — {verse.reference}
              </cite>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* 5. Closing / Footer */}
      <footer className="relative bg-foreground text-background py-32 px-6 overflow-hidden text-center">
        <div className="absolute inset-0 opacity-10 mix-blend-overlay">
          <img src={karinaImg} alt="" className="w-full h-full object-cover blur-sm" />
        </div>
        
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <FadeIn>
            <h2 className="font-serif text-4xl md:text-5xl text-background/90 mb-6">
              Karina Shimada
            </h2>
            <div className="flex items-center gap-4 text-secondary/80 mb-12 justify-center">
              <span>1973</span>
              <span className="w-1.5 h-1.5 rounded-full bg-secondary/80" />
              <span>2026</span>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.3}>
            <p className="font-serif text-2xl md:text-3xl italic text-background/80 font-light mb-8">
              "Até nos encontrarmos novamente..."
            </p>
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-secondary/50 to-transparent mx-auto" />
          </FadeIn>
        </div>
      </footer>

    </main>
  );
}

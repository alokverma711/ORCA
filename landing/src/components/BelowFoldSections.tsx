'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MagneticText } from '@/components/ui/morphing-cursor';
import { GlassFilter } from '@/components/GlassFilterDefs';
import { Footer } from '@/components/ui/footer-section';
import ArcFlowCarousel, { SmoothSliderItem } from '@/components/ui/arc-flow-carousel';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function Section({ id, children, className = '', style }: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <section
      id={id}
      style={style}
      className={`relative z-10 bg-[#060b13]/92 backdrop-blur-2xl px-4 sm:px-10 md:px-16 py-16 sm:py-24 md:py-32 ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#060b13]/40 via-transparent to-[#060b13]/40"
        aria-hidden="true"
      />
      <div className="relative">{children}</div>
    </section>
  );
}

function RevealBlock({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.8, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── 01: The Problem (Interactive Folder-Tab Cutout Cards) ──────────────────
interface FramerFolderCardData {
  id: string;
  title: string;
  description: string;
  code: string;
  borderColor: string;
  fGColor: string;
  titleColor: string;
  descriptionColor: string;
  numberColor: string;
  iconColor: string;
  bgImage: string;
  artImage: string;
  href: string;
  sourceName?: string;
}

const indicators: FramerFolderCardData[] = [
  {
    id: "01",
    title: "8,13,431 Fisherman Families",
    description: "Fisherman families navigate complex scientific bulletins without conversational decision support (CMFRI).",
    code: "010038",
    borderColor: "rgb(1, 0, 38)",
    fGColor: "rgb(4, 0, 74)",
    titleColor: "rgb(255, 255, 255)",
    descriptionColor: "rgba(255, 255, 255, 0.6)",
    numberColor: "rgb(255, 255, 255)",
    iconColor: "rgb(255, 255, 255)",
    bgImage: "/images/framer-cards/bg_1.jpg",
    artImage: "/images/framer-cards/art_1.png",
    href: "https://mfcensus-gis.cmfri.org.in/",
    sourceName: "ICAR-CMFRI Marine Fisheries Census",
  },
  {
    id: "02",
    title: "Satellite Earth Observation",
    description: "Daily Earth Observation data synthesized into real-time, evidence-grounded marine intelligence.",
    code: "020038",
    borderColor: "rgb(193, 207, 222)",
    fGColor: "rgb(228, 231, 237)",
    titleColor: "rgb(18, 18, 18)",
    descriptionColor: "rgba(18, 18, 18, 0.8)",
    numberColor: "rgb(18, 18, 18)",
    iconColor: "rgb(18, 18, 18)",
    bgImage: "/images/framer-cards/bg_2.jpg",
    artImage: "/images/framer-cards/art_2.png",
    href: "https://www.mosdac.gov.in/oceansat-3",
    sourceName: "ISRO MOSDAC Satellite Telemetry",
  },
  {
    id: "03",
    title: "5 Regional Dialects",
    description: "Tamil, Bengali, Malayalam, Hindi & English with localized natural language understanding at the edge.",
    code: "030038",
    borderColor: "rgb(2, 4, 5)",
    fGColor: "rgb(16, 27, 33)",
    titleColor: "rgb(255, 255, 255)",
    descriptionColor: "rgba(255, 255, 255, 0.6)",
    numberColor: "rgb(255, 255, 255)",
    iconColor: "rgb(255, 255, 255)",
    bgImage: "/images/framer-cards/bg_3.jpg",
    artImage: "/images/framer-cards/art_3.png",
    href: "https://github.com/openai/whisper#available-models-and-languages",
    sourceName: "OpenAI Whisper Language Docs",
  }
];

const FRAMER_SPRING = {
  type: "spring" as const,
  duration: 1,
  bounce: 0.4,
  delay: 0,
};

const FOLDER_MASK_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='170' height='32' fill='none'%3E%3Cpath fill='%23000' d='M0 0v32h170v-2h-25.95a20 20 0 0 1-13.324-5.085L108.528 5.085A20 20 0 0 0 95.203 0Z'/%3E%3C/svg%3E")`;

function FolderArrow({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
    >
      <path
        d="M 0 10 L 10 0"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(7 7)"
      />
      <path
        d="M 0 0 L 10 0 L 10 10"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(7 7)"
      />
    </svg>
  );
}

const FolderCard = ({ data }: { data: FramerFolderCardData }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={data.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${data.title} - View official documentation & evidence (${data.sourceName || 'Verified Source'})`}
      className="relative block w-full max-w-[338px] sm:w-[338px] h-[360px] rounded-[28px] overflow-hidden cursor-pointer select-none transition-all duration-300 shadow-2xl group flex-none no-underline hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:scale-[1.015]"
      style={{
        border: `9px solid ${data.borderColor}`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* LAYER 1: Background Image with hover expansion */}
      <motion.div
        initial={false}
        animate={{
          inset: isHovered ? -27 : 0,
        }}
        transition={FRAMER_SPRING}
        className="absolute z-0 overflow-hidden pointer-events-none"
      >
        <img
          src={data.bgImage}
          alt=""
          className="w-full h-full object-cover object-center pointer-events-none"
        />
      </motion.div>

      {/* LAYER 2: Animated PNG / 3D Art Element */}
      <motion.div
        initial={false}
        animate={{
          top: isHovered ? 57 : 95,
          rotate: isHovered ? -10 : 0,
        }}
        transition={FRAMER_SPRING}
        className="absolute left-1/2 -translate-x-1/2 w-[270px] z-[1] pointer-events-none"
      >
        <img
          src={data.artImage}
          alt={data.title}
          className="w-full h-auto object-contain pointer-events-none"
        />
      </motion.div>

      {/* LAYER 3: Solid Foreground Folder Overlay (Flush to Border) */}
      <motion.div
        initial={false}
        animate={{
          top: isHovered ? 148 : 124,
        }}
        transition={FRAMER_SPRING}
        className="absolute left-0 w-full h-[100vh] z-[2] pointer-events-none"
      >
        {/* FG Top: 170x32px Tab with flush left edge and exact S-curve shoulder */}
        <div
          className="absolute top-0 -left-px w-[171px] h-[32px] z-[1]"
          style={{
            backgroundColor: data.fGColor,
            mask: `${FOLDER_MASK_SVG} no-repeat center / cover`,
            WebkitMask: `${FOLDER_MASK_SVG} no-repeat center / cover`,
          }}
        />

        {/* FG Body: Folder body connected at top: 30px, seamless from left to right border */}
        <div
          className="absolute top-[30px] -left-px -right-px h-[100vh] z-[1]"
          style={{
            backgroundColor: data.fGColor,
          }}
        >
          {/* Subtle code stamp at the bottom of the flap */}
          <div className="absolute top-[150px] left-1/2 -translate-x-1/2 opacity-30 font-mono text-[10px] select-none text-current">
            {data.code}
          </div>
        </div>
      </motion.div>

      {/* LAYER 4: Large Folder Number */}
      <motion.div
        initial={false}
        animate={{
          top: isHovered ? 166 : 142,
        }}
        transition={FRAMER_SPRING}
        className="absolute left-[27px] z-[3] pointer-events-none"
      >
        <span
          className="font-heading font-medium text-[48px] leading-none tracking-[-0.05em]"
          style={{ color: data.numberColor }}
        >
          {data.id}
        </span>
      </motion.div>

      {/* LAYER 5: Arrow Icon on the shoulder */}
      <motion.div
        initial={false}
        animate={{
          top: isHovered ? 193 : 169,
        }}
        transition={FRAMER_SPRING}
        className="absolute right-[27px] w-5 h-5 z-[3] pointer-events-none flex items-center justify-center"
      >
        <FolderArrow color={data.iconColor} />
      </motion.div>

      {/* LAYER 6: Bottom Text (Fixed Title & Description without tiny evidence pill) */}
      <div className="absolute bottom-[20px] left-[24px] right-[24px] z-[4] flex flex-col gap-1.5 pointer-events-none">
        <h3
          className="font-heading text-[15px] font-semibold leading-snug"
          style={{ color: data.titleColor }}
        >
          {data.title}
        </h3>
        <p
          className="text-[12px] font-light leading-[1.38]"
          style={{ color: data.descriptionColor }}
        >
          {data.description}
        </p>
      </div>
    </a>
  );
};

function ProblemSection() {
  return (
    <Section id="problem" className="border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* Section Header */}
        <div className="space-y-4 max-w-4xl">
          <RevealBlock>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-teal-400 font-bold">
                [ 01 // SIH26176 PROBLEM CONTEXT ]
              </span>
              <span className="h-px flex-1 max-w-[80px] bg-teal-400/30" />
            </div>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <h2
              className="text-3xl sm:text-5xl lg:text-7xl leading-[1.08] text-white font-heading font-extrabold tracking-tight"
              style={{ textShadow: '0 2px 24px rgba(0,0,0,0.65)' }}
            >
              The ocean is{' '}
              <span className="font-script text-teal-300 font-normal lowercase tracking-normal text-3xl sm:text-6xl lg:text-8xl inline-block px-1">
                talking
              </span>
              .<br />
              <MagneticText
                text="ORCA"
                hoverText="SIH26176"
                circleSize={210}
                circleBgColor="bg-teal-300"
                hoverTextColor="text-[#050B14]"
                textClassName="text-3xl sm:text-5xl lg:text-7xl text-white font-heading font-extrabold tracking-tight"
                className="mr-2"
              />{' '}
              delivers the{' '}
              <span className="font-display font-extrabold uppercase text-white tracking-tight underline decoration-teal-400/40 decoration-4 underline-offset-8">
                intelligence layer
              </span>
              .
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.2}>
            <p className="mt-6 max-w-2xl text-base sm:text-lg text-white/70 font-light leading-relaxed">
              Every day, ISRO MOSDAC and INCOIS produce extensive satellite Earth Observation and
              oceanographic data — sea surface temperature, chlorophyll concentration, potential fishing zones,
              and wave state forecasts. ORCA bridges raw scientific data with coastal operators through
              explainable, evidence-grounded agentic reasoning.
            </p>
          </RevealBlock>
        </div>

        {/* ── Folder Cards Grid ── */}
        <div className="w-full flex flex-col md:flex-row flex-wrap xl:flex-nowrap gap-6 justify-center items-center">
          {indicators.map((item, i) => (
            <RevealBlock key={item.id} delay={0.15 + i * 0.1} className="w-full max-w-[338px] flex justify-center">
              <FolderCard data={item} />
            </RevealBlock>
          ))}
        </div>

      </div>
    </Section>
  );
}

// ─── 02: Architecture (Arc-Flow Multi-Agent Carousel) ─────────────────────
function HowItWorksSection() {
  const architecturePipelines: SmoothSliderItem[] = [
    {
      title: "Automated EO Ingestion",
      label: "MOSDAC & INCOIS",
      description:
        "Autonomous discovery and continuous retrieval of Oceansat-3 SST, Chlorophyll-a, and INCOIS ERDDAP Potential Fishing Zone bulletins.",
      src: "/images/pipelines/pipeline-1-eo-ingestion.jpg",
      alt: "Satellite Earth Observation and Oceanic Telemetry",
    },
    {
      title: "LangGraph Multi-Agent Mesh",
      label: "Cyclic Orchestration",
      description:
        "Planner Agent autonomously decomposes complex natural language queries, routing subtasks to dedicated Ocean, Weather, and Risk specialist agents.",
      src: "/images/pipelines/pipeline-2-agent-mesh.jpg",
      alt: "Autonomous Cyclic Agent Mesh Network",
    },
    {
      title: "Ocean & PFZ Reasoning",
      label: "Marine Intelligence",
      description:
        "Spatial-temporal correlation of thermal fronts, chlorophyll convergence, and pelagic fish migration patterns for precision fishing advisories.",
      src: "/images/pipelines/pipeline-3-pfz-reasoning.jpg",
      alt: "Bioluminescent Ocean Currents and Sea Surface Gradients",
    },
    {
      title: "Marine Hazard & Squall Engine",
      label: "Extreme Weather",
      description:
        "Continuous monitoring of wave heights, squall warnings, wind vectors, and cyclone trajectory forecasting to prevent capsizing at sea.",
      src: "/images/pipelines/pipeline-4-squall-engine.jpg",
      alt: "Atmospheric Storm Radar and Maritime Weather Warnings",
    },
    {
      title: "IMBL Geofencing Protocol",
      label: "Maritime Compliance",
      description:
        "Autonomous boundary detection against International Maritime Boundary Lines (IMBL) and Marine Protected Areas (MPA) for legal compliance.",
      src: "/images/pipelines/pipeline-5-imbl-geofence.jpg",
      alt: "Maritime Boundary GIS and Nautical Radar Geofence",
    },
    {
      title: "Multilingual Indic Synthesis",
      label: "5 Regional Languages",
      description:
        "Synthesizer Agent formats localized voice and text advisories in Tamil, Bengali, Malayalam, Hindi, and English for low-connectivity coastal users.",
      src: "/images/pipelines/pipeline-6-indic-synthesis.jpg",
      alt: "Acoustic Dialect Synthesis and Voice Telemetry",
    },
    {
      title: "Verifiable Evidence Provenance",
      label: "Grounded Attribution",
      description:
        "Every safety advisory cites specific MOSDAC satellite grid tiles, sensor timestamps, and official MoES bulletins with verifiable audit trails.",
      src: "/images/pipelines/pipeline-7-evidence-provenance.jpg",
      alt: "Verifiable Cryptographic and Telemetry Provenance",
    },
  ];

  return (
    <section id="how-it-works" className="relative z-10 bg-[#060b13] border-t border-white/[0.08] overflow-hidden">
      {/* Section Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-10 md:px-16 pt-16 sm:pt-24 md:pt-32 pb-4 space-y-4">
        <RevealBlock>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-teal-400 font-bold">
              [ 02 // AGENTIC SYSTEM ARCHITECTURE ]
            </span>
            <span className="h-px flex-1 max-w-[80px] bg-teal-400/30" />
          </div>
        </RevealBlock>

        <RevealBlock delay={0.1}>
          <h2
            className="text-4xl sm:text-5xl lg:text-7xl leading-[1.08] text-white font-heading font-extrabold tracking-tight"
            style={{ textShadow: '0 2px 24px rgba(0,0,0,0.65)' }}
          >
            From{' '}
            <span className="font-script text-teal-300 font-normal lowercase tracking-normal text-4xl sm:text-6xl lg:text-8xl inline-block px-1">
              satellite observation
            </span>{' '}
            to{' '}
            <span className="font-display font-extrabold uppercase text-white tracking-tight">
              natural language
            </span>
            <br />
            with full provenance.
          </h2>
        </RevealBlock>

        <RevealBlock delay={0.2}>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl font-light">
            Drag, scroll, or hover through the stateful multi-agent DAG mesh coordinating Earth Observation telemetry, marine reasoning, and verifiable evidence generation.
          </p>
        </RevealBlock>
      </div>

      {/* Arc-Flow Carousel Showcase */}
      <div className="w-full relative pb-12">
        <ArcFlowCarousel
          items={architecturePipelines}
          radiusRatio={0.92}
          cardRatio={0.27}
          minCardWidth={220}
          maxCardWidth={400}
          cardAspect={848 / 1264}
          overlap={-0.02}
          arcOffset={0.43}
          smoothing={5.5}
          dragSensitivity={1.2}
          momentum={1}
          snap={false}
          wheelControl="horizontal"
          autoRotateSpeed={0}
          pauseOnHover
          surfaceColor="#060b13"
          className="h-[520px] sm:h-[680px] lg:h-[820px] w-full"
        />
      </div>
    </section>
  );
}

export function BelowFoldSections() {
  return (
    <div className="relative w-full">
      <GlassFilter />
      <ProblemSection />
      <HowItWorksSection />
      <Footer />
    </div>
  );
}

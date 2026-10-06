import { useEffect, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Instagram, Menu, Play, X } from "lucide-react";
import { motion } from "framer-motion";
import CursorPulse from "@/components/CursorPulse";

type MediaItem = { title: string; label: string; image: string; src: string };

const media = {
  team: "/media/team/team-hero-replacement.jpeg",
  hera: "/media/team/hera-amiri.jpeg",
  khatira: "/media/team/khatira-ghasemi.jpeg",
  khatiraCEO: "/media/team/khatira-ceo.jpeg",
  meet: "/media/team/padel-court-team.jpeg",
  jerome: "/media/team/jerome-web-developer.jpeg",
  behnaz: "/media/team/behnaz-manager.jpeg",
  asma: "/media/team/asma-social-media-manager.jpeg",
  ahmad: "/media/team/ahmad-photographer-videographer.jpeg",
  atrin: "/media/team/atrin.jpeg",
  maziyar: "/media/team/maziyar-graphic-designer.jpeg",
  ayaan: "/media/team/ayaan-set-coordinator.jpeg",
  paniz: "/media/team/paniz-photographer-videographer.jpeg",
  zahra: "/media/team/zahra-art-director.jpeg",
  cafe: "/media/cafe/cafe-main.jpeg",
  cafeDetail: "/media/cafe/cafe-detail.jpeg",
  perfume1: "/media/perfume/perfume-1.jpeg",
  perfume2: "/media/perfume/perfume-2.jpeg",
  perfume3: "/media/perfume/perfume-3.jpeg",
  perfume4: "/media/perfume/perfume-4.jpeg",
  perfume5: "/media/perfume/perfume-5.jpeg",
  perfume6: "/media/perfume/perfume-6.jpeg",
  perfume7: "/media/perfume/perfume-7.jpeg",
  perfume8: "/media/perfume/perfume-8.jpeg",
  padel: "/media/padel/padel-main.jpeg",
  padelDetail: "/media/padel/padel-detail.jpeg",
  padelCourt: "/media/padel/padel-court.jpeg",
  extra1: "/media/extra/extra-1.jpeg",
  extra2: "/media/extra/extra-2.jpeg",
  extra3: "/media/extra/extra-3.jpeg",
  extra4: "/media/extra/extra-4.jpeg",
  extra5: "/media/extra/extra-5.jpeg",
  extra6: "/media/extra/extra-6.jpeg",
  extra7: "/media/extra/extra-7.jpeg",
  extra8: "/media/extra/extra-8.jpeg",
  extra9: "/media/extra/extra-9.jpeg",
  extra10: "/media/extra/extra-10.jpeg",
  mobileGimbal: "/media/mobile/gimbal-phone.jpeg",
  mobileFront: "/media/mobile/field-front.jpeg",
  mobileSide: "/media/mobile/field-side.jpeg",
  cinemaFlower: "/media/cinema/flower-shop.jpeg",
  cinemaPadel: "/media/cinema/padel-friends.jpeg",
};

const videos: MediaItem[] = [
  { title: "Flower Shop - Reel", label: "Short-form film for Cute Flowers", image: media.extra6, src: "/media/flower/flower-film.mp4" },
  { title: "Padel Friends", label: "Court-side energy and downtime", image: media.padel, src: "/media/padel/padel-film.mp4" },
  { title: "Café Project", label: "A softer kind of morning", image: media.cafe, src: "/media/cafe/cafe-film.mp4" },
  { title: "Café - Alternate Cut", label: "The details do the talking", image: media.cafeDetail, src: "/media/cafe/cafe-film-alt.mp4" },
  { title: "Moudon Reel", label: "A visual study in motion", image: media.perfume1, src: "/media/extra/moudon-film.mp4" },
  { title: "Extra Work", label: "More work from the club", image: media.extra4, src: "/media/extra/extra-film-1.mp4" },
  { title: "Extra Work - Film", label: "A second visual study", image: media.extra5, src: "/media/extra/extra-film-2.mp4" },
];

const navigationSections = [
  { id: "top", label: "Home" },
  { id: "about", label: "Our people" },
  { id: "services", label: "Our services" },
  { id: "archive", label: "The Cafe" },
  { id: "scent", label: "Scent in frame" },
  { id: "padel", label: "Padel Court" },
  { id: "mobile", label: "Mobile, stabilised" },
  { id: "flower", label: "The Flower Shop" },
  { id: "film", label: "Cinema frames" },
  { id: "contact", label: "Contact" },
];

function Label({ children }: { children: React.ReactNode }) {
  return <span className="editorial-label">{children}</span>;
}

function Photo({ src, alt, className = "", tag, detail }: { src: string; alt: string; className?: string; tag?: string; detail?: string }) {
  return <div className={`editorial-photo ${className}`}><motion.img src={src} alt={alt} loading="lazy" whileHover={{ scale: 1.035 }} transition={{ duration: 0.5 }} />{tag && <span className="editorial-photo-tag">{tag}</span>}{detail && <span className="editorial-photo-detail">{detail}</span>}</div>;
}

function VideoPreview({ video, onOpen, tag }: { video: MediaItem; onOpen?: () => void; tag?: string }) {
  return <button className="editorial-video-preview" onClick={onOpen} aria-label={`Open ${video.title}`}><video src={video.src} autoPlay muted loop playsInline preload="auto" />{tag && <small className="editorial-video-tag">{tag}</small>}<b className="editorial-video-play" aria-hidden="true"><Play size={20} fill="currentColor" /></b><span>{video.title}</span></button>;
}

function CinemaPoster({ src, alt, title, tag }: { src: string; alt: string; title: string; tag: string }) {
  return <div className="editorial-cinema-poster"><img src={src} alt={alt} loading="lazy" /><span className="editorial-cinema-play" aria-hidden="true"><Play size={22} fill="currentColor" /></span><small>{tag}</small><strong>{title}</strong></div>;
}

function Caption({ title, detail }: { title: string; detail: string }) {
  return <div className="editorial-caption"><strong>{title}</strong><span>{detail}</span></div>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<MediaItem | null>(null);
  const [activeSection, setActiveSection] = useState("top");

  useEffect(() => {
    const updateActiveSection = () => {
      const marker = window.scrollY + window.innerHeight * 0.35;
      let currentSection = "top";
      navigationSections.forEach(({ id }) => {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= marker) currentSection = id;
      });
      setActiveSection(currentSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  return (
    <div className="editorial-site">
      <CursorPulse />
      <aside className="editorial-rail"><a href="#top" className="editorial-rail-mark">S</a><nav className="editorial-dots" aria-label="Page sections">{navigationSections.map(({ id, label }) => <a key={id} href={`#${id}`} className={activeSection === id ? "is-active" : ""} aria-label={`Go to ${label}`} title={label}><i /></a>)}</nav><small>EST. 2024</small></aside>
      <header className="editorial-nav">
        <a href="#top" className="editorial-mark">SIAH <span>Creative Club</span></a>
        <nav className={menuOpen ? "editorial-links is-open" : "editorial-links"}>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a><a href="#services" onClick={() => setMenuOpen(false)}>Services</a><a href="#archive" onClick={() => setMenuOpen(false)}>Archive</a><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
        <a className="editorial-social" href="https://www.instagram.com/siahcreativeclub" target="_blank" rel="noreferrer"><Instagram size={13} /> Instagram</a>
        <button className="editorial-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X size={18} /> : <Menu size={18} />}</button>
      </header>

      <main id="top" className="editorial-main">
        <section className="editorial-hero editorial-wrap">
          <div className="editorial-hero-copy"><Label>Creative club / Est. 2024</Label><h1>SIAH</h1><div className="editorial-rule" /><p>A tactile editorial of work, atmosphere &amp; craft - assembled for those who notice the details.</p><div className="editorial-hero-meta"><span>Manager - Khatira</span><span>Scroll <ArrowDownRight size={14} /></span></div></div>
          <div className="editorial-hero-image"><Photo src={media.team} alt="Khatira working" /><div className="editorial-image-note">Khatira</div><span className="editorial-page-count">001 / 008</span></div>
        </section>

        <section id="about" className="editorial-section editorial-wrap"><div className="editorial-section-heading"><Label>02 / Our people</Label><div className="editorial-rule" /><h2>Two hands, one vision.</h2></div><div className="editorial-team-grid">
          <div><Photo src={media.meet} alt="The team together" /><Caption title="Meet the Team" detail="SIAH - 2026" /></div>
          <div><Photo src={media.khatiraCEO} alt="Khatira CEO" /><Caption title="Khatira" detail="CEO" /></div>
          <div><Photo src={media.jerome} alt="Jerome Web Developer" /><Caption title="Jerome" detail="Web Developer" /></div>
          <div><Photo src={media.behnaz} alt="Behnaz Manager" /><Caption title="Behnaz" detail="Manager" /></div>
          <div><Photo src={media.ahmad} alt="Ahmad Photographer & Videographer" /><Caption title="Ahmad" detail="Photographer & Videographer" /></div>
          <div><Photo src={media.asma} alt="Asma Social Media Manager" /><Caption title="Asma" detail="Social Media Manager" /></div>
          <div><Photo src={media.maziyar} alt="Maziyar Graphic Designer" /><Caption title="Maziyar" detail="Graphic Designer" /></div>
          <div><Photo src={media.ayaan} alt="Ayaan Set Coordinator" /><Caption title="Ayaan" detail="Set Coordinator" /></div>
          <div><Photo src={media.atrin} alt="Atrin" /><Caption title="Atrin" detail="Creative Team" /></div>
          <div><Photo src={media.paniz} alt="Paniz Photographer & Videographer" /><Caption title="Paniz" detail="Photographer & Videographer" /></div>
          <div><Photo src={media.zahra} alt="Zahra Art Director" /><Caption title="Zahra" detail="Art Director" /></div>
          <div><Photo src={media.extra10} alt="The studio portrait" /><Caption title="The Studio" detail="In Session" /></div>
        </div></section>

        <section id="services" className="editorial-band"><div className="editorial-wrap editorial-section editorial-services"><Label>03 / Our services</Label><div className="editorial-rule" /><h2>What we make, and how.</h2><div className="editorial-services-grid"><div><Label>01</Label><h3>Brand Photography</h3><p>Editorial and commercial imagery built around your atmosphere - natural light, warm tones, and a story in every frame.</p></div><div><Label>02</Label><h3>Art Direction</h3><p>Full visual identity work: mood, palette, composition, and the connective tissue that makes a brand feel cohesive.</p></div><div><Label>03</Label><h3>Mobile Content</h3><p>Vertical-first content shot on professional mobile rigs - global-stabled, social-ready, fast to deliver.</p></div><div><Label>04</Label><h3>Videography</h3><p>Short-form film and motion: café atmospheres, product reveals, and lifestyle reels with a cinematic edit.</p></div><div><Label>05</Label><h3>Creative Strategy</h3><p>The thinking before the shoot - concepts, shot lists, and a content roadmap tailored to your audience.</p></div><div><Label>06</Label><h3>Studio Production</h3><p>On-location and studio production managed end-to-end, from lighting setup to final delivery.</p></div></div></div></section>

        <section id="archive" className="editorial-section editorial-wrap"><Label>04 / Project archive - Alayla Creek</Label><div className="editorial-rule" /><div className="editorial-project-heading"><h2>The Café.</h2><p>A warm, natural world built around the quiet rhythm of a slow morning.</p></div><div className="editorial-cafe-grid"><Photo src={media.cafe} alt="Coffee and croissant" className="portrait" /><div className="editorial-cafe-side"><div className="editorial-project-note"><Label>Process note</Label><h3>Atmosphere over everything.</h3><p>For the Alayla Creek café project we carried the full kit across the plaza to capture the space in its natural daylight. The goal was warmth: golden lattes, buttery croissants, and the quiet rhythm of a slow morning by the waterfront.</p><div className="editorial-note-meta"><span>Client - Alayla Creek</span><span>Format - Editorial</span><span>Light - Natural</span><span>Deliverables - 40+</span></div></div><div className="editorial-mini-pair"><Photo src={media.cafeDetail} alt="Woman carrying Alayla Creek coffee" /><Photo src={media.extra5} alt="Woman reading a fashion magazine" /></div></div></div></section>

        <section id="scent" className="editorial-section editorial-wrap"><Label>05 / Project archive - Moudon</Label><div className="editorial-project-heading"><h2>Scent in frame.</h2><p>Texture, light, and liquid gold.</p></div><div className="editorial-scent-grid"><div className="editorial-scent-side"><div className="editorial-project-note"><Label>Process note</Label><h3>Texture, light, and liquid gold.</h3><p>The Moudon fragrance campaign required a different pace - slow, deliberate, intimate. Each bottle was styled against skin, silk, and steel to draw out the sensory language of the scent itself.</p><div className="editorial-note-meta"><span>Client - Moudon</span><span>Format - Campaign</span><span>Light - Studio</span><span>Deliverables - 50+</span></div></div><VideoPreview video={videos[4]} tag="Moudon - Reel" onOpen={() => setActiveVideo(videos[4])} /></div><div className="editorial-photo-grid">{[media.perfume1, media.perfume2, media.perfume3, media.perfume4, media.perfume5, media.perfume6, media.perfume7, media.perfume8].map((src, index) => <Photo key={src} src={src} alt={`Moudon fragrance frame ${index + 1}`} tag={`05.${String.fromCharCode(65 + index)}`} />)}</div></div></section>

        <section id="padel" className="editorial-section editorial-wrap"><div className="editorial-section-heading editorial-project-header"><Label>06 / Project archive - Sports</Label><h2>Padel Court.</h2></div><div className="editorial-padel-layout"><VideoPreview video={videos[1]} onOpen={() => setActiveVideo(videos[1])} /><div className="editorial-padel-side"><div className="editorial-padel-note"><Label>Padel court tournament</Label><h2>Court-side energy, captured.</h2><p>A full day on-court - covering the tournament from warm-up to final point. The brief was energy: fast, competitive, alive. We shot between the glass panels and close to the action to keep every frame honest.</p><div className="editorial-note-meta"><span>Format - Sports / Event</span><span>Light - Indoor</span><span>Deliverables - Photo + Film</span><span>Mood - Energy</span></div></div><div className="editorial-padel-images"><Photo src={media.padelCourt} alt="Padel court tournament" /><Photo src={media.extra7} alt="Padel campaign art frame" /></div></div></div></section>

        <section id="mobile" className="editorial-section editorial-wrap"><Label>05 / The media lab</Label><div className="editorial-project-heading"><h2>Mobile, stabilised.</h2><p>Vertical-first content shot on a gimbal-stabilised mobile rig. Built for the feed - fast, warm, and intentional.</p></div><div className="editorial-mobile-grid"><Photo src={media.mobileGimbal} alt="Phone on a gimbal stabiliser" tag="Rig - DJI Osmo" detail="Mobile" /><Photo src={media.mobileFront} alt="Mobile production shoot with reflector" tag="On the move" detail="Field" /></div></section>

        <section id="flower" className="editorial-section editorial-wrap"><Label>08 / Project archive - Cute Flowers</Label><div className="editorial-project-heading"><h2>The Flower Shop.</h2><p>Petals, paper bags, and a Defender.</p></div><div className="editorial-flower-grid"><div className="editorial-project-note"><Label>Cute Flowers</Label><h3>Petals, paper bags, and a Defender.</h3><p>A lifestyle shoot for a local florist - we followed the bouquet from shop to street, pairing soft blooms against the hard lines of a black Land Rover and a pale city sky. The contrast did the storytelling: delicate against industrial, warm against overcast.</p><div className="editorial-note-meta"><span>Client - Cute Flowers</span><span>Format - Lifestyle</span><span>Light - Overcast</span><span>Deliverables - 30+</span></div></div><VideoPreview video={videos[0]} onOpen={() => setActiveVideo(videos[0])} /></div></section>

        <section id="film" className="editorial-section editorial-wrap editorial-video-section"><Label>09 / Film</Label><div className="editorial-project-heading"><h2>Cinema frames.</h2><p>Stories that need to move.</p></div><div className="editorial-video-grid"><CinemaPoster src={media.cinemaFlower} alt="Flower Shop poster" title="Flower Shop" tag="Reel" /><CinemaPoster src={media.cinemaPadel} alt="Padel Friends poster" title="Padel Friends" tag="Reel" /></div></section>
      </main>

      <footer id="contact" className="editorial-footer"><div className="editorial-wrap"><Label>08 / Thank you</Label><h2>Let&apos;s make something<br /><em>worth keeping.</em></h2><div className="editorial-contact-info"><div><span>Manager</span><strong>Khatira</strong></div><div><span>Studio</span><strong>SIAH Creative Club</strong></div><div><span>Practice</span><strong>Photography · Film</strong></div></div><div className="editorial-contact-links"><a href="https://www.instagram.com/siahcreativeclub" target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={14} /></a><a href="https://siahcreativeclub.com/" target="_blank" rel="noreferrer">Website <ArrowUpRight size={14} /></a><a href="mailto:hello@siahcreativeclub.com">Email <ArrowUpRight size={14} /></a></div></div></footer>

      {activeVideo && <div className="editorial-modal" onClick={() => setActiveVideo(null)}><div className="editorial-modal-inner" onClick={(event) => event.stopPropagation()}><button onClick={() => setActiveVideo(null)} aria-label="Close video"><X size={18} /></button><video controls autoPlay poster={activeVideo.image} src={activeVideo.src} /><strong>{activeVideo.title}</strong><span>{activeVideo.label}</span></div></div>}
    </div>
  );
}

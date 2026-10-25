import { useCallback, useEffect, useState } from "react";
import SiteNav from "./components/SiteNav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Manifesto from "./components/Manifesto";
import LookInside from "./components/LookInside";
import PartsAccordion from "./components/PartsAccordion";
import FounderLetter from "./components/FounderLetter";
import StartCards from "./components/StartCards";
import AppWaitlist from "./components/AppWaitlist";
import Faq from "./components/Faq";
import Closing from "./components/Closing";
import { BookDock, FlyingBook } from "./components/BookChrome";
import KitModal from "./components/KitModal";
import { useLandingAnalytics } from "./hooks/useLandingAnalytics";
import { useBookJourney } from "./hooks/useBookJourney";
import { useKitModalTimer } from "./hooks/useKitModalTimer";

export default function App() {
  useLandingAnalytics();
  const book = useBookJourney();

  const [modalOpen, setModalOpen] = useState(false);
  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);
  const { start } = useKitModalTimer();

  useEffect(() => {
    return start(openModal);
  }, [start, openModal]);

  return (
    <div className="page">
      <SiteNav />
      <FlyingBook flyRef={book.flyRef} />
      <BookDock
        dockRef={book.dockRef}
        slotRef={book.dockSlotRef}
        imgRef={book.dockImgRef}
      />
      <Hero slotRef={book.heroSlotRef} imgRef={book.heroImgRef} />
      <Marquee />
      <Manifesto />
      <LookInside />
      <PartsAccordion />
      <FounderLetter />
      <StartCards cardRef={book.cardImgRef} />
      <AppWaitlist />
      <Faq />
      <Closing />
      <KitModal open={modalOpen} onClose={closeModal} />
    </div>
  );
}

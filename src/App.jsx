import useReveal from './hooks/useReveal.js';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import StatsBar from './components/StatsBar.jsx';
import Founder from './components/Founder.jsx';
import About from './components/About.jsx';
import Squad from './components/Squad.jsx';
import BestPlayers from './components/BestPlayers.jsx';
import Fixtures from './components/Fixtures.jsx';
import Gallery from './components/Gallery.jsx';
import Sponsor from './components/Sponsor.jsx';
import OurSponsors from './components/OurSponsors.jsx';
import Join from './components/Join.jsx';
import FAQ from './components/FAQ.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  useReveal();
  return (
    <>
      <Nav />
      <Hero />
      <StatsBar />
      <Founder />
      <About />
      <Squad />
      <BestPlayers />
      <Fixtures />
      <Gallery />
      <Sponsor />
      <OurSponsors />
      <Join />
      <FAQ />
      <Footer />
    </>
  );
}

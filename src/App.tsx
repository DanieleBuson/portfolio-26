import { Suspense } from 'react';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Services from './components/Services/Services';
import Projects from './components/Projects/Projects';
import Contacts from './components/Contacts/Contacts';
import Footer from './components/Footer/Footer';
import PageTitle from './components/PageTitle/PageTitle';

function App() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div
        data-bs-spy="scroll"
        data-bs-target=".navbar-custom"
        data-bs-offset="70"
        className="scrollspy-example"
      >
        <PageTitle title="Daniele Buson | Full‑Stack Developer (Switzerland / Italy)" />
        <Navbar onScrollTo={scrollToSection} />
        <main className="pt-5 mt-5">
          <Home />
          <Services />
          <Projects />
          <Contacts />
        </main>
        <Footer />
      </div>
    </Suspense>
  );
}

export default App;

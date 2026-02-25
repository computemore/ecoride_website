import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './sections/Hero';
import { Features } from './sections/Features';
import { Services } from './sections/Services';
import { Contact } from './sections/Contact';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;

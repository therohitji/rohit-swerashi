import Navbar from './components/Navbar'
import Hero from './components/Hero'
import DivineStory from './components/DivineStory'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'

const App = () => (
  <>
    <Navbar />
    <main>
      <Hero />
      <DivineStory />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </main>
    <Footer />
  </>
)

export default App

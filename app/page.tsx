import Hero from '@/components/home/Hero'
import ChiSiamo from '@/components/home/ChiSiamo'
import PizzeEvidenza from '@/components/home/PizzeEvidenza'
import Filosofia from '@/components/home/Filosofia'
import Recensioni from '@/components/home/Recensioni'
import Gallery from '@/components/home/Gallery'
import Contatti from '@/components/home/Contatti'
import Premi from '@/components/home/Premi'
import Partner from '@/components/home/Partner'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Premi />
      <ChiSiamo />
      <PizzeEvidenza />
      <Filosofia />
      <Recensioni />
      <Gallery />
      <Partner />
      <Contatti />
    </>
  )
}

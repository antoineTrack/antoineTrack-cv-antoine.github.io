import NoiseOverlay from './components/NoiseOverlay'
import Jeu from './Jeu'

// =====================================================================
//  App — le site est désormais UN jeu complet : deviner « Venise ».
// =====================================================================
export default function App() {
  return (
    <div className="relative min-h-[100dvh]">
      <NoiseOverlay />
      <Jeu />
    </div>
  )
}

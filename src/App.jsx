import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import { SelectionProvider } from './context/SelectionContext'
import PlaceholderPage from './pages/PlaceholderPage'
import HomePage from './pages/HomePage'
import OptionSelectPage from './pages/OptionSelectPage'
import SummaryPage from './pages/SummaryPage'
import FamilyOpinionPage from './pages/FamilyOpinionPage'
import MoveInPrepPage from './pages/MoveInPrepPage'
import FinalSubmitPage from './pages/FinalSubmitPage'
import AiConsultPage from './pages/AiConsultPage'

function App() {
  return (
    <SelectionProvider>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="ai-consult" element={<AiConsultPage />} />
          <Route path="options" element={<OptionSelectPage />} />
          <Route path="family" element={<FamilyOpinionPage />} />
          <Route path="summary" element={<SummaryPage />} />
          <Route path="move-in" element={<MoveInPrepPage />} />
          <Route path="final-submit" element={<FinalSubmitPage />} />
        </Route>
      </Routes>
    </SelectionProvider>
  )
}

export default App

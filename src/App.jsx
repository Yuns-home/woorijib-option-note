import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import { UserProvider, useUser } from './context/UserContext'
import { SelectionProvider } from './context/SelectionContext'
import { AiConsultProvider } from './context/AiConsultContext'
import NameGate from './components/NameGate'
import HomePage from './pages/HomePage'
import LandingPage from './pages/LandingPage'
import OptionSelectPage from './pages/OptionSelectPage'
import SummaryPage from './pages/SummaryPage'
import FamilyOpinionPage from './pages/FamilyOpinionPage'
import MoveInPrepPage from './pages/MoveInPrepPage'
import FinalSubmitPage from './pages/FinalSubmitPage'
import AiConsultPage from './pages/AiConsultPage'

// 앱 본체(옵션 선택 흐름). 이름이 있어야 진입 가능.
// SelectionProvider/AiConsultProvider는 userName으로 데이터를 불러오므로
// 이름이 정해진 뒤에만 마운트되도록 게이트 안쪽에 둔다.
function AppShell() {
  const { userName } = useUser()

  if (!userName) {
    return <NameGate />
  }

  return (
    <SelectionProvider>
      <AiConsultProvider>
        <MainLayout />
      </AiConsultProvider>
    </SelectionProvider>
  )
}

function App() {
  return (
    <UserProvider>
      <Routes>
        {/* 랜딩페이지는 이름 없이도 볼 수 있는 공개 소개 화면 */}
        <Route path="landing" element={<LandingPage />} />

        {/* 앱 본체는 이름 게이트 안쪽 */}
        <Route element={<AppShell />}>
          <Route index element={<HomePage />} />
          <Route path="ai-consult" element={<AiConsultPage />} />
          <Route path="options" element={<OptionSelectPage />} />
          <Route path="family" element={<FamilyOpinionPage />} />
          <Route path="summary" element={<SummaryPage />} />
          <Route path="move-in" element={<MoveInPrepPage />} />
          <Route path="final-submit" element={<FinalSubmitPage />} />
        </Route>
      </Routes>
    </UserProvider>
  )
}

export default App

import { Link } from 'react-router-dom'
import heroInterior from '../assets/landing/hero-interior.png'
import compareScreen from '../assets/landing/compare-screen.png'
import familyScreen from '../assets/landing/family-screen.png'

const CTA_BUTTON_CLASS =
  'inline-block rounded-full bg-[#0F6E56] px-[22px] py-[10px] text-[14px] font-semibold text-[#F7F6F2] transition-colors duration-200 hover:bg-[#0B5544] whitespace-nowrap'

const CTA_BUTTON_LARGE_CLASS =
  'mt-9 inline-block rounded-full bg-[#0F6E56] px-[34px] py-4 text-[16px] font-bold text-[#F7F6F2] transition-colors duration-200 hover:bg-[#0B5544] whitespace-nowrap'

function Logo({ size = 30, stroke = '#222222', accent = '#0F6E56', strokeWidth = 4 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path
        d="M16 8 H48 A10 10 0 0 1 58 18 V40 A10 10 0 0 1 48 50 H34 L22 60 V50 H16 A10 10 0 0 1 6 40 V18 A10 10 0 0 1 16 8 Z"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <path
        d="M20 30 L32 20 L44 30"
        stroke={accent}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M24 30 V39 H40 V30" stroke={accent} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function QuestionBullet({ children }) {
  return (
    <li style={{ display: 'flex', alignItems: 'flex-start', gap: 11, fontSize: 15.5, lineHeight: 1.5, color: '#6B6B62' }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flex: '0 0 auto', marginTop: 2 }}>
        <circle cx="12" cy="12" r="10" fill="#EFEDE6" />
        <path
          d="M9.6 9.8c0-1.4 1.1-2.3 2.5-2.3s2.4.9 2.4 2.3c0 1.3-1 1.7-1.8 2.2-.4.3-.6.6-.6 1.2v.4"
          stroke="#A8A59B"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path d="M12 16.6h0.01" stroke="#A8A59B" strokeWidth="2" strokeLinecap="round" />
      </svg>
      {children}
    </li>
  )
}

function CheckBullet({ children }) {
  return (
    <li style={{ display: 'flex', alignItems: 'flex-start', gap: 11, fontSize: 15.5, lineHeight: 1.5 }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flex: '0 0 auto', marginTop: 2 }}>
        <circle cx="12" cy="12" r="10" fill="#EAF1EC" />
        <path d="M7.8 12.2l2.8 2.8 5.6-5.8" stroke="#0F6E56" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {children}
    </li>
  )
}

const STEPS = [
  {
    label: 'STEP 1',
    title: '우리 가족 정보를 알려주세요',
    desc: '가족 구성, 생활방식, 자주 사용하는 공간 등을 간단히 입력합니다.',
    icon: (
      <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
        <circle cx="12.5" cy="12" r="4.2" stroke="#0F6E56" strokeWidth="2" />
        <circle cx="22" cy="13.6" r="3.2" stroke="#0F6E56" strokeWidth="2" />
        <path d="M5 25c0-4 3.4-6.6 7.5-6.6S20 21 20 25" stroke="#0F6E56" strokeWidth="2" strokeLinecap="round" />
        <path d="M20.6 25c.3-3.4 2.3-5.5 5-5.5s4.4 2.2 4.4 5.5" stroke="#0F6E56" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'STEP 2',
    title: 'AI가 우리 가족 기준으로 분석해요',
    desc: '입력한 정보를 바탕으로 필요한 옵션과 고민해 볼 옵션을 구분합니다.',
    icon: (
      <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
        <path d="M16 6.5v19" stroke="#0F6E56" strokeWidth="2" strokeLinecap="round" />
        <path
          d="M16 8.6c-1.2-1.8-4-2.4-5.8-1-1.9 1.5-1.6 3.6-.7 4.6-1.8.5-2.9 2-2.6 3.8.3 1.7 1.7 2.4 2.7 2.5-.8 1.3-.7 3.2.8 4.2 1.6 1 3.9.6 5.6-1.3"
          stroke="#0F6E56"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 8.6c1.2-1.8 4-2.4 5.8-1 1.9 1.5 1.6 3.6.7 4.6 1.8.5 2.9 2 2.6 3.8-.3 1.7-1.7 2.4-2.7 2.5.8 1.3.7 3.2-.8 4.2-1.6 1-3.9.6-5.6-1.3"
          stroke="#0F6E56"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: 'STEP 3',
    title: '추천 이유까지 확인하세요',
    desc: '단순히 추천하는 것이 아니라, 우리 가족에게 왜 필요한지 확인할 수 있습니다.',
    icon: (
      <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
        <path d="M16 5.5l3.1 6.4 7 1-5 5 1.2 7-6.3-3.3-6.3 3.3 1.2-7-5-5 7-1z" stroke="#0F6E56" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
  },
]

export default function LandingPage() {
  return (
    <div style={{ background: '#F7F6F2', color: '#222222', overflowX: 'hidden', scrollBehavior: 'smooth' }}>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 30,
          background: 'rgba(247,246,242,0.92)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div
          style={{
            maxWidth: 1180,
            margin: '0 auto',
            padding: '16px 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
            <Logo />
            <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: '-0.02em' }}>우리집 옵션노트</span>
          </div>
          <a href="#start" className={CTA_BUTTON_CLASS}>
            시작하기
          </a>
        </div>
      </header>

      <section
        style={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(420px,1fr))',
          alignItems: 'center',
          minHeight: '74vh',
        }}
      >
        <div style={{ position: 'relative', zIndex: 2, padding: '88px 32px 96px', maxWidth: 620, marginLeft: 'auto', width: '100%' }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#0F6E56', letterSpacing: '-0.01em', marginBottom: 20 }}>
            옵션 비교부터 가족 합의까지
          </div>
          <h1 style={{ margin: 0, fontSize: 'clamp(32px,4.4vw,48px)', fontWeight: 800, lineHeight: 1.3, letterSpacing: '-0.04em' }}>
            우리 가족에게 맞는 옵션,
            <br />
            <span style={{ color: '#0F6E56' }}>AI와 함께</span> 선택하세요
          </h1>
          <p style={{ margin: '24px 0 0', fontSize: 17, lineHeight: 1.75, color: '#6B6B62', maxWidth: '24em' }}>
            가족의 생활방식과 취향을 바탕으로 필요한 옵션을 살펴보고, 선택 전후의 공간을 비교하며 가족의 의견까지 한곳에
            모아보세요.
          </p>
          <a href="#start" className={CTA_BUTTON_LARGE_CLASS}>
            옵션 선택 시작하기 →
          </a>
        </div>
        <div style={{ position: 'relative', minHeight: '52vh', height: '100%' }}>
          <img
            src={heroInterior}
            alt="래미안 엘라빈 거실·주방 인테리어"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '60% center' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right,#F7F6F2 0%,rgba(247,246,242,0.72) 14%,rgba(247,246,242,0) 42%)',
            }}
          />
        </div>
      </section>

      <section style={{ maxWidth: 1180, margin: '0 auto', padding: '96px 32px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#0F6E56', letterSpacing: '0.04em', marginBottom: 16 }}>
          왜 필요할까요
        </div>
        <h2 style={{ margin: '0 0 48px', fontSize: 'clamp(24px,3.2vw,33px)', fontWeight: 800, lineHeight: 1.4, letterSpacing: '-0.035em' }}>
          <span style={{ display: 'block', fontSize: '0.66em', fontWeight: 600, color: '#4A4A42', letterSpacing: '-0.02em', marginBottom: '0.32em' }}>
            옵션 정보는 많은데,
          </span>
          왜 결정은 여전히 어려울까요?
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'stretch' }}>
          <div
            style={{
              flex: '1 1 340px',
              background: '#FFFFFF',
              border: '1px solid #E4E1D6',
              borderRadius: 20,
              padding: '34px 32px',
              display: 'flex',
              flexDirection: 'column',
              gap: 22,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#8A8A80', letterSpacing: '-0.02em' }}>기존 옵션 선택</h3>
              <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="12" stroke="#C9C6BC" strokeWidth="2" />
                <path
                  d="M12.6 12.4c0-1.9 1.5-3.2 3.4-3.2s3.4 1.3 3.4 3.2c0 1.8-1.4 2.3-2.5 3-.6.4-.9.9-.9 1.7v.6"
                  stroke="#8A8A80"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path d="M16 22.2h0.01" stroke="#8A8A80" strokeWidth="2.6" strokeLinecap="round" />
              </svg>
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <QuestionBullet>이 옵션이 우리 가족에게 맞을까?</QuestionBullet>
              <QuestionBullet>다른 사람들은 어떻게 선택했을까?</QuestionBullet>
              <QuestionBullet>우리 가족은 무엇을 중요하게 생각할까?</QuestionBullet>
            </ul>
            <p style={{ margin: 'auto 0 0', paddingTop: 20, borderTop: '1px solid #EDEBE3', fontSize: 14.5, fontWeight: 600, color: '#8A8A80', textAlign: 'center' }}>
              물음표만 가득해요.
            </p>
          </div>
          <div
            style={{
              flex: '1 1 340px',
              background: '#FFFFFF',
              border: '1.5px solid #0F6E56',
              borderRadius: 20,
              padding: '34px 32px',
              display: 'flex',
              flexDirection: 'column',
              gap: 22,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#0F6E56', letterSpacing: '-0.02em' }}>우리집 옵션노트</h3>
              <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="12" stroke="#0F6E56" strokeWidth="2" />
                <path d="M11 13.4h0.01" stroke="#0F6E56" strokeWidth="2.8" strokeLinecap="round" />
                <path d="M19.2 13.5c.8-1 2.1-1 2.9 0" stroke="#0F6E56" strokeWidth="2" strokeLinecap="round" />
                <path d="M11.4 19.8c2.3 2.3 6.9 2.3 9.2 0" stroke="#0F6E56" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <CheckBullet>우리 가족에게 필요한 옵션은?</CheckBullet>
              <CheckBullet>AI는 왜 이 옵션을 추천할까?</CheckBullet>
              <CheckBullet>가족들은 각각 어떤 선택을 했을까?</CheckBullet>
            </ul>
            <p style={{ margin: 'auto 0 0', paddingTop: 20, borderTop: '1px solid #EDEBE3', fontSize: 14.5, fontWeight: 600, color: '#0B5544', textAlign: 'center' }}>
              기준이 선명해지면, 선택은 어렵지 않아요.
            </p>
          </div>
        </div>
      </section>

      <section style={{ background: '#EAF1EC' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '96px 32px', display: 'flex', flexDirection: 'column', gap: 44 }}>
          <div style={{ maxWidth: '32em' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#0F6E56', letterSpacing: '0.04em', marginBottom: 16 }}>
              우리집 옵션노트는 이렇게 시작해요
            </div>
            <h2 style={{ margin: 0, fontSize: 'clamp(24px,3.2vw,32px)', fontWeight: 800, lineHeight: 1.42, letterSpacing: '-0.035em' }}>
              우리 가족의 생활을 먼저 이해하고,
              <br />
              그다음 옵션을 선택합니다
            </h2>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: 20,
              padding: '52px 44px',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 40,
              alignItems: 'flex-start',
            }}
          >
            {STEPS.map((step, i) => (
              <div key={step.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 24 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 14, width: 220 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#0F6E56', letterSpacing: '0.1em' }}>{step.label}</div>
                  <div style={{ width: 62, height: 62, borderRadius: '50%', background: '#EAF1EC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {step.icon}
                  </div>
                  <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, letterSpacing: '-0.025em' }}>{step.title}</h3>
                  <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.65, color: '#6B6B62' }}>{step.desc}</p>
                </div>
                {i < STEPS.length - 1 && (
                  <span
                    className="hidden md:inline-block"
                    style={{ color: '#0F6E56', fontSize: 20, lineHeight: 1, marginTop: 96 }}
                  >
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1180, margin: '0 auto', padding: '104px 32px 96px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#0F6E56', letterSpacing: '0.04em', marginBottom: 16 }}>
          실제 공간으로 확인하세요
        </div>
        <h2 style={{ margin: 0, fontSize: 'clamp(24px,3.2vw,33px)', fontWeight: 800, lineHeight: 1.42, letterSpacing: '-0.035em' }}>
          선택 전과 후,
          <br />
          우리집이 어떻게 달라지는지 한눈에 비교해 보세요
        </h2>
        <p style={{ margin: '20px 0 0', fontSize: 16.5, lineHeight: 1.75, color: '#6B6B62', maxWidth: '34em' }}>
          옵션 설명만 보는 것이 아니라 실제 공간 이미지를 통해 선택에 따라 우리집이 어떻게 달라지는지 직접 비교할 수 있어요.
        </p>
        <figure style={{ margin: '44px 0 0' }}>
          <img
            src={compareScreen}
            alt="변경 전과 변경 후 공간을 나란히 비교하는 실제 서비스 화면"
            style={{ width: '100%', display: 'block', border: '1px solid #E4E1D6', borderRadius: 20, background: '#FFFFFF' }}
          />
          <figcaption style={{ marginTop: 14, fontSize: 13.5, color: '#8A8A80' }}>실제 서비스 화면 · 침실 붙박이장 옵션 비교</figcaption>
        </figure>
      </section>

      <section style={{ borderTop: '1px solid #E4E1D6', background: '#F1EFE8' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '96px 32px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#0F6E56', letterSpacing: '0.04em', marginBottom: 16 }}>
            우리 가족의 생각도 함께
          </div>
          <h2 style={{ margin: 0, fontSize: 'clamp(24px,3.2vw,33px)', fontWeight: 800, lineHeight: 1.42, letterSpacing: '-0.035em' }}>
            혼자 고민하지 말고,
            <br />
            가족의 선택과 이유를 한곳에서 확인하세요
          </h2>
          <p style={{ margin: '20px 0 0', fontSize: 16.5, lineHeight: 1.75, color: '#6B6B62', maxWidth: '32em' }}>
            가족 구성원마다 어떤 옵션을 선택했는지, 그리고 왜 그렇게 생각했는지 한눈에 확인할 수 있어요.
          </p>
          <figure style={{ margin: '44px 0 0' }}>
            <img
              src={familyScreen}
              alt="가족 구성원별 선택과 선택 이유를 모아 보여주는 실제 서비스 화면"
              style={{ width: '100%', display: 'block', border: '1px solid #E4E1D6', borderRadius: 20, background: '#FFFFFF' }}
            />
            <figcaption style={{ marginTop: 14, fontSize: 13.5, color: '#8A8A80' }}>실제 서비스 화면 · 현관 자동중문 옵션에 대한 가족 의견</figcaption>
          </figure>
        </div>
      </section>

      <section id="start" style={{ borderTop: '1px solid #E4E1D6' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '112px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ marginBottom: 28 }}>
            <Logo size={44} strokeWidth={3.6} />
          </div>
          <h2 style={{ margin: 0, fontSize: 'clamp(26px,3.6vw,36px)', fontWeight: 800, lineHeight: 1.38, letterSpacing: '-0.038em' }}>
            우리집 옵션 선택,
            <br />
            이제 <span style={{ color: '#0F6E56' }}>우리 가족의 기준</span>으로 시작해 볼까요?
          </h2>
          <Link to="/options" className={CTA_BUTTON_LARGE_CLASS}>
            옵션 선택 시작하기 →
          </Link>
        </div>
      </section>

      <footer style={{ background: '#0F6E56', color: '#F7F6F2' }}>
        <div
          style={{
            maxWidth: 1180,
            margin: '0 auto',
            padding: '44px 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 20,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
            <Logo size={28} stroke="#F7F6F2" accent="#F7F6F2" />
            <span style={{ fontWeight: 700, fontSize: 15, letterSpacing: '-0.02em' }}>우리집 옵션노트</span>
          </div>
          <span style={{ fontSize: 13, color: 'rgba(247,246,242,0.72)' }}>사용성 평가용 데모 · 실제 서비스와 다를 수 있어요</span>
        </div>
      </footer>
    </div>
  )
}

-- 3단계: AI 옵션 상담용 테이블
-- 기존 selections 테이블과 동일한 패턴(user_name 고정값 'guest', RLS 전체 허용)을 따릅니다.

-- 가족 프로필 응답 저장 (질문 10개 응답)
create table if not exists user_profiles (
  user_name text primary key,
  answers jsonb not null,
  updated_at timestamptz not null default now()
);

-- 옵션별 AI 상담 판단 결과 (규칙 매칭 또는 Claude API 실시간 생성)
create table if not exists ai_judgments (
  id bigserial primary key,
  user_name text not null,
  option_id text not null references options(id),
  judgment text not null check (judgment in ('추천', '불필요', '선택사항')),
  reason text not null,
  source text not null check (source in ('rule', 'ai', 'fallback')),
  created_at timestamptz not null default now(),
  unique (user_name, option_id)
);

alter table user_profiles enable row level security;
alter table ai_judgments enable row level security;

-- 데모 단계: 로그인 없이 전체 허용 (selections 테이블과 동일한 임시 정책)
create policy "allow all - user_profiles" on user_profiles
  for all using (true) with check (true);

create policy "allow all - ai_judgments" on ai_judgments
  for all using (true) with check (true);

export default function PlaceholderPage({ title, note }) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="mt-3 text-charcoal-soft">
        {note ?? '다음 단계에서 화면을 채울 예정입니다.'}
      </p>
    </div>
  )
}

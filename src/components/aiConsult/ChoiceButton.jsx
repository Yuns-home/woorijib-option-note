export default function ChoiceButton({ label, isActive, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-14 w-full items-center justify-center rounded-xl border text-[17px] font-medium transition-colors ${
        isActive
          ? 'border-point bg-point text-white'
          : 'border-warmgray-200 bg-white text-charcoal hover:border-warmgray-300'
      }`}
    >
      {label}
    </button>
  )
}

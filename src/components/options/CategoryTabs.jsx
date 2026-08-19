export default function CategoryTabs({ categories, activeId, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto border-b border-warmgray-200 px-4 py-3 lg:px-6">
      {categories.map((cat) => {
        const isActive = cat.id === activeId
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onChange(cat.id)}
            className={`shrink-0 rounded-lg px-4 py-2 text-[15px] font-medium transition-colors ${
              isActive
                ? 'bg-point text-white'
                : 'bg-warmgray-100 text-charcoal-soft hover:bg-warmgray-200'
            }`}
          >
            {cat.name}
          </button>
        )
      })}
    </div>
  )
}

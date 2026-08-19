export default function MemberTabs({ members, activeMember, onChange }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {members.map((member) => {
        const isActive = member === activeMember
        return (
          <button
            key={member}
            type="button"
            onClick={() => onChange(member)}
            className={`flex h-14 items-center justify-center gap-2 rounded-xl border text-[15px] font-medium transition-colors ${
              isActive
                ? 'border-charcoal bg-warmgray-100 text-charcoal'
                : 'border-warmgray-200 bg-white text-charcoal-soft hover:bg-warmgray-100'
            }`}
          >
            {member}
          </button>
        )
      })}
    </div>
  )
}

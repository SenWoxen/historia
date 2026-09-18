export default function Choices({ options, onPick }) {
  return (
    <div className="choices" role="group" aria-label="What do you do?">
      {options.map((opt, i) => (
        <button
          key={opt.label}
          className="choice"
          style={{ '--i': i }}
          onClick={(e) => {
            e.stopPropagation()
            onPick(opt.goto)
          }}
        >
          <span className="choice-mark" aria-hidden="true" />
          {opt.label}
        </button>
      ))}
    </div>
  )
}

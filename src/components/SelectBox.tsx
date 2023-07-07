type PropsType = {
  label: string
  name: string
  items: {
    value: string
    text: string
  }[]
  onChange?: React.ChangeEventHandler<HTMLSelectElement>
}

export const SelectBox: React.FC<PropsType> = ({ label, items, name, onChange }) => (
  <>
    <label htmlFor={name} className="mr-1 text-right">{label}</label>
    <select id={name} name={name} onChange={onChange}
      className="w-24 px-1 py-2 rounded bg-neutral-100 hover:bg-neutral-200 focus:bg-neutral-200 transition-colors border border-neutral-400">
      {items.map(({ value, text }) =>
        <option key={value} value={value}>{text}</option>
      )}
    </select>
  </>
)
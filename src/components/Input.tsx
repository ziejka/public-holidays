type PropsType = {
  name: string
  label: string
  placeholder?: string
  defaultValue?: string
  type: React.InputHTMLAttributes<HTMLInputElement>["type"]
}

export const Input: React.FC<PropsType> = ({ label, name, placeholder, defaultValue, type }) => (
  <>
    <label htmlFor={name} className="text-right">{label}</label>
    <input id={name} name={name} type={type} placeholder={placeholder} defaultValue={defaultValue}
      className="px-2 py-1 w-24 rounded bg-neutral-100 hover:bg-neutral-200 focus:bg-neutral-200 transition-colors border border-neutral-400" />
  </>
)
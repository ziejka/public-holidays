type PropsType = {
  label: string
  type: React.ButtonHTMLAttributes<HTMLButtonElement>["type"]
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export const Button: React.FC<PropsType> = ({ type, label, onClick }) => (
  <button className="px-4 py-1 w-fit rounded bg-sky-200 hover:bg-sky-300 active:bg-sky-400 transition-colors border border-sky-400"
    onClick={onClick}
    type={type}>
    {label}
  </button>
)
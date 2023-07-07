type PropsType = {
  children?: React.ReactNode
};
export const AppLayout: React.FC<PropsType> = ({ children }) =>
  <div className="p-5 bg-neutral-100 w-screen h-screen flex flex-col gap-7">
    <h1 className="font-bold text-center text-2xl mb-2 pb-4 border-b border-neutral-200">Holiday Calendar</h1>
    {children}
  </div>
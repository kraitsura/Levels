import { ComponentProps, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

export const RootLayout = ({ children, className, ...props }: ComponentProps<'main'>) => {
  return (
    <main className={twMerge('flex flex-row px-2 py-2 bg-gradient-to-t  from-red-700 h-screen', className)} {...props}>
      {children}
    </main>
  )
}

export const ImageArea = ({ className, children, ...props }: ComponentProps<'aside'>) => {
  return (
    <aside
      className={twMerge(
        'w-[250px] mt-7 h-[100vh + 10px] flex-none px-3 py-3 overflow-auto',
        className
      )}
      {...props}
    >
      {children}
    </aside>
  )
}

export const StatArea = ({ className, children, ...props }: ComponentProps<'aside'>) => {
  return (
    <aside
      className={twMerge('w-[250px] mt-7 h-[100vh + 10px] flex-auto overflow-auto', className)}
      {...props}
    >
      {children}
    </aside>
  )
}

export const QuestSidebar = ({ className, children, ...props }: ComponentProps<'aside'>) => {
  return (
    <aside
      className={twMerge('flex-auto w-[300px] mt-7 h-[100vh + 10px] overflow-scroll', className)}
      {...props}
    >
      {children}
    </aside>
  )
}

export const Editor = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={twMerge('flex-1 overflow-auto', className)} {...props}>
      {children}
    </div>
  )
)

Editor.displayName = 'Content'

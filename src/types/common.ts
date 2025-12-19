export interface BaseComponent {
  className?: string
  children?: React.ReactNode
}

export interface SectionProps extends BaseComponent {
  id?: string
}
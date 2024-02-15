

export default function SidebarMenuItem({text, Icon}) {
  return (
    <div>
      <Icon className="w-6 h-6" />
      <span>{text}</span>
    </div>
  )
}

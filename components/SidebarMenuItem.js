

export default function SidebarMenuItem({text, Icon}) {
  return (
    <div>
      <Icon style={{ height: "2.5rem", width: "2.5rem" }}/>
      <span>{text}</span>
    </div>
  )
}

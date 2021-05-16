import { SidebarItem, ClosedSidebarWrapper } from './styles'

const ClosedSidebar = ({ onOpenToggle }) => {

  return (
    <ClosedSidebarWrapper>
      <SidebarItem onClick={onOpenToggle}>&lt;--</SidebarItem>
      <SidebarItem>A</SidebarItem>
      <SidebarItem>B</SidebarItem>
      <SidebarItem>C</SidebarItem>
    </ClosedSidebarWrapper>
  )
}

export default ClosedSidebar

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { SidebarItem, ClosedSidebarWrapper } from './styles'

interface IClosedSidebarProps {
  onOpenToggle: () => void
}

const ClosedSidebar = ({ onOpenToggle }: IClosedSidebarProps) => {
  return (
    <ClosedSidebarWrapper>
      <SidebarItem onClick={onOpenToggle}>
        <FontAwesomeIcon icon={faComment} />
      </SidebarItem>
    </ClosedSidebarWrapper>
  )
}

export default ClosedSidebar

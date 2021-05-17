import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { SidebarItem, ClosedSidebarWrapper } from './styles'

const ClosedSidebar = ({ onOpenToggle }) => {

  return (
    <ClosedSidebarWrapper>
      <SidebarItem onClick={onOpenToggle}>
        <FontAwesomeIcon icon={faComment} />
      </SidebarItem>
    </ClosedSidebarWrapper>
  )
}

export default ClosedSidebar

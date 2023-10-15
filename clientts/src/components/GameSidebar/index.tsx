import { useState, useEffect, useRef, useCallback } from 'react'
import ChatSidebar from './Chat'
import ClosedSidebar from './ClosedSidebar'
import { GameSidebarWrapper } from './styles'
import { ChatProvider, useChatContext } from '@context/chat/index'
import { API } from '@api/Api'
import Logger from '@logger'

interface IGameSidebarProps {
  onToggleOpen: (open: boolean) => void
}

/*
  The Game Sidebar next to the game screen.
  Can be closed or open, and if open can contain
  one of many types of Sub/children sidebars.
  For instance, when opened, the SidebarContainer might
  wrap the ChatSidebar, which in turn might display a list
  of chat rooms, or current chat messages within a single room.
*/
const GameSidebar = ({ onToggleOpen }: IGameSidebarProps) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [, setChatContext] = useChatContext()
  const refIsFetchingChatRooms = useRef(false)

  const toggleMenuOpen = () => {
    if (typeof onToggleOpen === 'function') {
      onToggleOpen(!menuOpen)
    }
    setMenuOpen(!menuOpen)
  }

  const fetchChatRooms = useCallback(
    async function () {
      console.log('Fetching chat rooms')
      const apiResponse = await API.GetChatRooms()

      if (apiResponse.isError || !apiResponse.data) {
        Logger.error(
          "Couldn't fetch chat rooms",
          apiResponse.errorMessage,
          apiResponse.errorCode
        )
      } else {
        setChatContext({
          type: 'UPDATE_CHATROOMS_LIST',
          payload: apiResponse.data,
        })
      }
      refIsFetchingChatRooms.current = false
    },
    [setChatContext]
  )

  useEffect(() => {
    if (!refIsFetchingChatRooms.current) {
      refIsFetchingChatRooms.current = true
      // Retrieve the list of chatrooms and display them
      fetchChatRooms()
    }
  }, [fetchChatRooms, setChatContext])

  return (
    <GameSidebarWrapper $open={menuOpen}>
      {menuOpen ? (
        <ChatSidebar onOpenToggle={toggleMenuOpen} />
      ) : (
        <ClosedSidebar onOpenToggle={toggleMenuOpen} />
      )}
    </GameSidebarWrapper>
  )
}

const GameSidebarWithProvider = (props: IGameSidebarProps) => (
  <ChatProvider>
    <GameSidebar {...props} />
  </ChatProvider>
)

export default GameSidebarWithProvider

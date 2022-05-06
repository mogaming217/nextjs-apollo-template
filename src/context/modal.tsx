import { useDisclosure } from '@chakra-ui/hooks'
import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/modal'
import { createContext, FC, ReactNode, useCallback, useContext, useState } from 'react'

const stub = (): never => {
  throw new Error()
}

const initialState: State & Dispatch = {
  isOpen: false,
  showModal: stub,
  hideModal: stub,
}

type State = {
  isOpen: boolean
  body?: ReactNode
}

type Dispatch = {
  showModal: (body?: State['body']) => void
  hideModal: () => void
}

const StateContext = createContext<State>({ ...initialState })
const DispatchContext = createContext<Dispatch>({ ...initialState })

export const ModalProviderContainer: FC<{ children: ReactNode }> = ({ children }) => {
  const state = useCore()
  return (
    <StateContext.Provider value={state.state}>
      <DispatchContext.Provider value={{ ...state.dispatcher }}>
        {children}
        <Modal size="3xl" isOpen={state.state.isOpen} onClose={state.dispatcher.hideModal} isCentered={true} autoFocus={false}>
          <ModalOverlay />
          <ModalContent>{state.state.body && <ModalBody>{state.state.body}</ModalBody>}</ModalContent>
        </Modal>
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

const useCore = (): { state: State; dispatcher: Dispatch } => {
  const [state, setState] = useState<State>({ ...initialState })
  const { isOpen, onOpen, onClose } = useDisclosure()

  const showModal: Dispatch['showModal'] = useCallback(body => {
    setState({ ...state, body })
    onOpen()
  }, [])

  const hideModal: Dispatch['hideModal'] = useCallback(() => {
    onClose()
  }, [])

  return {
    state: { ...state, isOpen },
    dispatcher: { showModal, hideModal },
  }
}

export const useModalState = () => useContext(StateContext)
export const useModalDispatcher = () => useContext(DispatchContext)

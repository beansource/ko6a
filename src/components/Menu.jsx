import { Menu as ChakraMenu, MenuButton, MenuList, MenuItem, IconButton } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'
import { useDisclosure } from '@chakra-ui/hooks'
import NewProject from './projects/new-project'
import NewRepo from './projects/new-repo'

export default function Menu() {
  const router = useRouter()
  const { project } = router?.query

  const { isOpen: newProjectModalIsOpen, onOpen: onNewProjectModalOpen, onClose: onNewProjectModalClose } = useDisclosure()
  const { isOpen: newRepoModalIsOpen, onOpen: onNewRepoModalOpen, onClose: onNewRepoModalClose } = useDisclosure()

  return (
    <ChakraMenu>
      <MenuButton as={IconButton} icon={<ChevronDownIcon />} size="sm" />
      <MenuList>
        {!project &&
          <MenuItem onClick={onNewProjectModalOpen}>New Project</MenuItem>
        }
        {project &&
          <MenuItem onClick={onNewRepoModalOpen}>Add Repo</MenuItem>
        }
      </MenuList>
      <NewProject isOpen={newProjectModalIsOpen} onOpen={onNewProjectModalOpen} onClose={onNewProjectModalClose} />
      <NewRepo isOpen={newRepoModalIsOpen} onClose={onNewRepoModalClose} />
    </ChakraMenu>
  )
}

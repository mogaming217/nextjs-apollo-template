import { useToast, UseToastOptions } from '@chakra-ui/toast'

export const useCustomToast = () => {
  const toast = useToast()

  return (status: UseToastOptions['status'], title: string, options?: UseToastOptions) => {
    toast({
      position: 'top',
      duration: status === 'error' ? 5000 : 3000,
      status,
      title,
      isClosable: true,
      ...options,
    })
  }
}

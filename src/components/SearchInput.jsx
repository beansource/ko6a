import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import * as React from 'react'
import { BsSearch } from 'react-icons/bs'

/**
 * todo: implement search
 */
export const SearchInput = (props) => {
  const { rootProps, ...rest } = props
  return (
    <InputGroup
      maxW="2xs"
      size="sm"
      variant="filled"
      display={{
        base: 'none',
        lg: 'block',
      }}
      {...rootProps}
    >
      <InputLeftElement color="gray.400" pointerEvents="none">
        <BsSearch />
      </InputLeftElement>
      <Input
        {...rest}
        disabled
        placeholder="Search"
        rounded="md"
        _placeholder={{
          color: 'gray.400',
        }}
      />
    </InputGroup>
  )
}
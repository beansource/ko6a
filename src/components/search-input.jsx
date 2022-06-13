import { Input, InputGroup, InputLeftElement, useColorModeValue } from '@chakra-ui/react'
import * as React from 'react'
import { BsSearch } from 'react-icons/bs'

/**
 * todo: implement search
 */
export const SearchInput = (props) => {
  const { rootProps, ...rest } = props
  const textColor = useColorModeValue('gray.700', 'white')

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
      <InputLeftElement color={textColor} pointerEvents="none">
        <BsSearch />
      </InputLeftElement>
      <Input
        {...rest}
        disabled
        placeholder="Search"
        rounded="md"
        _placeholder={{
          color: textColor,
        }}
      />
    </InputGroup>
  )
}
import { Field } from 'formik'
import { Input, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react'

export default function FormikField({ name, label, placeholder, validation, focus }) {
  return (
    <Field name={name} validate={validation}>
      {({ field, form }) => (
        <FormControl isInvalid={form.errors[field.name] && form.touched[field.name]}>
          <FormLabel htmlFor={field.name}>{label}</FormLabel>
          <Input {...field} id={field.name} placeholder={placeholder} ref={focus} />
          <FormErrorMessage>{form.errors[field.name]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  )
}

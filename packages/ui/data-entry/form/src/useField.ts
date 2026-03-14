import { useForm } from './useFormContext'

export function useField(name: string) {
  const { values, errors, touched, setValue, markTouched } = useForm()

  return {
    value: values[name] ?? '',
    error: touched[name] ? errors[name] : undefined,
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | unknown
    ) => {
      if (typeof e === 'object' && e !== null && 'target' in e) {
        const target = (e as { target: HTMLInputElement }).target
        setValue(name, target.type === 'checkbox' ? target.checked : target.value)
      } else {
        setValue(name, e)
      }
      markTouched(name)
    },
    onBlur: () => markTouched(name)
  }
}

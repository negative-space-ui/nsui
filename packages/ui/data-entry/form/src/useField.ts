import { useForm } from './useFormContext'

export function useField(name: string) {
  const { values, errors, touched, setValue, markTouched } = useForm()
  return {
    value: values[name] ?? '',
    error: touched[name] ? errors[name] : undefined,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setValue(name, e.target.value),
    onBlur: () => markTouched(name)
  }
}

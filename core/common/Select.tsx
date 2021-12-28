import { FC } from "react"
import { Select as NativeBaseSelect } from "native-base"

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps {
  options?: SelectOption[]
  value?: string
  onValueChange?: (e?: any) => void
}

export const Select: FC<SelectProps> = ({
  options = [],
  value,
  onValueChange,
  ...props
}) => {
  return (
    <NativeBaseSelect
      {...props}
      minWidth="50"
      selectedValue={value}
      _selectedItem={{
        bg: "teal.600",
      }}
      onValueChange={onValueChange}
    >
      {options.map((option) => (
        <NativeBaseSelect.Item label={option.label} value={option.value} />
      ))}
    </NativeBaseSelect>
  )
}

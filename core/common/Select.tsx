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
  isDisabled?: boolean
}

export const Select: FC<SelectProps> = ({
  options = [],
  isDisabled,
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
      isDisabled={isDisabled}
    >
      {options.map((option) => (
        <NativeBaseSelect.Item label={option.label} value={option.value} />
      ))}
    </NativeBaseSelect>
  )
}

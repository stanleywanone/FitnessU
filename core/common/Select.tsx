import { FC } from "react"
import { Select as NativeBaseSelect, Icon } from "native-base"
import { FontAwesome } from "@expo/vector-icons"

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
      dropdownIcon={
        <Icon
          as={FontAwesome}
          name="angle-down"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
          size="5"
        />
      }
    >
      {options.map((option) => (
        <NativeBaseSelect.Item
          label={option.label}
          value={option.value}
          key={option.value}
        />
      ))}
    </NativeBaseSelect>
  )
}

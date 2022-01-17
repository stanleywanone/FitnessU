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
  w?: string
  fontSize?
  placeholder?: string
  backgroundColor?: string
}

export const Select: FC<SelectProps> = ({
  options = [],
  isDisabled,
  value,
  w = "100%",
  fontSize,
  placeholder = "0",
  onValueChange,
  backgroundColor,
  ...props
}) => {
  return (
    <NativeBaseSelect
      {...props}
      fontSize={fontSize}
      w={w}
      backgroundColor={backgroundColor}
      selectedValue={value}
      _selectedItem={{
        bg: "teal.600",
      }}
      onValueChange={onValueChange}
      isDisabled={isDisabled}
      placeholder={placeholder}
      dropdownIcon={
        <Icon
          as={FontAwesome}
          name="angle-down"
          color="coolGray.800"
          marginLeft={"2"}
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

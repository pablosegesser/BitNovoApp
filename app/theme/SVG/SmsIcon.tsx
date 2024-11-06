import Svg, { SvgProps, Path } from "react-native-svg"
const SmsIcon = (props: SvgProps) => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
    <Path
      opacity={0.4}
      d="M14.1667 17.0833H5.83342C3.33341 17.0833 1.66675 15.8333 1.66675 12.9166V7.08329C1.66675 4.16663 3.33341 2.91663 5.83342 2.91663H14.1667C16.6667 2.91663 18.3334 4.16663 18.3334 7.08329V12.9166C18.3334 15.8333 16.6667 17.0833 14.1667 17.0833Z"
      fill="#035AC5"
    />
    <Path
      d="M9.99998 10.725C9.29998 10.725 8.59165 10.5083 8.04998 10.0666L5.44164 7.98331C5.17498 7.76664 5.12498 7.37497 5.34165 7.10831C5.55831 6.84164 5.94998 6.79164 6.21665 7.00831L8.82497 9.09165C9.45831 9.59998 10.5333 9.59998 11.1666 9.09165L13.775 7.00831C14.0416 6.79164 14.4416 6.83331 14.65 7.10831C14.8666 7.37497 14.825 7.77498 14.55 7.98331L11.9416 10.0666C11.4083 10.5083 10.7 10.725 9.99998 10.725Z"
      fill="#035AC5"
    />
  </Svg>
)
export default SmsIcon

export const formatNumber = (num: number, fixed: number) => {
  let decimalPart

  const array = Math.floor(num).toString().split("")
  let index = -3
  while (array.length + index > 0) {
    array.splice(index, 0, ".")
    index -= 4
  }

  if (fixed > 0) {
    decimalPart = num.toFixed(fixed).split(".")[1]
    return array.join("") + "," + decimalPart
  }
  return array.join("")
}

export function prettify(num: number, count: number, reverse?: boolean) {
  if (count === 3)
    return num.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, "$1 ");
  else if (count === 4 && reverse)
    return num
      .toString()
      .split("")
      .reverse()
      .join("")
      .replace(/(\d)(?=(\d{3})+(\D|$))/g, " $1")
      .split("")
      .reverse()
      .join("");
  else if (count === 4)
    return num.toString().replace(/(\d)(?=(\d{4})+(\D|$))/g, "$1 ");
}

export function prettifyPhone(phone: string) {
  if (phone[0] === "+") {
    return `+${phone[1]} (${phone.slice(2, 5)})-${phone.slice(
      5,
      8
    )}-${phone.slice(8, 10)}-${phone.slice(10, 12)}`;
  } else return phone;
}

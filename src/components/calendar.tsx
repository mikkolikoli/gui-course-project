interface Props {
    type: "day" | "week",
    day?: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday"
}

export default function calendar(props: Props) {
  return (
    <div>
      <h1>Calendar</h1>
    </div>
  )
}
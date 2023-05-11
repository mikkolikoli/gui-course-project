interface props {
    type: "day" | "week",
    day?: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday"
}

export default function calendar(props: props) {
  return (
    <main>
      <h1>Calendar</h1>
    </main>
  )
}
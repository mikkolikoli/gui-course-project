interface props {
    text: string
}

export default function ErrorText({ text }: props) {
    return (
        <p>{text}</p>
    )
}
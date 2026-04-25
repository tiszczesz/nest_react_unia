type FirstProps = {
    content: string;
    isUnderlied?: boolean;
    myColor?: string;
}
function First(props: FirstProps) {
    return (
        <>
            <h1 style={{
                color: props.myColor ?
                    props.myColor : "black"
            }}>First Component</h1>
            <p style={{
                textDecoration: props.isUnderlied ?
                    "underline" : "none"
            }}>{props.content}</p>
        </>
    )
}
export default First;
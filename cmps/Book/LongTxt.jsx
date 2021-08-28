export function LongTxt(props) {
    const getTextToShow = () => {
        if (!props.isLongTxtShown) {
            return props.text.substring(0, 100);
        }
        return props.text;
    }
    return (
        <section>
            <p> <span className="underline"> Description:</span> {getTextToShow()} 
                {props.text.length > 100 &&
                    <span className="bold pointer" onClick={props.toggleTxtShown}>
                        {props.isLongTxtShown ? ' Less...' : ' More...'}
                    </span>}
            </p>

        </section >
    )
}

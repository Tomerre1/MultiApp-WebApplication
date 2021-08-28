export function ReviewModal(props) {
    const { textarea, fullName, stars } = props.review
    return (
        <section className="modal-read-container">
            <div className="modal-read">
                <button className="closeModal" onClick={props.toggleModal}>&times;</button>
                <form className="review-add" onSubmit={props.onAddReview}>
                    <h2> Review</h2>
                    <label htmlFor="fullName" >Full name:</label>
                    <input type="text" name="fullName" id="fullName" placeholder='Enter Full Name' value={fullName} onChange={props.handleChange} required /><br/>
                    <label htmlFor="readDate" >Read at:</label><br/>
                    <input type="date" name="readDate" id="readDate" onChange={props.handleChange} required /><br/>
                    <label htmlFor="textarea" >Text Area:</label><br/>
                    <textarea type="text" name="textarea" id="textarea" placeholder='Enter Text' rows="7" cols="50" value={textarea} onChange={props.handleChange} required /><br/>
                    {!stars &&
                        <div className="ratings">
                            {[1, 2, 3, 4, 5].map((num) => <span key={num} onClick={() => { props.setStars(num) }} className="fa fa-star pointer"> </span>)}
                        </div>
                    }
                    {stars &&
                        <div className="ratings">
                            {[1, 2, 3, 4, 5].map((num) => <span key={num} onClick={() => { props.setStars(num) }} className={`fa fa-star pointer ${(stars >= num) ? 'checked' : ''}`}> </span>)}
                        </div>
                    }
                    <button className="book-btn">Add Review</button>
                </form>
            </div>
        </section>
    )
}



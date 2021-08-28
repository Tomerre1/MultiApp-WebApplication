export class Home extends React.Component {
    render() {
        return (
            <section>
                <div className="hero">
                    <div className="background-image" ></div>
                    <div className="hero-content-area">
                        <h1 className="app-name">MultiApp</h1>
                        <h3> Everything you need is right here.</h3>
                    </div>
                </div>
                <div className="try-it-now">
                    <h3 className="hero-title">Loved by over 10 million users around the world!!!</h3>
                    <div className="img-container">
                        <div className="tablets">
                            <img src="assets/img/book-tablet.png"/>
                            <button className="try-it-now-btns">Try Books</button>
                        </div>
                        <div className="tablets">
                            <img src="assets/img/gmail-tablet.png" />
                            <button className="try-it-now-btns">Try Mail</button>
                        </div>
                        <div className="tablets">
                            <img src="assets/img/note-tablet.png" />
                            <button className="try-it-now-btns">Try Keep</button>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

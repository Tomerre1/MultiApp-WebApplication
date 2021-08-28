
const { NavLink } = ReactRouterDOM

export class AppFooter extends React.Component {
    render() {
        return (
            <footer>
                <div className="contact-us">
                    <a target="_blank" href="https://il.linkedin.com/in/tomer-revah-software-engineering" className="fab fa-linkedin"></a>
                    <a target="_blank" href="https://il.linkedin.com/in/tomer-revah-software-engineering" className="name">Tomer</a>
                </div>
                <NavLink exact to="/" activeClassName="app-name pointer">MultiApp</NavLink>
                <div className="contact-us">
                    <a target="_blank" href="https://www.linkedin.com/in/matan-levi-561115199/" className="fab fa-linkedin"></a>
                    <a target="_blank" href="https://www.linkedin.com/in/matan-levi-561115199/" className="name">Matan</a>
                </div>
            </footer>
        )
    }
}

/*HEADER*/

const { NavLink, withRouter } = ReactRouterDOM

function _AppHeader(props) {
    return (
        <section className="app-header">
            <h1 onClick={() => props.history.push('/')}>MultiApp</h1>
            <nav>
                <NavLink exact to="/">Home</NavLink>
                <NavLink to="/book">Book</NavLink>
                <NavLink to="/email">Email</NavLink>
                <NavLink to="/note">Note</NavLink>
            </nav>
        </section>
    )
}

export const AppHeader = withRouter(_AppHeader)

/*HEADER*/

const { NavLink, withRouter } = ReactRouterDOM

function _AppHeader(props) {
    return (
        <section className="header-container">
            <div className="header-logo">
                <h1 onClick={() => props.history.push('/')}>MultiApp</h1>
            </div>
            <nav>
                <i class="fas fa-th fa-2x" aria-hidden="true"></i>

                <ul>
                    <NavLink exact to="/"><li><i class="fas fa-home"></i></li></NavLink>
                    <NavLink to="/book"><li><i class="fas fa-book"></i></li></NavLink>
                    <NavLink to="/note"> <li><i class="fas fa-sticky-note"></i></li></NavLink>
                    <NavLink to="/email"><li><i class="fas fa-paper-plane"></i></li></NavLink>
                </ul>
                {/* <NavLink exact to="/">Home</NavLink> */}
                {/* <NavLink to="/book">Book</NavLink>
                <NavLink to="/email">Email</NavLink>
                <NavLink to="/note">Note</NavLink> */}
            </nav>
        </section>
    )
}

export const AppHeader = withRouter(_AppHeader)

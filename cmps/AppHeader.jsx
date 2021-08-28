/*HEADER*/

const { NavLink, withRouter } = ReactRouterDOM

class _AppHeader extends React.Component {

    state = {
        isNavOpen: null
    }

    componentDidMount() {
        this.setState({ isNavOpen: false })
    }

    onToggleNav = () => {
        this.setState({ isNavOpen: !this.state.isNavOpen })
    }



    render() {
        const { isNavOpen } = this.state

        return (
            <section className="header-container">
                <div className="header-logo">
                    <h1 onClick={() => props.history.push('/')}>MultiApp</h1>
                </div>
                <div className="nav-icon">
                <i onClick={ this.onToggleNav } className="fas fa-th fa-2x" aria-hidden="true"></i>
                </div>

                {isNavOpen &&
                    <nav>
                        <div className="links-icons-container">
                            <NavLink exact to="/"><li><i className="fas fa-home"></i></li></NavLink>
                            <NavLink to="/book"><li><i className="fas fa-book"></i></li></NavLink>
                            <NavLink to="/note"> <li><i className="fas fa-sticky-note"></i></li></NavLink>
                            <NavLink to="/email"><li><i className="fas fa-paper-plane"></i></li></NavLink>
                        </div>
                    </nav>
                }
            </section>
        )
    }
}

export const AppHeader = withRouter(_AppHeader)

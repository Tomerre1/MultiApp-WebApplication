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
                

                {isNavOpen &&
                    <nav>
                        <div className="links-icons-container">
                            <NavLink exact to="/"><i className="fas fa-home"></i></NavLink>
                            <NavLink to="/note"> <i className="fas fa-sticky-note"></i></NavLink>
                            <NavLink to="/book"><i className="fas fa-book"></i></NavLink>
                            <NavLink to="/email"><i className="fas fa-paper-plane"></i></NavLink>
                        </div>
                    </nav>
                }
                </div>
            </section>
        )
    }
}

export const AppHeader = withRouter(_AppHeader)

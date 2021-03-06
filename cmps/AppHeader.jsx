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
                    <h1 onClick={() => this.props.history.push('/')}>MultiApp</h1>
                </div>
                <div className="nav-icon">
                <i onClick={ this.onToggleNav } className="fas fa-th fa-2x" aria-hidden="true"></i>
                

                {isNavOpen &&
                    <nav>
                        <div className="links-icons-container">
                            <NavLink onClick={this.onToggleNav} exact to="/"><i className="fas fa-home"></i></NavLink>
                            <NavLink onClick={this.onToggleNav} to="/note"> <i className="fas fa-sticky-note"></i></NavLink>
                            <NavLink onClick={this.onToggleNav} to="/book"><i className="fas fa-book"></i></NavLink>
                            <NavLink onClick={this.onToggleNav} to="/email"><i className="fas fa-paper-plane"></i></NavLink>
                        </div>
                    </nav>
                }
                </div>
            </section>
        )
    }
}

export const AppHeader = withRouter(_AppHeader)

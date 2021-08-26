
const { NavLink } = ReactRouterDOM

export function EmailNav(props) {
    // const updateSelectedFilter = (value) => {
    //     eventBusService.emit('mailFilter', value)
    // }

    return (
        <nav>
            <ul className="email-side-nav clean-list flex align-items">
                <NavLink className="compus-mail" onClick={props.toggleCompose}><i className="fas fa-plus"></i>Compose</NavLink>
                <NavLink onClick={() => { props.onSetFilter({ ['text']: '', ['isRead']: null, ['isStar']: null, ['isTrash']: null }) }} to={`/email`}><i className="fas fa-inbox"></i>Inbox</NavLink>
                <NavLink onClick={() => { props.onSetFilter({ ['text']: '', ['isRead']: true }) }} to={`/email`}><i className="fas fa-sign-out-alt"></i>Read</NavLink>
                <NavLink onClick={() => { props.onSetFilter({ ['text']: '', ['isRead']: false }) }} to={`/email`}><i className="fas fa-envelope-open"></i>UnRead</NavLink>
                <NavLink onClick={() => { props.onSetFilter({ ['text']: '', ['isStar']: true }) }} to={`/email`}><i className="fa fa-star"></i>Star</NavLink>
                <NavLink onClick={() => { props.onSetFilter({ ['text']: '', ['isTrash']: true }) }} to={`/email`}><i className="fa fa-trash"></i>Trash</NavLink>
            </ul>
        </nav>
    )
}

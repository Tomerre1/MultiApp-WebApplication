
const { NavLink } = ReactRouterDOM

export function EmailNav(props) {
    // const updateSelectedFilter = (value) => {
    //     eventBusService.emit('mailFilter', value)
    // }

    return (
        <nav>
            <ul className="email-side-nav clean-list flex align-items">
                <li onClick={() => { props.onSetFilter({ ['text']: '', ['isRead']: null, ['isStar']: null, ['isTrash']: null }) }}><NavLink><i className="fas fa-inbox"></i>Inbox</NavLink></li>
                <li onClick={() => { props.onSetFilter({ ['text']: '', ['isRead']: true }) }}><NavLink><i className="fas fa-sign-out-alt"></i>Read</NavLink></li>
                <li onClick={() => { props.onSetFilter({ ['text']: '', ['isRead']: false }) }}><NavLink><i className="fas fa-envelope-open"></i>UnRead</NavLink></li>
                <li onClick={() => { props.onSetFilter({ ['text']: '', ['isStar']: true }) }}><NavLink><i className="fa fa-star"></i>Star</NavLink></li>
                <li onClick={() => { props.onSetFilter({ ['text']: '', ['isTrash']: true }) }}><NavLink><i className="fa fa-trash"></i>Trash</NavLink></li>
            </ul>
        </nav>
        // <nav>
        //     <ul className="email-side-nav clean-list flex align-items">
        //         <li onClick={() => { updateSelectedFilter(null)}}><NavLink><i className="fas fa-inbox"></i>Inbox</NavLink></li>
        //         <li onClick={() => { updateSelectedFilter({...props.filterBy, ['isRead']: true })}}><NavLink><i className="fas fa-sign-out-alt"></i>Read</NavLink></li>
        //         <li onClick={() => { updateSelectedFilter({...props.filterBy, ['isRead']: false })}}><NavLink><i className="fas fa-envelope-open"></i>UnRead</NavLink></li>
        //         <li onClick={() => { updateSelectedFilter({...props.filterBy, ['isStar']: true })}}><NavLink><i className="fa fa-star"></i>Star</NavLink></li>
        //         <li onClick={() => { updateSelectedFilter({...props.filterBy, ['isTrash']: true })}}><NavLink><i className="fa fa-trash"></i>Trash</NavLink></li>
        //     </ul>
        // </nav>
    )
}



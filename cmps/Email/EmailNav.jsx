
const { NavLink, withRouter } = ReactRouterDOM

export function EmailNav(props) {
    console.log('%c  props:', 'color: #0e93e0;background: #aaefe5;', props);
    
    return (
        <nav>
            <ul className="email-side-nav clean-list flex align-items">
                <li><NavLink to="/email/inbox">Inbox</NavLink></li>
                <li><NavLink to="/email/sent">Sent</NavLink></li>
                <li><NavLink to="/email/trash">Trash</NavLink></li>
            </ul>
        </nav>
    )
}




const { NavLink, withRouter } = ReactRouterDOM

export function EmailNav(props) {
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



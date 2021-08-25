
export class EmailList extends React.Component {
  
    render() {
        return (
            <section className="list">
                <div className="search-list flex">
                    <input type="search" placeholder='Search a mail' />
                </div>
                <div className="mail-list">
                </div>
            </section>
        )
    }
}

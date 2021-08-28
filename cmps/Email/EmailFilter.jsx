import { eventBusService } from '../../services/event-bus-service.js';
import { emailService } from '../../services/Email/email.service.js';
export class EmailFilter extends React.Component {
    state = {
        filterBy: null,
        sortBy: null
    }

    componentDidMount() {
        this.setState({ filterBy: { ...this.props.filterBy }, sortBy: { numeric: false, alpha: false } })
    }

    handleChange = (e) => {
        const value = e.target.value;
        const filterBy = { ...this.props.filterBy, [e.target.name]: value }
        this.setState({ filterBy }, () => {
            this.props.onSetFilter(filterBy)
        })
    }
    
    setSortBy = (sortBy) => {
        eventBusService.emit('sortBy', sortBy)
        this.setState({ filterBy: { ...this.state.sortBy }, sortBy })
    }

    render() {
        if (!this.props.filterBy || !this.state.sortBy) return <div>Loading...Filter</div>
        const { text } = this.props.filterBy
        return (
            <form>
                <div className="search-bar flex">
                    <i onClick={() => { this.setSortBy({ ...this.state.sortBy , numeric: !this.state.sortBy.numeric, value: 'numeric' }) }}
                        className={`fas ${(this.state.sortBy.numeric) ? 'fa-sort-numeric-up-alt' : 'fa-sort-numeric-down-alt'}`} aria-hidden="true"></i>
                    <i onClick={() => { this.setSortBy({ ...this.state.sortBy , alpha: !this.state.sortBy.alpha , value: 'alpha' })}}
                        className={`fas ${(!this.state.sortBy.alpha) ? 'fa-sort-alpha-down' : 'fa-sort-alpha-up-alt'}`} aria-hidden="true"></i>
                    <input autoFocus className="search-list" name="text" value={text} onChange={this.handleChange} type="search" placeholder='Search a mail' />
                </div>
            </form>
        )
    }
}

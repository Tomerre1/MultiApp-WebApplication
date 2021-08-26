import { eventBusService } from '../../services/event-bus-service.js';
import { emailService } from '../../services/Email/email.service.js';
export class EmailFilter extends React.Component {
    state = {
        filterBy: null
    }

    componentDidMount() {
        console.log('this.props.filterBy:', this.props.filterBy);
        this.setState({ ...this.props.filterBy })
    }

    handleChange = (e) => {
        const value = e.target.value;
        const filterBy = { ...this.props.filterBy, [e.target.name]: value }
        this.setState({ filterBy }, () => {
            this.props.onSetFilter(filterBy)
        })
    }

    render() {
        if (!this.props.filterBy) return <div>Loading...Filter</div>
        const { text } = this.props.filterBy
        return (
            <form>
                <div className="search-bar flex">
                    <i onClick={()=>{eventBusService.emit('sortBy','date')}} className="fas fa-sort-numeric-up-alt" aria-hidden="true"></i>
                    <i onClick={()=>{eventBusService.emit('sortBy','subject')}} className="fas fa-sort-alpha-up-alt" aria-hidden="true"></i>
                    <input className="search-list" name="text" value={text} onChange={this.handleChange} type="search" placeholder='Search a mail' />
                </div>
            </form>
        )
    }
}
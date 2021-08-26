import { eventBusService } from '../../services/eventBusService.js';
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
                <div className="flex search-bar">
                    <input className="search-list" name="text" value={text} onChange={this.handleChange} type="search" placeholder='Search a mail' />
                </div>
            </form>
        )
    }
}
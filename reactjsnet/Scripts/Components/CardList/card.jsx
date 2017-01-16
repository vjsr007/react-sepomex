class Card extends React.Component {
    render() {
        return (
            <li>
                {this.props.card.name}
                {
                    this.props.moveUp ? <span onClick={this.props.moveUp}> Up</span> : ''
                }
                {
                    this.props.moveDown ? <span onClick={this.props.moveDown}> Down</span> : ''
                }
            </li>
        )
    }
}
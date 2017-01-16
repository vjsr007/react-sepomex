class CardList extends React.Component {
    constructor(props){
        super(props)
        this.state = props
    }
    moveCard(fromIndex, toIndex) {
        let cards = this.state.cards
        let movedCard = cards.splice(fromIndex, 1)[0]
        cards.splice(toIndex, 0, movedCard)
        this.setState({
            cards: cards
        })
    }
    render() {
        let elements = this.state.cards.map((element, index) => {
            let moveUp, moveDown;
            if (index != 0)
                moveUp = this.moveCard.bind(this, index, index-1)
            if (index != this.props.cards.length - 1)
                moveDown = this.moveCard.bind(this, index, index+1)
            return (
                <Card
                    key={index}
                    card={element}
                    moveUp={moveUp}
                    moveDown={moveDown}
                />
            )
        })
        return <ul>{elements}</ul>
    }
}
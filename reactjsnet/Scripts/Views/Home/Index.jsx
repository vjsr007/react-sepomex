let cards = [
    {'name': 'Super card', 'id': 1},
    {'name': 'Other card', 'id': 2},
    {'name': 'Last card', 'id': 3}
];

ReactDOM.render(<CardList cards={cards} />, document.getElementById("content"))
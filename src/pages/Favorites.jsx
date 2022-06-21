import Card from '../components/Card';  // Я из папки Card ищу index.js, если есть, то импортирую ее

function Favorites({items, onAddToFavorite}) {

    const renderCard = (items) => {
        return items
          .map((item, index) =>  // Когда мы перебираем элементы, реакт не знает чем они друг от друга отличаются и поэтому нужен key
            <Card
              key = {index}
              onFavorite = {onAddToFavorite}
              favorited = {true}
              {...item}  // Передаем все оставшиеся свойства
            />
          )
    }

    return (
        <div className="content p-40">
            <div className="d-flex justify-between mb-40 align-center">
                <h1>Мои закладки</h1>
            </div>
            <div className="d-flex flex-wrap">
                {renderCard(items)}
            </div>
        </div>
    )
}

export default Favorites;
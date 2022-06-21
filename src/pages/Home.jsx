import Card from '../components/Card';  // Я из папки Card ищу index.js, если есть, то импортирую ее

function Home({
    items,
    cartItems,
    searchValue,
    setSearchValue,
    onChangeSearchInput,
    onAddToCart,
    onAddToFavorite,
    isLoading
}) {

    const renderCard = (items) => {
        return items
          .filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase())) // Если у карточки в названии есть то что мы ввели в Input то он пройдет
          .map((item) =>  // Когда мы перебираем элементы, реакт не знает чем они друг от друга отличаются и поэтому нужен key
            <Card
              key = {item.imgUrl}
              onFavorite = {onAddToFavorite}
              loading = {isLoading}
              added = {cartItems.some(obj => Number(obj.id) === Number(item.id))}  // Если будет хотя бы одно совпадение, то some вернет true
              onPlus = {(obj) => onAddToCart(obj)}  // Принимает аргумент от дочернего компонента и добавляем в корзину
              {...item}
            />
          )
    }

    return (
        <div className="content p-40">
            <div className="d-flex justify-between mb-40 align-center">
                <h1 className="title">{searchValue ? `Поиск по "${searchValue}"` : 'Все кроссовки'}</h1>
                <div className="search-block d-flex">
                    <img src="/img/search.svg" alt="search" />
                    {searchValue ? <img onClick={() => setSearchValue('')} className="clear cu-p" src="/img/btn-remove.svg" alt="Close"/> : null}
                    <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск.." />
                </div>
            </div>
            <div className="d-flex flex-wrap">
                {renderCard(items)}
            </div>
        </div>
    )
}

export default Home;
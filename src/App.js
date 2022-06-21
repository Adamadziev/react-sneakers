import React from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
// import Card from './components/Card';  // Я из папки Card ищу index.js, если есть, то импортирую ее
import Header from './components/Header';  // На том же уровне где ты находишься найти папку components и импортируй из нее Header
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';

function App() {
  const [items, setItems] = React.useState([]);  // Массив для хранения наших кроссовок
  const [searchValue, setSearchValue] = React.useState('');  // Хранит то что мы будем вводить в поиске
  const [cartItems, setCartItems] = React.useState([]);  // Массив для хранения наших товаров в корзине
  const [favorites, setFavorites] = React.useState([]);
  const [isCartOpen, openCart] = React.useState(false);  // true ? появляется корзина : корзина не появляется
  const [isLoading, setIsLoading]  = React.useState(true); 

  // Если App.js опять захочет сделать ререндер, то это он вызывать не будет, только при первом рендере
  React.useEffect(() => {    
    async function fetchData() {
      const cartResponse = await axios.get('https://62a733ffbedc4ca6d7c48f86.mockapi.io/cart');
      const favoritesResponse = await axios.get('https://62a733ffbedc4ca6d7c48f86.mockapi.io/favorites');
      const itemsResponse = await axios.get('https://62a733ffbedc4ca6d7c48f86.mockapi.io/items');
      
      setIsLoading(false);
      
      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
    }

    fetchData();

    // FETCH
    // // Каждый раз когда мы обновляем items, ф-ция App() вызывается заново, а значит и заново будет отправляться запрос
    // fetch('https://62a733ffbedc4ca6d7c48f86.mockapi.io/items')
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then(json => {
    //     setItems(json);  // Установи в items json-ответ и сделай ререндер
    //   });

  }, []);

  const onAddToCart = (obj) => {
    console.log(obj);
    try {
      if(cartItems.find(item => Number(item.id) === Number(obj.id))) {
        axios.delete(`https://62a733ffbedc4ca6d7c48f86.mockapi.io/cart/${obj.id}`);
        setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
        console.log('Товар удален из корзины')
      } else {
        axios.post('https://62a733ffbedc4ca6d7c48f86.mockapi.io/cart', obj).then(res => {
          setCartItems(prev => [...prev, res.data]);
          console.log('Товар добавлен в корзину', cartItems);
        });
      }
    } catch(e) {
      alert(e);
    }


    // if(cartItems.filter(item => item.imgUrl === obj.imgUrl).length === 0) {
    //   axios.post('https://62a733ffbedc4ca6d7c48f86.mockapi.io/cart', obj).then(res => {
    //   setCartItems(prev => [...prev, res.data]);
    //   console.log('Товар добавлен в корзину');
    //   });
    // }
  };

  const onRemoveItemCart = (id) => {
    console.log(id);
    axios.delete(`https://62a733ffbedc4ca6d7c48f86.mockapi.io/cart/${id}`);

    // Все товары оставляем, кроме товара чей id равен id товару который мы хотим удалить
    setCartItems((prev) => prev.filter(item => item.id !== id));
  } 

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }

  const onAddToFavorite = async (obj) => {
    try {
      if(favorites.find(item => item.id === obj.id )) {
        axios.delete(`https://62a733ffbedc4ca6d7c48f86.mockapi.io/favorites/${obj.id}`);
      } else {
        const { data } = await axios.post('https://62a733ffbedc4ca6d7c48f86.mockapi.io/favorites', obj);  // Дождись ответа с бэкенда
        setFavorites(prev => [...prev, data]);  // и помести объект в setFavorite
        console.log("Товар добавился в фавориты", data);
      }
    } catch(e) {
      alert('Не удалось добавить в фавориты')
    }
  }
  
  return (
    <div className="wrapper clear">

      {isCartOpen && <Drawer items={cartItems} onCloseCart={() => openCart(false)} onRemove={onRemoveItemCart} />}
      <Header onClickCart={() => openCart(true)} />

      <Routes>
        <Route path='/' element={
        <Home 
          items = {items}
          cartItems = {cartItems}
          searchValue = {searchValue}
          setSearchValue = {setSearchValue}
          onChangeSearchInput = {onChangeSearchInput}
          onAddToCart = {onAddToCart}
          onAddToFavorite = {onAddToFavorite} />}
          isLoading = {isLoading}
        />
        <Route path='/favorites' element={<Favorites items={favorites} onAddToFavorite={onAddToFavorite} />} />
      </Routes>
      
    </div>
  );
}

export default App;

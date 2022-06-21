function Drawer({onCloseCart, onRemove, removeItem, items = []}) {  // С помощью деструктуризации достаем из объекта props - onClose и items
    // console.log(items);
    const renderCartItems = (items) => {
        return items.map((obj) => (
            <div key={obj.id} className="cartItem d-flex align-center mb-20">
                <div style={{ backgroundImage: `url(${obj.imgUrl})` }} className="cartItemImg"> </div>
                <div className="cartDesc mr-20 flex">
                <p className="mb-5">{obj.title}</p>
                <b>{obj.price} руб.</b>
                </div>
                <img onClick={() => onRemove(obj.id)} className="removeBtn" src="/img/btn-remove.svg" alt="Remove"/>
            </div>
        ))
    };

    return (
        <div className="overlay">
            <div className="drawer">
                <h1 className="mb-30">Корзина <img onClick={onCloseCart} className="removeBtn" src="/img/btn-remove.svg" alt="Close"/></h1>
                
                {
                    items.length > 0 ? 
                    <div>
                        <div className="itmes" style={{ flex: 1 }}>
                            {renderCartItems(items)}
                        </div>
                        <div className="cartTotalBlock">
                            <ul>
                                <li>
                                <span>Итого:</span>
                                <div></div>
                                <b>21 498 руб.</b>
                                </li>
                                <li>
                                <span>Налог: 5%</span>
                                <div></div>
                                <b>1074 руб.</b>
                                </li>
                            </ul>
                            <button className="greenButton">Оформить заказ <img src="/img/arrow.svg" alt="Arrow" /></button>
                        </div>
                    </div> :
                    <div className='cartEmpty d-flex align-center justify-center flex-column flex'>
                        <img className='mb-20' width='120px' height='120px' src='/img/empty-cart.jpg' alt='Empty' />
                        <h1>Корзина пустая</h1>
                        <p className='opacity-6'>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ</p>
                        <button onClick={onCloseCart} className='greenButton'>
                            <img src='/img/arrow.svg' alt='Arrow' /> Вернуться назад
                        </button>
                    </div>           
                }
            </div>
        </div>
    )
}

export default Drawer;
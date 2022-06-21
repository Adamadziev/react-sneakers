// Записывая в название module мы говорим реакту что это стили предназначенный для конкретного компонента
// Реакт будет искать файл у которого есть .module. для него он сгенерирует классы 
import styles from './Card.module.scss';
import ContentLoader from 'react-content-loader';
import React from 'react';

// {title, imgUrl, price, onPlus, onFavorite}
function Card({id, title, imgUrl, price, onPlus, onFavorite, favorited = false, added = false, loading = false}) {
    // Хук useState возвращает начальное значение(которое мы ему передаем) и ф-цию, которая его обновляет и отрисовывает в HTML
    // Ф-ци setCount обновляет count и заново рендерит его на странице
    const [isAdded, setIsAdded] = React.useState(added);
    const [isFavorite, setIsFavorite] = React.useState(favorited);  // Если favorited не найдет то false

    const onClickPlus = (e) => {
        onPlus({id, title, imgUrl, price});  // Эти аргументы мы можем принять в компоненте где мы задали эту ф-цию и использовать их
        setIsAdded(!isAdded);
    }

    const onClickFavorite = () => {
        onFavorite({id, title, imgUrl, price});
        setIsFavorite(!isFavorite);
    }

    return (  // Достаем из объекта styles класс и добавляем его в соответствующий div
        <div className={styles.card}>
            {
                loading ?
                <ContentLoader 
                    speed={2}
                    width={150}
                    height={187}
                    viewBox="0 0 150 187"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect x="0" y="0" rx="10" ry="10" width="150" height="90" /> 
                    <rect x="0" y="107" rx="5" ry="5" width="150" height="15" /> 
                    <rect x="0" y="128" rx="5" ry="5" width="110" height="15" /> 
                    <rect x="0" y="160" rx="5" ry="5" width="80" height="24" /> 
                    <rect x="116" y="151" rx="5" ry="5" width="32" height="32" />
                </ContentLoader> :
                <>
                    <div className={styles.plus} onClick={onClickFavorite} >
                        <img src={isFavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"} alt="Unliked" />
                    </div>
                    <img width={140} height={112} src={imgUrl} alt="1" />
                    <h5>{title}</h5>
                    <div className="d-flex justify-between align-center">
                        <div className="d-flex flex-column">
                        <span>ЦЕНА:</span>
                        <b>{price} руб</b>
                        </div>
                        <img className={styles.plus} onClick={onClickPlus} src={isAdded ? '/img/btn-checked.svg' : '/img/btn-plus.svg'} alt="plus"/>
                    </div>
                </>
            }
        </div>
    )
}

export default Card;
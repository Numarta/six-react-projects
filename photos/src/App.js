import React from 'react';
import './index.scss';
import Collection from './Collection.jsx';

function App() {
  const [collections, setCollections] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [searchValue, setSearchValue] = React.useState('');
  const [categoryId, setCategoryId] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);

  const categories = [
    { name: 'Все' },
    { name: 'Море' },
    { name: 'Горы' },
    { name: 'Архитектура' },
    { name: 'Города' },
  ];

  const onChangeInput = (event) => {
    const inputValue = event.target.value;
    setSearchValue(inputValue);
  };

  const onClickCategory = (index) => {
    setCategoryId(index);
  };

  React.useEffect(() => {
    fetch(
      `https://64b3aa280efb99d862683ce8.mockapi.io/photos?${
        categoryId ? `category=${categoryId}` : ''
      }`,
    )
      .then((response) => response.json())
      .then((res) => {
        // setCollections(res[0].collections);
        setCollections(res);
      })
      .catch((err) => {
        alert(err);
        console.log(`Ошибка запроса данных с mockapi, ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [categoryId]);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {categories.map((cat, index) => {
            return (
              <li
                onClick={() => onClickCategory(index)}
                className={categoryId === index ? 'active' : ''}
                key={cat.name}>
                {cat.name}
              </li>
            );
          })}
        </ul>
        <input onChange={onChangeInput} className="search-input" placeholder="Поиск по названию" />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>Идет загрузка...</h2>
        ) : (
          collections
            .filter((obj) => {
              if (obj.name.toLowerCase().includes(searchValue.toLowerCase())) {
                return obj;
              }
            })
            .map((collection) => {
              return (
                <Collection
                  key={collection.name}
                  name={collection.name}
                  images={collection.photos}
                />
              );
            })
        )}
      </div>
      <ul className="pagination">
        {[...Array(5)].map((_, i) => (
          <li onClick={() => setPage(i)} className={page === i ? 'active' : ''}>
            {i + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

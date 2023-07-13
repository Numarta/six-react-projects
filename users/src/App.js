import React from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [success, setSuccess] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [invites, setInvites] = React.useState([]);

  React.useEffect(() => {
    fetch('https://reqres.in/api/users')
      .then((res) => res.json())
      .then((json) => {
        setUsers(json.data);
      })
      .catch((err) => {
        console.warn(err);
        alert('Ошибка при получении пользователей!');
      })
      .finally(() => setIsLoading(false));
  }, []);

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  const onAddClick = (id) => {
    console.log(id);
    if (invites.includes(id)) {
      setInvites((prev) =>
        prev.filter((personId) => {
          return personId !== id;
        }),
      );
    } else {
      setInvites((prev) => [...prev, id]);
    }
  };

  const onClickSendInvite = () => {
    setSuccess(true);
  };

  return (
    <div className="App">
      {success ? (
        <Success count={invites.length}/>
      ) : (
        <Users
          invites={invites}
          onAddClick={onAddClick}
          onChangeSearchValue={onChangeSearchValue}
          searchValue={searchValue}
          items={users}
          isLoading={isLoading}
          onClickSendInvite={onClickSendInvite}
        />
      )}
    </div>
  );
}

export default App;

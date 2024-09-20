import React, { useEffect, useState, createContext, useContext } from "react";

const initialUsers = {
  Nicolas: true,
  Mary: true,
  Julia: true,
  John: true,
  Jorge: true,
};

type Username = keyof typeof initialUsers;
type Users = typeof initialUsers;

const getNumUsersOnline = (users: Users) =>
  Object.values(users).filter((status) => status).length;

const UserContext = createContext(initialUsers);

export default function Page() {
  const [users, setUsers] = useState(initialUsers);

  const randomizeOneUser = (users: Users) => {
    const names = Object.keys(users) as Username[];
    const random = Math.floor(Math.random() * names.length);
    const newUsers = { ...users };
    newUsers[names[random]] = !users[names[random]];
    return newUsers;
  };

  const randomizeUsers = () => {
    setUsers(randomizeOneUser);
  };

  useEffect(() => {
    const interval = setTimeout(randomizeUsers, 5000);
    return () => clearInterval(interval);
  }, [users]);

  return (
    <UserContext.Provider value={users}>
      <h1 className={"text-xl font-bold mb-4"}>Test 5</h1>
      <UserList />
      <UserStatus />
      <ActionButton action={randomizeUsers} />
    </UserContext.Provider>
  );
}
const UserList = () => {
  const users = useContext(UserContext);
  return (
    <div style={{ padding: 20 }}>
      {Object.keys(users).map((key) => (
        <User name={key as Username} />
      ))}
    </div>
  );
};

const User = ({ name }: { name: Username }) => {
  const users = useContext(UserContext);
  const status = users[name];
  const numUsersOnline = getNumUsersOnline(users);

  return (
    <p>
      {`${name}: ${status ? "ONLINE" : "OFFLINE"}`}{" "}
      {status && numUsersOnline === 1 && "and I'm all alone..."}
    </p>
  );
};
const UserStatus = () => {
  const users = useContext(UserContext);
  const numUsersOnline = getNumUsersOnline(users);
  return <p>There are currently {numUsersOnline} users online</p>;
};

const ActionButton = ({ action }: { action: () => void }) => (
  <button onClick={action}>Randomize now!</button>
);

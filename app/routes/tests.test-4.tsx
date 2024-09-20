import React, { FormEventHandler, useReducer } from "react";

type User = {
  email: string;
  name: string;
  surname: string;
};

type UserAction = {
  type: "ADD USER" | "UPDATE FORM";
  user: Partial<User>;
};

type UserState = {
  form: User;
  users: User[];
};

const UserForm = () => {
  const [state, dispatch] = useReducer(
    (state: UserState, action: UserAction) => {
      switch (action.type) {
        case "ADD USER":
          return {
            ...state,
            users: [...state.users, action.user as User],
            form: { email: "", name: "", surname: "" },
          };
        case "UPDATE FORM":
          return {
            ...state,
            form: { ...state.form, ...action.user },
          };
        default:
          return state;
      }
    },
    { form: { email: "", name: "", surname: "" }, users: [] },
  );

  const handleTextChange =
    (key: keyof User) => (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: "UPDATE FORM", user: { [key]: e.target.value } });
    };

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    dispatch({ type: "ADD USER", user: state.form });
  };

  return (
    <div>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          border: "solid",
          padding: 10,
        }}
        onSubmit={onSubmit}
      >
        <h3>Add user</h3>
        <input
          value={state.form.email}
          type="email"
          onChange={handleTextChange("email")}
          className="mb-2 border border-gray-300 rounded-lg p-2"
          placeholder="Email (required)"
          required
        />
        <input
          value={state.form.name}
          type="text"
          onChange={handleTextChange("name")}
          className="mb-2 border border-gray-300 rounded-lg p-2"
          placeholder="Name"
        />
        <input
          value={state.form.surname}
          type="text"
          onChange={handleTextChange("surname")}
          className="mb-2 border border-gray-300 rounded-lg p-2"
          placeholder="Surname (required)"
          required
        />
        <button
          type="submit"
          className="bg-blue-800 text-gray-200 text-xs font-bold py-2 px-4 rounded-lg hover:opacity-80 transition-all"
        >
          Add
        </button>
      </form>
      <br />
      <b>List of users: </b>
      <dl>
        {state.users.map((user, index) => (
          <div key={index} className="mb-3">
            <div className="flex gap-2">
              <dt>Email:</dt>
              <dd>{user.email}</dd>
            </div>
            <div className="flex gap-2">
              <dt>Full Name:</dt>

              <dt>
                {user.name} {user.surname}
              </dt>
            </div>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default function Page() {
  return (
    <>
      <h1 className={"text-xl font-bold mb-4"}>Test 4</h1>
      <div className="flex items-center justify-center pt-12">
        <UserForm />
      </div>
    </>
  );
}

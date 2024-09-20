import React, { Component, ComponentType, ComponentProps } from "react";

type User = {
  name: string;
};

const currentUser: User = {
  name: "Michael",
};

const withUser =
  (user: User) =>
  <P extends object>(Component: ComponentType<P>) => {
    return (props: Omit<P, "user">) => (
      <Component {...(props as P)} user={user} />
    );
  };

const Badge = ({ user, salutation }: { user: User; salutation: string }) => {
  return (
    <main className="p-4 border border-blue-600 rounded-lg text-center mb-4">
      <header>
        <h1>{salutation}</h1>
        <p>My Name Is</p>
      </header>
      <div>
        <p className="text-4xl font-bold">{user.name}</p>
      </div>
    </main>
  );
};
const BadgeWithUser = withUser(currentUser)(Badge);

export default function Page() {
  return (
    <>
      <h1 className={"text-xl font-bold mb-4"}>Test 6 - Optional</h1>
      <BadgeWithUser salutation="Good day" />
      <Badge salutation="Good day" user={{ name: "Sean" }} />
    </>
  );
}

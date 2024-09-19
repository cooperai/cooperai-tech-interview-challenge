import React, { useEffect, useState } from "react";

/**
 * Type definition for a person object from the randomuser.me API
 */
type Person = {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: string;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  email: string;
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  dob: {
    date: string;
    age: number;
  };
  registered: {
    date: string;
    age: number;
  };
  phone: string;
  cell: string;
  id?: {
    name: string;
    value: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
};

const PersonCard = ({
  person,
  isExpanded,
  toggleSelfExpanded,
}: {
  person: Person;
  isExpanded: boolean;
  toggleSelfExpanded: () => void;
}) => {
  return (
    <div className="flex flex-col gap-4 p-4 border border-gray-300 rounded-lg relative font-sans">
      <div
        className={`flex gap-4 ${isExpanded && "border-b border-gray-300 pb-4"}`}
      >
        <img
          src={person.picture.medium}
          alt={person.name.first}
          className="rounded-full w-24 h-24"
        />
        <div>
          <h2 className="text-lg font-bold">
            {person.name.first} {person.name.last}
          </h2>
          <p>
            {person.email} | {person.login.username}
          </p>
          <p>Registered {person.registered.age} years ago</p>
        </div>
        <button
          onClick={toggleSelfExpanded}
          className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-800 transition-all"
        >
          {isExpanded ? "Close" : "Expand"}
        </button>
      </div>
      {isExpanded && (
        <div>
          <label className="font-bold">User location</label>
          <p>
            {person.location.street.number} {person.location.street.name}
          </p>
          <p>
            {person.location.city}, {person.location.state},{" "}
            {person.location.country}
          </p>
          <p>{person.location.postcode}</p>
          <p>
            {person.location.coordinates.latitude},{" "}
            {person.location.coordinates.longitude}
          </p>
          <p>
            {person.location.timezone.offset} -{" "}
            {person.location.timezone.description}
          </p>
          <p>
            <label className="font-bold">Phone:</label> {person.phone}
          </p>
          <p>
            <label className="font-bold">Cell:</label> {person.cell}
          </p>
          {person.id?.value && (
            <p>
              <label className="font-bold">ID:</label> {person.id.name} -{" "}
              {person.id.value}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default function Page() {
  const [numPeople, setNumPeople] = useState(1);
  const [people, setPeople] = useState<Person[]>([]);
  const [expandedPerson, setExpandedPerson] = useState<string>();

  useEffect(() => {
    fetch(`https://randomuser.me/api/?results=${numPeople}`)
      .then((res) => res.json())
      .then((data) => setPeople(data.results));
  }, [numPeople]);

  return (
    <>
      <h1 className={"text-xl font-bold mb-4"}>Test 2</h1>
      <div className="flex flex-col gap-4 max-w-xl">
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={0}
            max={5000}
            value={numPeople}
            onChange={(e) => setNumPeople(parseInt(e.target.value))}
            className="w-16 border border-gray-300 rounded-lg p-2"
          />
          <span>user{numPeople !== 1 && "s"}</span>
        </div>
        <div className="grid gap-4">
          {people.map((person) => (
            <PersonCard
              key={person.login.uuid}
              person={person}
              isExpanded={expandedPerson === person.login.uuid}
              toggleSelfExpanded={() =>
                setExpandedPerson(
                  expandedPerson === person.login.uuid
                    ? undefined
                    : person.login.uuid,
                )
              }
            />
          ))}
        </div>
      </div>
    </>
  );
}

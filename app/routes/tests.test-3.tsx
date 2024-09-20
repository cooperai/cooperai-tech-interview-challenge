import React, { useState, useEffect } from "react";

const objectToJSX = (data: Record<string, unknown>) => {
  if (!data) {
    return "";
  }

  let keys: string[] = [];
  try {
    keys = Object.keys(data);
  } catch (e) {
    return "";
  }

  return keys?.map((key) => {
    const value = data[key];

    if (typeof value === "object") {
      return (
        <div key={key} className={"ml-4"}>
          <span className={"font-bold text-blue-950"}>{key}:</span>
          {objectToJSX(value as Record<string, unknown>)}
        </div>
      );
    }

    return (
      <div key={key} className={"ml-4"}>
        <span className={"font-bold text-blue-950"}>{key}</span>:{" "}
        {value?.toString()}
      </div>
    );
  });
};

const DataDisplay: React.FC<{ data: Record<string, unknown> }> = ({ data }) => {
  return (
    <div className={"bg-gray-200 py-4 rounded-lg"}>
      <div>{objectToJSX(data)}</div>{" "}
    </div>
  );
};

export default function Page() {
  const [data, setData] = useState<Record<string, unknown>>({});

  useEffect(() => {
    fetch(`https://randomuser.me/api/?results=1`)
      .then((res) => res.json())
      .then((data) => setData(data.results[0]));
  }, []);
  return (
    <>
      <h1 className={"text-xl font-bold mb-4"}>Test 3</h1>
      <DataDisplay data={data} />
    </>
  );
}

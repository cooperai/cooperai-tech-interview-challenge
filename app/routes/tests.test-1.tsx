import React, { useEffect, useState } from "react";

const MIN_WIDTH = 40;
const MIN_HEIGHT = 20;
const MAX_WIDTH = 200;
const MAX_HEIGHT = 100;
const STEP = 10;

const PulsatingButton: React.FC = () => {
  const [width, setWidth] = useState(MIN_WIDTH);
  const [height, setHeight] = useState(MIN_HEIGHT);
  const [isIncreasing, setIsIncreasing] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isIncreasing) {
        // increase width/height by step
        // if resultant width/height would exceed max, set to max and start decreasing
        // these conditions are independent of each other -- either can be the limiting factor
        if (width + STEP <= MAX_WIDTH) {
          setWidth((prevWidth) => prevWidth + STEP);
        } else {
          setWidth(MAX_WIDTH);
          setIsIncreasing(false);
        }

        if (height + STEP <= MAX_HEIGHT) {
          setHeight((prevHeight) => prevHeight + STEP);
        } else {
          setHeight(MAX_HEIGHT);
          setIsIncreasing(false);
        }
      } else {
        if (width - STEP >= MIN_WIDTH) {
          setWidth((prevWidth) => prevWidth - STEP);
        } else {
          setWidth(MIN_WIDTH);
          setIsIncreasing(true);
        }

        if (height - STEP >= MIN_HEIGHT) {
          setHeight((prevHeight) => prevHeight - STEP);
        } else {
          setHeight(MIN_HEIGHT);
          setIsIncreasing(true);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [width, height, isIncreasing]);

  return (
    <button
      onClick={() => setIsIncreasing(!isIncreasing)}
      className={
        "bg-blue-800 text-gray-200 text-xs font-bold py-2 px-4 rounded-lg hover:opacity-80 transition-all"
      }
      style={{ width, height }}
    >
      Click me {isIncreasing ? "to shrink" : "to grow"}
    </button>
  );
};

export default function TestOne() {
  return (
    <>
      <h1 className={"text-xl font-bold"}>Test 1</h1>
      <div
        className={"flex flex-col items-center justify-center w-full h-[80vh]"}
      >
        <PulsatingButton />
      </div>
    </>
  );
}

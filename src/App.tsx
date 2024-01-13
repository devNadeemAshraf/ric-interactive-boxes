import { useEffect, useState } from "react";
import { shuffle2dArray } from "./helper";

function App() {
  const [grid, setGrid] = useState<number[][]>([]);
  const [selected, setSelected] = useState<boolean[][]>([]);
  const [selectedTilesCount, setSelectedTilesCount] = useState(0);

  const [val, setVal] = useState(0);
  const [inputVal, setInputVal] = useState(0);

  const handleTileClick = (index: string) => {
    const row = parseInt(index.split("_")[0]);
    const col = parseInt(index.split("_")[1]);

    const newArrGrid = [...selected];

    const currentState = newArrGrid[row][col];

    if (currentState == true) {
      setSelectedTilesCount((prev) => prev - 1);
    } else {
      setSelectedTilesCount((prev) => prev + 1);
    }

    newArrGrid[row][col] = !currentState;

    setSelected(newArrGrid);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputVal !== 0) {
      const grid: number[][] = [];
      const selectedGrid: boolean[][] = [];
      let val = 1;
      for (let i = 0; i < inputVal; i++) {
        grid[i] = [];
        selectedGrid[i] = [];
        for (let j = 0; j < inputVal; j++) {
          grid[i][j] = val;
          selectedGrid[i][j] = false;
          val++;
        }
      }

      setGrid(grid);
      setSelected(selectedGrid);
      setVal(inputVal);
    }
  };

  const handleReset = () => {
    if (val !== 0) {
      const grid: number[][] = [];
      const selectedGrid: boolean[][] = [];
      let resetVal = 1;

      for (let i = 0; i < val; i++) {
        grid[i] = [];
        selectedGrid[i] = [];
        for (let j = 0; j < val; j++) {
          grid[i][j] = resetVal;
          selectedGrid[i][j] = false;
          resetVal++;
        }
      }

      setGrid(grid);
      setSelected(selectedGrid);
      setSelectedTilesCount(0);
    }
  };

  const handleShuffel = () => {
    const shuffledGrid = shuffle2dArray(grid);

    const selectedGrid: boolean[][] = [];

    for (let i = 0; i < val; i++) {
      selectedGrid[i] = [];
      for (let j = 0; j < val; j++) {
        selectedGrid[i][j] = false;
      }
    }

    setGrid(shuffledGrid);
    setSelected(selectedGrid);
    setSelectedTilesCount(0);
  };

  useEffect(() => {
    console.log("Grid: ", grid);
  }, [grid]);

  return (
    <main className="w-full h-full flex flex-col items-center justify-center text-blue-950 bg-white">
      {/* Form */}
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleFormSubmit(e)}
        className="w-full max-w-[300px] flex flex-col gap-2"
      >
        <input
          type="number"
          value={inputVal}
          onChange={(e) => setInputVal(parseInt(e.target.value))}
          min={0}
          className="bg-gray-100 border-none outline-none px-4 py-2 rounded-md text-2xl"
        />
        <button
          type="submit"
          className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Create Grid
        </button>
      </form>
      {/* Grid */}
      <div className="my-4">
        {grid?.map((row, rIndex) => {
          return (
            <span
              key={rIndex}
              className="w-10 h-10 p-8 flex items-center justify-center text-2xl font-bold"
            >
              {row.map((_, cIndex) => {
                return (
                  <span
                    key={cIndex}
                    onClick={() => {
                      handleTileClick(`${rIndex}_${cIndex}`);
                    }}
                    className={`
                    w-10 h-10 border rounded-md p-8 flex items-center justify-center hover:bg-neutral-100 transition-colors cursor-pointer
                    ${
                      selected[rIndex][cIndex]
                        ? "bg-blue-700 text-white hover:bg-blue-600"
                        : ""
                    }
                      `}
                  >
                    {grid[rIndex][cIndex]}
                  </span>
                );
              })}
            </span>
          );
        })}
      </div>
      <div className="flex w-full max-w-[300px] gap-2">
        <button
          disabled={selectedTilesCount <= 0 ? true : false}
          onClick={handleReset}
          className="bg-blue-100 text-blue-700 px-4 py-2 rounded-md flex-1 hover:bg-blue-200 transition-colors disabled:cursor-auto disabled:pointer-events-none disabled:bg-gray-100 disabled:text-gray-400"
        >
          Reset
        </button>
        <button
          onClick={handleShuffel}
          className="bg-blue-100 text-blue-700 px-4 py-2 rounded-md flex-1 hover:bg-blue-200 transition-colors"
        >
          Shuffel
        </button>
      </div>
    </main>
  );
}

export default App;

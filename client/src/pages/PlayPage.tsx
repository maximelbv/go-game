import TsumegoBoard from "../components/TsumegoBoard";

const PlayPage = () => {
  const exampleData = {
    C: "Black to play: Elementary",
    AB: ["fb", "hb", "bc", "cc", "dc", "ec", "fc", "be"],
    AW: ["ab", "bb", "cb", "db", "eb"],
    SZ: "19",
    SOL: [
      ["B", "ba", "", ""],
      ["B", "ea", "", ""],
    ],
  };

  return (
    <div className="p-4">
      <TsumegoBoard
        data={exampleData}
        onSolve={(correct) =>
          console.log(correct ? "Problem solved!" : "Incorrect solution")
        }
      />
    </div>
  );
};

export default PlayPage;

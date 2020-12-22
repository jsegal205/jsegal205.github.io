import React, { useState } from "react";

const defaultGameState = {
  players: [],
  setup: {
    maxPlayers: 4,
    diceRolls: 4,
    mountain: [
      {
        value: 5,
        size: 4,
        points: 10,
      },
      {
        value: 6,
        size: 4,
        points: 9,
      },
      {
        value: 7,
        size: 3,
        points: 8,
      },
      {
        value: 8,
        size: 3,
        points: 7,
      },
      {
        value: 9,
        size: 2,
        points: 6,
      },
      {
        value: 10,
        size: 2,
        points: 5,
      },
    ],
  },
  gameStarted: false,
};

const MountainGoat = () => {
  const [gameState, setGameState] = useState(defaultGameState);

  const AddPlayer = () => {
    const [playerName, setPlayerName] = useState("");
    let canAddPlayer = playerName.trim() !== "";
    if (gameState.players.length === gameState.setup.maxPlayers) {
      return null;
    }

    const handleOnClick = () => {
      const newPlayer = {
        number: gameState.players.length + 1,
        name: playerName,
        goats: {
          5: {
            currentPosition: 0,
            timesPeaked: 0,
          },
          6: {
            currentPosition: 0,
            timesPeaked: 0,
          },
          7: {
            currentPosition: 0,
            timesPeaked: 0,
          },
          8: {
            currentPosition: 0,
            timesPeaked: 0,
          },
          9: {
            currentPosition: 0,
            timesPeaked: 0,
          },
          10: {
            currentPosition: 0,
            timesPeaked: 0,
          },
        },
        totalPoints: 0,
      };

      if (canAddPlayer) {
        setGameState({
          ...gameState,
          players: [...gameState.players, newPlayer],
        });
      }
    };

    // add goat color choice
    return (
      <div>
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <button disabled={!canAddPlayer} onClick={handleOnClick}>
          Add new player
        </button>

        {!canAddPlayer && <label>Please enter player name</label>}
      </div>
    );
  };

  const PlayerTurn = ({ player }) => {
    const peakValues = defaultGameState.setup.mountain.map(
      (peak) => peak.value
    );
    const [currentTurn, setCurrentTurn] = useState({
      rolls: {},
      possiblePaths: {},
    });

    /*
      roll dice,
      pick outcomes,
        if multiple 1 rolled, pick any number
        show all possible outcomes as checkboxes ,

          with end turn
      move goats,
        if at top of mountain
          overthrow goat,
          take points,
          don't go down far side of the mountain
      end turn
    */

    const rollTheDice = () => Math.ceil(Math.random() * Math.floor(6));

    const possiblePaths = (rolls) => {
      const allCombos = peakValues.reduce((acc, curr) => {
        return { ...acc, [curr]: [] };
      }, {});

      const diceCombos = [
        ["d1"],
        ["d2"],
        ["d3"],
        ["d4"],
        ["d1", "d2"],
        ["d1", "d3"],
        ["d1", "d4"],
        ["d1", "d2", "d3"],
        ["d1", "d2", "d4"],
        ["d1", "d3", "d4"],
        ["d2", "d3"],
        ["d2", "d4"],
        ["d2", "d3", "d4"],
        ["d3", "d4"],
        ["d1", "d2", "d3", "d4"],
      ];

      diceCombos.map((combo) => {
        const sum = combo.reduce((acc, curr) => acc + rolls[curr], 0);
        if (peakValues.includes(sum)) {
          return {
            ...allCombos,
            [sum]: allCombos[sum].push(combo),
          };
        }
      });

      return Object.keys(allCombos).map((peak) => {
        return (
          <>
            <div>{peak}</div>
            <ul>
              {allCombos[peak].map((combos) => (
                <li>{JSON.stringify(combos)}</li>
              ))}
            </ul>
          </>
        );
      });
    };

    return (
      <>
        <h3>Current Player: {player.name}</h3>
        {!currentTurn.rolls.length && (
          <section>
            Click to roll {defaultGameState.setup.diceRolls} dice!
            <button
              onClick={() => {
                const rolls = { d1: 0, d2: 0, d3: 0, d4: 0 };
                for (
                  let rollNum = 0;
                  rollNum < defaultGameState.setup.diceRolls;
                  rollNum++
                ) {
                  rolls[`d${rollNum + 1}`] = rollTheDice();
                }

                setCurrentTurn({ ...currentTurn, rolls });
              }}
            >
              ROLL
            </button>
          </section>
        )}

        {Object.keys(currentTurn.rolls).length && (
          <>
            <h4>Roll Results</h4>
            {Object.keys(currentTurn.rolls).map((diceKey) => {
              return (
                <div>
                  {diceKey} -{">"} {currentTurn.rolls[diceKey]}
                </div>
              );
            })}
            <hr />
            <div>Possible Outcomes</div>
            {possiblePaths(currentTurn.rolls)}
          </>
        )}
      </>
    );
  };

  return (
    <main>
      <h2>Mountain Goat Game</h2>
      <section>
        <a
          href="https://boardgamegeek.com/boardgame/305985/mountain-goats"
          target="_blank"
          rel="noopener noreferrer"
        >
          Board Game Geek
        </a>
        If you like the game support the creators by purchasing the game!
        <a
          href="https://www.boardgametables.com/products/gps-sequoia-and-mountain-goats"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mountain Goats on Board Game Tables
        </a>
      </section>

      <section>
        TODO:
        <ul>
          <li>player turn logic, roll dice, choose numbers, complete turn</li>
          <li>game rules: double 1 rolled (chose any number)</li>
          <li>
            add points when moving to the top, remove exisiting goats at top
          </li>
          <li>game board ui</li>
          <li>cool animation for dice roll?</li>
          <li>goat noise when goat moves</li>
          <li>no duplicate names</li>
        </ul>
      </section>

      {!gameState.gameStarted && (
        <section>
          <h3>New Game</h3>

          <AddPlayer />
        </section>
      )}

      {!!gameState.players.length && (
        <>
          <h3>Players</h3>
          {gameState.players.map((player) => (
            <ul>
              <li key={player.name}>Goat {player.name}</li>
            </ul>
          ))}
        </>
      )}

      {!gameState.gameStarted && gameState.players.length > 1 && (
        <section>
          <button
            onClick={() => setGameState({ ...gameState, gameStarted: true })}
          >
            Start the game!
          </button>
        </section>
      )}

      {gameState.gameStarted && (
        <section>
          <h3>Rules</h3>
          <ul>
            <li>roll the dice</li>
            <li>choose dice values that correspond to mountain peaks </li>
          </ul>
          <h3>Game Board</h3>
          {defaultGameState.setup.mountain.map((peak) => (
            <>
              <div
                style={{
                  border: "2px solid black",
                  height: "10px",
                  width: "10px",
                }}
              ></div>
            </>
          ))}

          {<PlayerTurn player={gameState.players[0]} />}
        </section>
      )}
    </main>
  );
};

export default MountainGoat;

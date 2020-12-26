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
  currentPlayer: -1,
};

const MountainGoat = () => {
  const [gameState, setGameState] = useState(defaultGameState);

  const AddPlayer = () => {
    const [playerName, setPlayerName] = useState("");

    const blankPlayerName = playerName.trim() === "";
    const dupeName = gameState.players
      .map((player) => player.name)
      .includes(playerName.trim());

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

      if (!blankPlayerName && !dupeName) {
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
        <button disabled={blankPlayerName || dupeName} onClick={handleOnClick}>
          Add new player
        </button>

        {blankPlayerName && <label>Please enter player name</label>}
        {dupeName && <label>Name already taken</label>}
      </div>
    );
  };

  const PlayerTurn = ({ player }) => {
    const peakValues = defaultGameState.setup.mountain.map(
      (peak) => peak.value
    );
    const [currentTurn, setCurrentTurn] = useState({
      playerNumber: player.number,
      rolls: {},
      showOutcomes: false,
      stagedRolls: [],
      toBeStaged: [],
    });

    /*
      roll dice,
      pick outcomes,
        if multiple 1 rolled, pick any number
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

      // make this dynamic based on defaultSettings.diceRolls
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
        const sum = combo.reduce((acc, curr) => acc + rolls[curr].value, 0);
        if (peakValues.includes(sum)) {
          return {
            ...allCombos,
            [sum]: allCombos[sum].push(combo),
          };
        }

        return allCombos;
      });

      return Object.keys(allCombos).map((peak) => {
        return (
          <div key={peak}>
            <div>{peak}</div>
            {!allCombos[peak].length && <div>No combinations</div>}
            {!!allCombos[peak].length && (
              <ul>
                {allCombos[peak].map((combos) => (
                  <li key={JSON.stringify(combos)}>{JSON.stringify(combos)}</li>
                ))}
              </ul>
            )}
          </div>
        );
      });
    };

    return (
      <>
        <h3>Current Player: {player.name}</h3>
        {Object.keys(currentTurn.rolls).length === 0 && (
          <section>
            Click to roll {defaultGameState.setup.diceRolls} dice!
            <button
              onClick={() => {
                const rolls = { d1: {}, d2: {}, d3: {}, d4: {} };
                for (
                  let rollNum = 0;
                  rollNum < defaultGameState.setup.diceRolls;
                  rollNum++
                ) {
                  rolls[`d${rollNum + 1}`] = {
                    value: rollTheDice(),
                    staged: false,
                    checked: false,
                  };
                }

                setCurrentTurn({ ...currentTurn, rolls });
              }}
            >
              ROLL
            </button>
          </section>
        )}

        {!!Object.keys(currentTurn.rolls).length && (
          <>
            <h4>Roll Results</h4>
            {Object.keys(currentTurn.rolls).map((diceKey) => {
              // make these checkboxes
              // add stage dice section, allow removal from stage dice section, disable dice that have been staged
              // show popup if all dice not used before submitting
              // add submit section button that
              return (
                <div key={diceKey}>
                  <input
                    type="checkbox"
                    value={diceKey}
                    name={diceKey}
                    id={diceKey}
                    disabled={!!currentTurn.rolls[diceKey].staged}
                    checked={!!currentTurn.rolls[diceKey].checked}
                    onClick={(e) => {
                      let toBeStaged = [];
                      if (currentTurn.toBeStaged.includes(e.target.value)) {
                        toBeStaged = currentTurn.toBeStaged.filter(
                          (s) => s !== e.target.value
                        );
                      } else {
                        toBeStaged = [
                          ...currentTurn.toBeStaged,
                          e.target.value,
                        ];
                      }

                      setCurrentTurn({
                        ...currentTurn,
                        rolls: {
                          ...currentTurn.rolls,
                          [diceKey]: {
                            ...currentTurn.rolls[diceKey],
                            checked: e.target.checked,
                          },
                        },
                        toBeStaged,
                      });
                    }}
                  />
                  <label htmlFor={diceKey}>
                    {diceKey} -{">"} {currentTurn.rolls[diceKey].value}
                  </label>
                </div>
              );
            })}

            <button
              disabled={!currentTurn.toBeStaged.length}
              onClick={() => {
                const stagingRolls = JSON.parse(
                  JSON.stringify(currentTurn.rolls)
                );
                currentTurn.toBeStaged.forEach((stage) => {
                  stagingRolls[stage].checked = false;
                  stagingRolls[stage].staged = true;
                });

                setCurrentTurn({
                  ...currentTurn,
                  rolls: stagingRolls,
                  stagedRolls: [
                    ...currentTurn.stagedRolls,
                    currentTurn.toBeStaged,
                  ],
                  toBeStaged: [],
                });
              }}
            >
              Stage Rolls
            </button>

            {!!currentTurn.stagedRolls.length && (
              <section>
                <div>
                  here are the staged rolls
                  {currentTurn.stagedRolls.map((stage) => {
                    const total = stage.reduce(
                      (acc, current) => acc + currentTurn.rolls[current].value,
                      0
                    );
                    const peakValues = defaultGameState.setup.mountain.map(
                      (peak) => peak.value
                    );

                    return (
                      <div style={{ border: "2px solid black" }}>
                        {stage.map((stagedRoll) => (
                          <div>
                            {stagedRoll} {"->"}{" "}
                            {currentTurn.rolls[stagedRoll].value}
                          </div>
                        ))}
                        <label>total: {total}</label>
                        {!peakValues.includes(total) && (
                          <label>This doesn't match a peak!</label>
                        )}
                        <button
                          onClick={() => {
                            const stagingRolls = JSON.parse(
                              JSON.stringify(currentTurn.rolls)
                            );
                            stage.forEach((stagedRoll) => {
                              stagingRolls[stagedRoll].staged = false;
                            });

                            setCurrentTurn({
                              ...currentTurn,
                              rolls: stagingRolls,
                              stagedRolls: currentTurn.stagedRolls.filter(
                                (staged) => staged !== stage
                              ),
                            });
                          }}
                        >
                          Unstage
                        </button>
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={() => {
                    const workingPlayers = [...gameState.players];
                    const idx = workingPlayers.findIndex(
                      (player) => player.number === currentTurn.playerNumber
                    );
                    const player = JSON.parse(
                      JSON.stringify(workingPlayers[idx])
                    );

                    currentTurn.stagedRolls.map((stage) => {
                      const total = stage.reduce(
                        (acc, current) =>
                          acc + currentTurn.rolls[current].value,
                        0
                      );

                      player.goats[total].currentPosition += 1;
                    });

                    workingPlayers[idx] = player;

                    let nextPlayer = (gameState.currentPlayer += 1);
                    if (nextPlayer > gameState.players.length - 1) {
                      nextPlayer = 0;
                    }

                    setGameState({
                      ...gameState,
                      players: workingPlayers,
                      currentPlayer: nextPlayer,
                    });
                    // setGameState({players})
                    // take totals from each stage
                  }}
                >
                  Finish turn
                </button>
              </section>
            )}

            {!currentTurn.showOutcomes && (
              <div>
                <span>Need some help with dice outcomes?</span>
                <span>
                  <button
                    onClick={() => {
                      setCurrentTurn({ ...currentTurn, showOutcomes: true });
                    }}
                  >
                    Click here
                  </button>
                </span>
              </div>
            )}

            {currentTurn.showOutcomes && (
              <>
                <hr />
                <div>Possible Outcomes</div>
                <button
                  onClick={() => {
                    setCurrentTurn({ ...currentTurn, showOutcomes: false });
                  }}
                >
                  Hide Outcomes
                </button>

                {possiblePaths(currentTurn.rolls)}
              </>
            )}
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
      {/*
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
          <li>pressing enter in add player input, adds player</li>
          <li>style the shit out of it</li>
        </ul>
      </section> */}

      {!gameState.gameStarted && (
        <section>
          <h3>New Game</h3>

          <AddPlayer />
        </section>
      )}

      {!!gameState.players.length && (
        <>
          <h3>Players</h3>
          <ul>
            {gameState.players.map((player) => (
              <li key={player.name}>Goat {player.name}</li>
            ))}
          </ul>
        </>
      )}

      {!gameState.gameStarted && gameState.players.length > 1 && (
        <section>
          <button
            onClick={() =>
              setGameState({
                ...gameState,
                gameStarted: true,
                currentPlayer: 0,
              })
            }
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
          {/* <h3>Game Board</h3>
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
          ))} */}

          {<PlayerTurn player={gameState.players[gameState.currentPlayer]} />}
        </section>
      )}
    </main>
  );
};

export default MountainGoat;

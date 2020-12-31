import React, { useState } from "react";

import "./goat.css";

const defaultGameState = {
  players: [],
  mountainPeaks: {
    5: {
      value: 5,
      size: 4,
      points: 10,
      goats: {},
    },
    6: {
      value: 6,
      size: 4,
      points: 9,
      goats: {},
    },
    7: {
      value: 7,
      size: 3,
      points: 8,
      goats: {},
    },
    8: {
      value: 8,
      size: 3,
      points: 7,
      goats: {},
    },
    9: {
      value: 9,
      size: 2,
      points: 6,
      goats: {},
    },
    10: {
      value: 10,
      size: 2,
      points: 5,
      goats: {},
    },
  },
  setup: {
    maxPlayers: 4,
    diceRolls: 4,
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

        {blankPlayerName && (
          <label className="error-text">Please enter player name</label>
        )}
        {dupeName && <label className="error-text">Name already taken</label>}
      </div>
    );
  };

  const PlayerTurn = ({ player }) => {
    const peakValues = Object.keys(defaultGameState.mountainPeaks);
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
        if (peakValues.includes(sum.toString())) {
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
              return (
                <div key={diceKey}>
                  <input
                    type="checkbox"
                    value={diceKey}
                    name={diceKey}
                    id={diceKey}
                    disabled={!!currentTurn.rolls[diceKey].staged}
                    checked={!!currentTurn.rolls[diceKey].checked}
                    onChange={(e) => {}}
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
                    {diceKey} {"->"} {currentTurn.rolls[diceKey].value}
                  </label>
                </div>
              );
            })}
            {/* show popup if all dice not used before submitting */}
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
              Use selected
            </button>
            {!!currentTurn.stagedRolls.length && (
              <section>
                <h4>Here are the grouped rolls</h4>
                <div className="current-grouped-rolls">
                  {currentTurn.stagedRolls.map((stage, idx) => {
                    const total = stage.reduce(
                      (acc, current) => acc + currentTurn.rolls[current].value,
                      0
                    );
                    const peakValues = Object.keys(gameState.mountainPeaks);

                    return (
                      <div key={idx} className="grouped-roll">
                        {stage.map((stagedRoll) => (
                          <div key={stagedRoll}>
                            {stagedRoll} {"->"}{" "}
                            {currentTurn.rolls[stagedRoll].value}
                          </div>
                        ))}
                        <label>Total: {total}</label>
                        {!peakValues.includes(total.toString()) && (
                          <label
                            className="error-text"
                            style={{ display: "block" }}
                          >
                            This doesn't match a peak!
                          </label>
                        )}
                        <button
                          style={{ display: "block" }}
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
                          Remove
                        </button>
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={() => {
                    const workingMountains = JSON.parse(
                      JSON.stringify(gameState.mountainPeaks)
                    );

                    currentTurn.stagedRolls.forEach((stage) => {
                      const total = stage.reduce(
                        (acc, current) =>
                          acc + currentTurn.rolls[current].value,
                        0
                      );

                      if (
                        Object.keys(defaultGameState.mountainPeaks).includes(
                          total.toString()
                        )
                      ) {
                        const currentPlayerName = gameState.players.find(
                          (player) => player.number === currentTurn.playerNumber
                        ).name;
                        const { goats } = workingMountains[total];
                        let currentPosition = -1;
                        Object.keys(goats).forEach((key) => {
                          if (goats[key].includes(currentPlayerName)) {
                            currentPosition = parseInt(key);
                          }
                        });

                        goats[currentPosition] = goats[currentPosition].filter(
                          (playerName) => playerName !== currentPlayerName
                        );
                        goats[currentPosition + 1] = [
                          ...goats[currentPosition + 1],
                          currentPlayerName,
                        ];

                        workingMountains[total].goats = goats;
                      }
                    });

                    let nextPlayer = (gameState.currentPlayer += 1);
                    if (nextPlayer > gameState.players.length - 1) {
                      nextPlayer = 0;
                    }

                    setGameState({
                      ...gameState,
                      mountainPeaks: workingMountains,
                      currentPlayer: nextPlayer,
                    });
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

  const getGoatsByPeak = (peak, position) =>
    gameState.mountainPeaks[peak].goats[position].join(", ");

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
          <li>game rules: double 1 rolled (chose any number)</li>
          <li>
          add points when moving to the top, remove exisiting goats at top
          </li>

          <li>style the shit out of it</li>
          <li>pressing enter in add player input, adds player</li>
          <li>cool animation for dice roll?</li>
          <li>goat noise when goat moves</li>
          <li>create history log of all moves that happened in the game</li>
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
            onClick={() => {
              const workingMountains = JSON.parse(
                JSON.stringify(gameState.mountainPeaks)
              );

              Object.keys(workingMountains).forEach((peak) => {
                const defaultGoatState = {
                  0: gameState.players.map((player) => player.name),
                };
                for (
                  let peakSize = 1;
                  peakSize <= workingMountains[peak].size;
                  peakSize++
                ) {
                  defaultGoatState[peakSize] = [];
                }
                workingMountains[peak] = {
                  ...workingMountains[peak],
                  goats: defaultGoatState,
                };
              });

              setGameState({
                ...gameState,
                gameStarted: true,
                currentPlayer: 0,
                mountainPeaks: workingMountains,
              });
            }}
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
          <div className="game-board">
            <div className="peak">
              <h4>5</h4>
              <div>Points tokens left: {gameState.mountainPeaks[5].points}</div>
              <div className="peak-point">{getGoatsByPeak(5, 4)}</div>
              <div className="peak-point">{getGoatsByPeak(5, 3)}</div>
              <div className="peak-point">{getGoatsByPeak(5, 2)}</div>
              <div className="peak-point">{getGoatsByPeak(5, 1)}</div>
              <div className="peak-point peak-zero">{getGoatsByPeak(5, 0)}</div>
            </div>
            <div className="peak">
              <h4>6</h4>
              <div>Points tokens left: {gameState.mountainPeaks[6].points}</div>
              <div className="peak-point">{getGoatsByPeak(6, 4)}</div>
              <div className="peak-point">{getGoatsByPeak(6, 3)}</div>
              <div className="peak-point">{getGoatsByPeak(6, 2)}</div>
              <div className="peak-point">{getGoatsByPeak(6, 1)}</div>
              <div className="peak-point peak-zero">{getGoatsByPeak(6, 0)}</div>
            </div>
            <div className="peak">
              <h4>7</h4>
              <div>Points tokens left: {gameState.mountainPeaks[7].points}</div>
              <div className="peak-point">{getGoatsByPeak(7, 3)}</div>
              <div className="peak-point">{getGoatsByPeak(7, 2)}</div>
              <div className="peak-point">{getGoatsByPeak(7, 1)}</div>
              <div className="peak-point peak-zero">{getGoatsByPeak(7, 0)}</div>
            </div>
            <div className="peak">
              <h4>8</h4>
              <div>Points tokens left: {gameState.mountainPeaks[8].points}</div>
              <div className="peak-point">{getGoatsByPeak(8, 3)}</div>
              <div className="peak-point">{getGoatsByPeak(8, 2)}</div>
              <div className="peak-point">{getGoatsByPeak(8, 1)}</div>
              <div className="peak-point peak-zero">{getGoatsByPeak(8, 0)}</div>
            </div>
            <div className="peak">
              <h4>9</h4>
              <div>Points tokens left: {gameState.mountainPeaks[9].points}</div>
              <div className="peak-point">{getGoatsByPeak(9, 2)}</div>
              <div className="peak-point">{getGoatsByPeak(9, 1)}</div>
              <div className="peak-point peak-zero">{getGoatsByPeak(9, 0)}</div>
            </div>
            <div className="peak">
              <h4>10</h4>
              <div>
                Points tokens left: {gameState.mountainPeaks[10].points}
              </div>
              <div className="peak-point">{getGoatsByPeak(10, 2)}</div>
              <div className="peak-point">{getGoatsByPeak(10, 1)}</div>
              <div className="peak-point peak-zero">
                {getGoatsByPeak(10, 0)}
              </div>
            </div>
          </div>

          {<PlayerTurn player={gameState.players[gameState.currentPlayer]} />}
        </section>
      )}
    </main>
  );
};

export default MountainGoat;

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
  bonusPoints: [15, 12, 9, 6],
  setup: {
    maxPlayers: 4,
    diceRolls: 4,
  },
  winConditions: {
    peaksEmpty: 3,
  },
  gameStarted: false,
  currentPlayer: -1,
  showRules: true,
  history: [],
  showHistory: false,
  gameFinished: false,
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
        peaksSummited: { 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0 },
      };

      if (!blankPlayerName && !dupeName) {
        setGameState({
          ...gameState,
          players: [...gameState.players, newPlayer],
          history: [...gameState.history, `${playerName} has joined`],
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
        <button
          className="add-new-player"
          disabled={blankPlayerName || dupeName}
          onClick={handleOnClick}
        >
          Add new player
        </button>

        {blankPlayerName && (
          <label className="error-text">Please enter player name</label>
        )}
        {dupeName && <label className="error-text">Name already taken</label>}
      </div>
    );
  };

  const PlayerTurn = ({ player, gameState, setGameState }) => {
    const peakValues = Object.keys(gameState.mountainPeaks);
    const [currentTurn, setCurrentTurn] = useState({
      playerNumber: player.number,
      rolls: {},
      showOutcomes: false,
      stagedRolls: [],
      toBeStaged: [],
    });

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

      return (
        <section className="possible-outcomes">
          {Object.keys(allCombos).map((peak) => (
            <div key={peak} className="dice-combo">
              <h4>{peak}</h4>
              {!allCombos[peak].length && <div>No matches</div>}
              {!!allCombos[peak].length && (
                <>
                  <div>Select:</div>
                  {allCombos[peak].map((combos) => (
                    <div className="dice-combo-match" key={combos.join(",")}>
                      {combos.join(" & ")}
                    </div>
                  ))}
                </>
              )}
            </div>
          ))}
        </section>
      );
    };

    return (
      <>
        <h3 className="current-player-name">Current Player: {player.name}</h3>
        {Object.keys(currentTurn.rolls).length === 0 && (
          <section className="roll-the-dice">
            <button
              onClick={() => {
                const rolls = { d1: {}, d2: {}, d3: {}, d4: {} };
                for (
                  let rollNum = 0;
                  rollNum < gameState.setup.diceRolls;
                  rollNum++
                ) {
                  rolls[`d${rollNum + 1}`] = {
                    value: rollTheDice(),
                    staged: false,
                    checked: false,
                  };
                }
                setCurrentTurn({ ...currentTurn, rolls });

                // TODO - figure this out why I can't send two state actions
                // probably need to roll up `currentTurn` into overall `gameState`
                // this will also
                // -------------------------------------------------------------

                // setGameState(() => ({
                //   ...gameState,
                //   history: [
                //     ...gameState.history,
                //     `${player.name} rolled ${Object.keys(rolls)
                //       .map((rollKey) => rolls[rollKey].value)
                //       .join(", ")}`,
                //   ],
                // }));
              }}
            >
              Roll {gameState.setup.diceRolls} dice
            </button>
          </section>
        )}

        {!!Object.keys(currentTurn.rolls).length && (
          <>
            <h3>Dice Rolls</h3>
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
              <section className="player-turn">
                <h4>Here are your grouped rolls</h4>
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

                <section className="finish-turn">
                  <button
                    onClick={() => {
                      const workingMountains = JSON.parse(
                        JSON.stringify(gameState.mountainPeaks)
                      );
                      const currentPlayer = gameState.players.find(
                        (player) => player.number === currentTurn.playerNumber
                      );
                      const turnHistory = [];

                      currentTurn.stagedRolls.forEach((stage) => {
                        const total = stage.reduce(
                          (acc, current) =>
                            acc + currentTurn.rolls[current].value,
                          0
                        );

                        if (
                          Object.keys(gameState.mountainPeaks).includes(
                            total.toString()
                          )
                        ) {
                          const { goats, size } = workingMountains[total];
                          let currentPosition = -1;
                          Object.keys(goats).forEach((key) => {
                            if (goats[key].includes(currentPlayer.name)) {
                              currentPosition = parseInt(key);
                            }
                          });

                          if (currentPosition === size) {
                            // add points when retaining summit
                            if (workingMountains[total].points > 0) {
                              workingMountains[total].points -= 1;
                              currentPlayer.totalPoints += total;
                              currentPlayer.peaksSummited[total] += 1;
                              turnHistory.push(
                                `${currentPlayer.name} scored ${total} points from staying at the summit`
                              );
                            }
                            // else no more points at the top of this moutain
                          } else {
                            // remove goat from current position
                            goats[currentPosition] = goats[
                              currentPosition
                            ].filter(
                              (playerName) => playerName !== currentPlayer.name
                            );

                            if (
                              currentPosition + 1 === size &&
                              goats[currentPosition + 1].length > 0
                            ) {
                              turnHistory.push(
                                `${
                                  goats[currentPosition + 1]
                                } was overthrown by ${
                                  currentPlayer.name
                                } on peak ${total}`
                              );
                              //overthrow current goat at summit
                              goats[0] = goats[0].concat(
                                goats[currentPosition + 1]
                              );
                              goats[currentPosition + 1] = [];
                            }

                            // move goat up one level
                            goats[currentPosition + 1] = [
                              ...goats[currentPosition + 1],
                              currentPlayer.name,
                            ];

                            turnHistory.push(
                              `${currentPlayer.name} moved up peak ${total}`
                            );

                            workingMountains[total].goats = goats;

                            if (currentPosition + 1 === size) {
                              if (workingMountains[total].points > 0) {
                                // add points when moving to summit
                                workingMountains[total].points -= 1;
                                currentPlayer.totalPoints += total;
                                currentPlayer.peaksSummited[total] += 1;
                                turnHistory.push(
                                  `${currentPlayer.name} scored ${total} points from reaching the summit of peak ${total}`
                                );
                              }
                              // else no more points left to give out
                            }
                          }
                        }
                      });

                      let nextPlayer = (gameState.currentPlayer += 1);
                      if (nextPlayer > gameState.players.length - 1) {
                        nextPlayer = 0;
                      }
                      const workingPlayers = JSON.parse(
                        JSON.stringify(gameState.players)
                      );

                      const currentPlayerIdx = workingPlayers.findIndex(
                        (p) => p.number === currentPlayer.number
                      );

                      workingPlayers[currentPlayerIdx] = currentPlayer;

                      turnHistory.push(
                        `${currentPlayer.name} finished turn`,
                        `${
                          gameState.players.find(
                            (player) => player.number === nextPlayer + 1
                          ).name
                        } is starting their turn`
                      );

                      const peaksOutOfPoints = Object.keys(
                        workingMountains
                      ).reduce((acc, curr) => {
                        return workingMountains[curr].points <= 0
                          ? acc + 1
                          : acc;
                      }, 0);

                      const allBonusCheck = (currentSummit) =>
                        currentSummit >= 1 ||
                        currentSummit >= 2 ||
                        currentSummit >= 3 ||
                        currentSummit >= 4;

                      const getsBonus = Object.values(
                        currentPlayer.peaksSummited
                      ).every(allBonusCheck);

                      const workingBonusPoints = gameState.bonusPoints;
                      if (getsBonus) {
                        currentPlayer.totalPoints += workingBonusPoints[0];
                        turnHistory.push(
                          `${currentPlayer.name} just scored ${workingBonusPoints[0]} bonus points!`
                        );
                        workingBonusPoints.shift();
                      }

                      const gameFinished =
                        peaksOutOfPoints >=
                          gameState.winConditions.peaksEmpty ||
                        workingBonusPoints.length === 0;

                      if (gameFinished) {
                        const { name, totalPoints } = orderedPlayers()[0];
                        turnHistory.push("Game Finished!");
                        debugger;
                        turnHistory.push(
                          `Congrats ${name} with ${totalPoints} points!`
                        );
                      }
                      setGameState({
                        ...gameState,
                        players: workingPlayers,
                        mountainPeaks: workingMountains,
                        currentPlayer: nextPlayer,
                        history: gameState.history.concat(turnHistory),
                        bonusPoints: workingBonusPoints,
                        gameFinished,
                      });
                    }}
                  >
                    Finish turn
                  </button>
                </section>
              </section>
            )}
            {!currentTurn.showOutcomes && (
              <div>
                <hr />

                <button
                  onClick={() => {
                    setCurrentTurn({ ...currentTurn, showOutcomes: true });
                  }}
                >
                  Show All Possible Combinations
                </button>
              </div>
            )}
            {currentTurn.showOutcomes && (
              <>
                <hr />
                <h3>Possible Groupings</h3>
                <button
                  onClick={() => {
                    setCurrentTurn({ ...currentTurn, showOutcomes: false });
                  }}
                >
                  Hide Possibilities
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

  const orderedPlayers = () =>
    gameState.players.sort((curr, next) => {
      if (curr.totalPoints > next.totalPoints) {
        return -1;
      } else if (curr.totalPoints <= next.totalPoints) {
        return 1;
      }
      return 0;
    });

  return (
    <main>
      <h2>Mountain Goat Game</h2>
      <section>
        This is my interpretation of{" "}
        <a
          href="https://www.boardgametables.com/products/gps-sequoia-and-mountain-goats"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mountain Goats by Board Game Tables
        </a>
      </section>
      {/*
      <section>
        TODO:
        <ul>
          <li>game rules: double 1 rolled (chose any number)</li>
          <li>style the shit out of it</li>
          <li>pressing enter in add player input, adds player</li>
          <li>cool animation for dice roll?</li>
          <li>goat noise when goat moves</li>
          <li>reset game button</li>
        </ul>
      </section> */}
      <section>
        <h3>
          Rules
          <button
            className="toggle-rules"
            onClick={() => {
              setGameState({
                ...gameState,
                showRules: !gameState.showRules,
              });
            }}
          >
            {gameState.showRules ? "Hide" : "Show"} Rules
          </button>
        </h3>
        {gameState.showRules && (
          <>
            <ul>
              <li>
                You and up to {gameState.setup.maxPlayers - 1} friends can join
                to play locally
              </li>
              <li>
                On your turn, you will roll {gameState.setup.diceRolls} dice
              </li>
              <li>
                You can then choose combinations of dice that add up to mountain
                peaks (5 through 10)
              </li>
              <li>You do not have to use all the dice on you turn</li>

              <li>
                Points will be earned when reaching the summit of the mountain
                or when rolling that peak value while currently holding the
                summit
              </li>
              <li>
                If there is an opposing goat at the summit when you are reaching
                the summit, the opposing goat will be sent to the base of the
                peak
              </li>
            </ul>
            <h3>Game End</h3>

            <ul>
              <li>
                When {gameState.winConditions.peaksEmpty} of the peak summits
                have no point tokens left
              </li>
              <li>When all 4 of the bonus tokens are claimed </li>
              {/* still TODO */}
              <li>The goat with the most points, wins!</li>
            </ul>
          </>
        )}
        <hr />
      </section>

      {gameState.gameStarted && (
        <section className="game-reset">
          <button
            onClick={() => {
              setGameState({ ...defaultGameState });
            }}
          >
            Reset Game!
          </button>
        </section>
      )}

      {!!gameState.history.length && (
        <section>
          <h3>
            Game Log
            <button
              className="toggle-rules"
              onClick={() => {
                setGameState({
                  ...gameState,
                  showHistory: !gameState.showHistory,
                });
              }}
            >
              {gameState.showHistory ? "Hide" : "Show"} Log
            </button>
          </h3>

          {gameState.showHistory && (
            <ul>
              {gameState.history.map((history, idx) => (
                <li key={idx}>{history}</li>
              ))}
            </ul>
          )}
        </section>
      )}

      {!gameState.gameStarted && (
        <section>
          <h3>New Game</h3>

          <AddPlayer />
        </section>
      )}

      {!!gameState.players.length && (
        <>
          <h3 style={{ textAlign: "center" }}>Players</h3>
          <div className="players-area">
            {gameState.players.map((player) => (
              <div key={player.name} className="player">
                <h4>Goat {player.name}</h4>
                <span>Points: {player.totalPoints}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {!gameState.gameStarted && gameState.players.length > 1 && (
        <section className="start-game">
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
                history: [...gameState.history, "Game Started"],
              });
            }}
          >
            Start the game!
          </button>
        </section>
      )}

      {gameState.gameStarted && (
        <section>
          <h3 style={{ textAlign: "center" }}>Bonus Points</h3>
          <div className="bonus-points">
            <div>
              Bonus points can be claimed by reaching or maintaining the summit
              of all the peaks. This can be claimed multiple times.
            </div>
            <div className="bonus-points-available">
              {gameState.bonusPoints.map((bonusPoint) => (
                <h3 key={bonusPoint}>{bonusPoint}</h3>
              ))}
            </div>
          </div>
          <h3 style={{ textAlign: "center" }}>Game Board</h3>
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

          {!gameState.gameFinished && (
            <PlayerTurn
              player={gameState.players[gameState.currentPlayer]}
              gameState={gameState}
              setGameState={setGameState}
            />
          )}
          {gameState.gameFinished && (
            <section className="game-finished">
              <h2>Game Finished</h2>
              <ol>
                {orderedPlayers().map((player) => (
                  <li key={player.number}>
                    {player.name}: {player.totalPoints} points
                  </li>
                ))}
              </ol>
              <div>
                If you liked this game, please consider supporting the creators
                by{" "}
                <a
                  href="https://www.boardgametables.com/products/gps-sequoia-and-mountain-goats"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  purchasing Mountain Goats on Board Game Tables
                </a>
              </div>
              <button
                onClick={() => {
                  setGameState({ ...defaultGameState });
                }}
              >
                Play Again!
              </button>
            </section>
          )}
        </section>
      )}
    </main>
  );
};

export default MountainGoat;

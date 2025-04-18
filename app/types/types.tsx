export type Move = 'jab' | 'haymaker' | 'counter' | 'block';

export class Player {
  name: string;
  health: number;

  constructor(name: string, health: number = 10) {
    this.name = name;
    this.health = health;
  }

  performMove(opponent: Player, move: Move, opponentMove: Move): void {
    const moveEffects = moves[move];
    moveEffects
      ? moveEffects(this, opponent, opponentMove)
      : console.log(`Invalid move: ${move}`);
  }
}

export const moves: Record<Move, (player: Player, opponent: Player, opponentMove: Move) => void> = {
  jab: (player, opponent, opponentMove) =>
    opponentMove === 'block'
      ? console.log(`${player.name}'s jab was blocked by ${opponent.name}!`)
      : ((opponent.health -= 1),
        console.log(`${player.name} used jab! ${opponent.name} takes 1 damage.`)),

  haymaker: (player, opponent, opponentMove) =>
    opponentMove === 'counter'
      ? ((player.health -= 3),
        console.log(
          `${player.name} used haymaker, but ${opponent.name} countered! ${player.name} takes 3 damage.`
        ))
      : opponentMove === 'block'
      ? ((opponent.health -= 1),
        console.log(
          `${player.name} used haymaker, but ${opponent.name} blocked! ${opponent.name} takes 1 damage.`
        ))
      : ((opponent.health -= 3),
        console.log(`${player.name} used haymaker! ${opponent.name} takes 3 damage.`)),

  counter: (player, opponent, opponentMove) =>
    console.log(`${player.name} is ready to counter!`),

  block: (player, opponent, opponentMove) =>
    console.log(`${player.name} is blocking.`),
};
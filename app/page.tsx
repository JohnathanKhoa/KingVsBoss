import { moves, Player, Move } from "./types/types";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

async function DecideMove(a: Player, b: Player): Promise<Move> {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    store: true,
    messages: [{
      role: "user",
      content: `You are player ${a.name} in a turn-based game. You have ${a.health} health left. Your opponent, ${b.name}, has ${b.health} health left. From ${moves} respond with only one word, one of the following: 'jab', 'haymaker', 'counter', or 'block'.`
    }],
    max_tokens: 2
  })

  const move = completion.choices[0].message.content?.trim()
  return move && move in moves ? (move as Move) : (() => { throw new Error(`Invalid move received: ${move}`) })()
}

export default async function Home() {
  const player1 = new Player("King");
  const player2 = new Player("Boss");
  while (player1.health > 0 && player2.health > 0) {
    console.log(
      `[${player1.name} HP:${player1.health}, ${player2.name} HP:${player2.health}]`
    );
    const player1Move = await DecideMove(player1, player2);
    const player2Move = await DecideMove(player2, player1);
    player1.performMove(player2, player1Move, player2Move);
    player2.performMove(player1, player2Move, player1Move);
  }
  const result =
    player1.health <= 0 && player2.health <= 0
      ? "It's a tie!"
      : player1.health <= 0
      ? `${player2.name} wins!`
      : `${player1.name} wins!`;
    console.log(result);

  return (
    <>
      <section>
        <h1>Fight</h1>
        <p>{result}</p>
        <p>{`${player1.name} HP: ${player1.health}`}</p>
        <p>{`${player2.name} HP: ${player2.health}`}</p>
      </section>
    </>
  );
}

King vs. Boss
A turn-based fight between two TypeScript functions 
Creativity factor: Choice reasoning with OpenAI

Players are initialized with 10 health and have 4 moves:
Jab - Opponent takes 1 damage.
Haymaker - Opponent takes 3 Damage.
Counter - Will stop Haymaker and redirect 3 damage to the Opponent.
Block - Will stop Jab and reduce damage to 0. Partially stops Haymaker, reducing damage to 1.

Players are controlled by OpenAI’s ‘gpt-40-mini’. Reasoning models like o3 and o4-mini are LLMs trained with reinforcement learning to perform reasoning. Reasoning models think before they answer, producing a long internal chain of thought before responding to the user. Reasoning models excel in complex problem solving, coding, scientific reasoning, and multi-step planning for agentic workflows. 

Fight turns will perform autonomously in a loop until at least one player reaches 0 health.

TypeScript object and functions fundamentals
Classes, Constructors, Types, Records, Async, Promise, Stream, Error handling,Tertiary Conditionals

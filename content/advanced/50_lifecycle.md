---
title: Lifecycle Events
---

### `xelly:terminate`

Emitted on the game `Engine` _by your game_ when the game has reached a terminal
state &mdash; such as a win or loss state.

```typescript
    ...
    // always emit 'xelly:terminate' when the game is over, win or lose
    if (isGameWon) {
        showMessagePanel('You win!');
        engine.emit('xelly:terminate');
    } else if (isGameLost) {
        showMessagePanel('You lose!');
        engine.emit('xelly:terminate');
    }
    ...
```

:::warning
If your game is a turn-based or realtime game, **you must emit this event** when the
game reaches a win or loss state!
It's how the [xelly.games](https://xelly.games)
platform knows when to enable certain controls that allow your user to replay the game, for example.
:::

### `xelly:enter`

Emitted on the game `Engine` _by the platform_ when the user first clicks on the game in their feed.

In the [breakout example game](https://xelly.games/game/2043d642-a556-480e-be5a-8541f8fc147a) 
this is used to start the paddle moving when the user enters the game (i.e., by initially tapping or clicking it) 
for the first time
([source here](https://github.com/xelly-games/game-examples/blob/40db59eff6cd44e0f35ceb8226c896b24868f86d/breakout/src/main.ts#L48)):

```typescript
    ...
    engine.once('xelly:enter', ((coords: GlobalCoordinates) => {
        if (coords.worldPos.x < engine.drawWidth / 2) {
            ball.start('left');
        } else {
            ball.start('right');
        }
    }) as Handler<any>);
    ...
```

### `xelly:start`

Emitted on the game `Engine` _by the platform_ when the game has finished loading and
initializing. This event is not commonly used, so you can generally ignore it if you
don't have a good use for it.

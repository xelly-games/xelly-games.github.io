---
title: Images and Fonts
---

[As mentioned earlier](./sandboxed), your game is not able to make 
network requests. This means that it can't asynchronously load any 
resources, such as images, sprites, fonts, or libraries.

Any resources needed by your game must be bundled into the game's 
[build output file](../build-a-game/create-your-project.mdx#rollupconfigmjs),
`bundle.js`.

## Images &amp; Sprites

[ExcaliburJS](https://excaliburjs.com/) uses [`ImageSource`](https://excaliburjs.com/docs/imagesource) to 
represent and load images. To bundle an image resource into your game, you need to import it specially.

### base64 encode your image

* First, you need to encode the image as a **base64 string**. On a Mac or Linux machine,
for example, you can use the `base64` command:

```bash
$ base64 -i my-image.png
```

* This will output a base64 encoded string, which you can then copy into a
TypeScript-importable file:

```typescript title="my-image.svg.ts"
export default 'data:image/svg+xml;base64,<base64 encoded svg>';
```

:::warning
Make sure you use the correct **MIME type**! For example,
if you're importing a PNG instead of an SVG file, use:

``` typescript
export default 'data:image/png;base64,<base64 encoded png>';
```
:::

* Now we can import this file into our game and use it as a graphic on an `Actor`: 

```typescript title="main.ts"
import { ..., ImageSource, ... } from 'excalibur';
import myImage from './my-image.svg';

const myImageSource = new ImageSource(undoWhiteSvg);

const loadImgResources = () => {
    return Promise.all([myImageSource.load()]);
};

export const install: XellyInstallFunction
    = (context: XellyContext, engine: Engine) => {
    
    const desiredWidth = 50;

    loadImgResources().then(() => {
        const myActor = new Actor({
            anchor: Anchor.Zero,
            scale: vec(desiredWidth / sprite.width, desiredWidth / sprite.width)
        });
        myActor.graphics.use(myImageSource.toSprite());
        engine.add(myActor);
    });
    
}
```

## Spritesheets

We can create a [`SpriteSheet`](https://excaliburjs.com/docs/spritesheets) from 
an [`ImageSource`](https://excaliburjs.com/docs/imagesource):

```typescript
import { ..., ImageSource, SpriteSheet, ... } from 'excalibur';
import mySpriteSheet from './my-sprite-sheet.png';

const mySpriteSheetImageSource = new ImageSource(mySpriteSheet);

...

loadImgResources().then(() => {
    const sheet = SpriteSheet.fromImageSource(mySpriteSheetImageSource);
    // ...
};

...
```

## Fonts

```typescript
import { ..., Font, ... } from 'excalibur';
import myFont from './MyFont.woff';

const myFontFace = new FontFace('MyFont', `url(${myFont})`);

export const install: XellyInstallFunction
    = (context: XellyContext, engine: Engine) => {

    myFontFace.load().then((loaded) => {
        document.fonts.add(loaded);

        const myFont = new Font({
            color: Color.Purple,
            size: 14,
            family: 'MyFont',
            unit: FontUnit.Px
        });
        
        engine.add(new Label({
            text: "Hello, world!",
            font: myFont,
            pos: vec(
                (engine.drawWidth - messageDimensions.width) / 2,
                (engine.drawHeight - messageDimensions.height) / 2),
        }));
    });
}
```

## Third-party libraries

You can bundle third-party libraries with your game, as long as your final game
file isn't larger than the 300kb limit.

(For example, the example [sudoku game](https://github.com/xelly-games/game-examples/tree/main/sudoku-hi-res) uses the 
[@algorithm.ts/sudoku](https://www.npmjs.com/package/@algorithm.ts/sudoku) to generate
game puzzles.)

With our [rollup config](../build-a-game/create-your-project.mdx#rollupconfigmjs), 
any third-party libraries besides [ExcaliburJS](https://excaliburjs.com/) and
[xelly.js](https://github.com/xelly-games/xelly.js) (which are provided by the 
platform) will automatically bundle when you run `npm run build`.
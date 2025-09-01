---
sidebar_position: 2
---

# Create Your Project

Before starting any new creative project, we gotta "stretch our canvas", first.
For digital creators, as we know, this means setting up our project and build.

This is easy. You'll need to create an **empty directory** with just three files:

```
your-game-project/
    package.json
    rollup.config.mjs
    tsconfig.json
```

But first &mdash; if you don't already have Node with `npm` installed, make sure
you **[install it](https://nodejs.org/en/download/)** first.

Now, here are the three files you'll need at the root of your project:

## `package.json`

Write the followin file into the **root** of your project. The only 
thing you need to fill in is the `name` field:

```json title="package.json"
{
  "name": "<Your Game Name here>",
  "version": "1.0.0",
  "scripts": {
    "clean": "rm -rf dist dist/tsconfig.tsbuildinfo && echo 'cleaned!'",
    "build:tsc": "tsc --build --noEmit",
    "build:rollup": "rollup -c",
    "build": "npm run clean && npm run build:rollup",
    "watch": "rollup -c --watch"
  },
  "files": [],
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "excalibur": "~0.30.3",
    "@xelly/xelly.js": "1.0.0"
  },
  "devDependencies": {
    "@rollup/plugin-node-resolve": "^16.0.0",
    "@rollup/plugin-terser": "^0.4.4",
    "@rollup/plugin-typescript": "^12.1.2",
    "rollup": "^4.30.1",
    "tslib": "^2.8.1",
    "typescript": "~5.7.3"
  }
}
```

Then make sure you run `npm install` in your project directory.

### A Note on Dependencies

Note that we've started with two dependencies:

- `excalibur`, xelly games are built on top of [Excalibur](https://excaliburjs.com),
a performant and versatile JavaScript game engine.
- `@xelly/xelly.js` is the official SDK for xelly.games

:::tip
Both of these dependencies are required, but you can add other dependencies as
long as your final game (i.e., `bundle.js` file) is no larger than `300kb`.
:::

## `rollup.config.mjs`

This file is important. We use Rollup to bundle our game into _**a single output 
file**_ (`bundle.js`) that you will upload to **[xelly.games](https://xelly.games)** when you are
ready to post your game.

```js title="rollup.config.mjs"
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

// leave all of this exactly as-is
export default {
    input: 'src/main.ts',
    external: ['excalibur', '@xelly/xelly.js'],
    plugins: [typescript(), resolve()],
    output: {
        file: 'dist/bundle.js',
        format: 'iife',
        name: 'Game',
        globals: {
            'excalibur': 'Excal',
            '@xelly/xelly.js': 'Xelly'
        },
        plugins: [terser()]
    }
};
```

## `tsconfig.json`

```json title="tsconfig.json"
{
  "include": ["src/**/*"],
  "compilerOptions": {
    "outDir": "./dist",
    "target": "esnext",
    "module": "esnext",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}
```

Now we're ready to start coding our game!

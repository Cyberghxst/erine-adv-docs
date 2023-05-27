# Erine Advanced
An advanced OceanicJS-based command framework to create your Discord bots with ease.

## Install
`npm i erine@adv`

## Basic setup
```typescript
import { Erine } from 'erine';

const bot = new Erine({
    auth: 'Bot ' + 'BOT TOKEN HERE',
    ws: {
        intents: [
            'GUILDS',
            'GUILD_MESSAGES',
            'MESSAGE_CONTENT'
        ]
    },
    prefix: 'BOT PREFIX HERE'
});

bot.connect();
```

## JavaScript setup guide
This package can be used with JavaScript but babel is needed.

### Install the following package with this command
`npm install --save-dev @babel/plugin-proposal-decorators @babel/cli @babel/core @babel/preset-env``

### Create a new .babelrc file and paste the following config
```JSON
{
  "presets": ["@babel/preset-env"],
  "plugins": [
    ["@babel/plugin-proposal-decorators", {"legacy": true}],
    ["@babel/plugin-proposal-class-properties", {"loose": true}],
    ["@babel/plugin-proposal-private-property-in-object", {"loose": true}],
    ["@babel/plugin-proposal-private-methods", {"loose": true}]
  ]
}
```

### Add the following script to your package.json
```JSON
"build": "babel src -d dist"
```
"src" and "dist" depends on how you named your source and distribution folders respectively.
Run this script to transpile the JS src to a global-compatible one.

### Now run your distribution folder!

## Useful Links
- [Documentation](http://erineadv.munlai.me)
- [Support Server](https://discord.gg/PG7EFJQFWM)
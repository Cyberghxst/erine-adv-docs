# Erine
A powerful commands framework for discord.js

# Install
```
npm install erine
```

# Features
- Hybrid Commands
- Hybrid Groups
- Command Handler
- Events Handler
- Plugins
- Discord.py interface
- Prefix interpreter
- Context base class

# Example (Hybrid Command)
```js
const { HybridBuilder, ParamsBuilder } = require("erine");

const body = {
    data: new HybridBuilder()
    .setName('ping')
    .setAliases('pong')
    .setDescription('This works with ![ping|pong] and /ping'),
    params: new ParamsBuilder()
    .addMember({ name: 'myMember', description: 'The member', required: false }),
    async code(ctx) {
        await ctx.send({ content: `Pong! ${ctx.author.username}`, ephemeral: true })
    }
}

module.exports = { body } // important to be named 'body'
```

# Example (Hybrid Group)
```js
const { HybridGroup, ParamsBuilder, HybridBuilder } = require("erine");

const body = new HybridGroup()
.setName('parent')
.setDescription('This is the parent of all')
.addCommand({
    data: new HybridBuilder()
    .setName('child-one')
    .setDescription('This can be used as: !parent child-one or /parent child-one'),
    async code(ctx) {
        await ctx.send(`My parent is: ${ctx.parent.name}`)
    }
})
```
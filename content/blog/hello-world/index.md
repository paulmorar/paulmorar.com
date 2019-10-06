---
title: Hello World
date: "2015-05-01T22:12:03.284Z"
description: "Hello World"
---

This is my first post on my new fake blog! How exciting!
`Inline code`
I'm sure I'll write a lot more interesting things in the future.

```js{4,19}
function getName(user) {
  let name = user.name
  if (name === null) {
    throw new Error("A girl has no name")
  }
  return name
}

function makeFriends(user1, user2) {
  user1.friendNames.add(getName(user2))
  user2.friendNames.add(getName(user1))
}

const arya = { name: null }
const gendry = { name: "Gendry" }
try {
  makeFriends(arya, gendry)
} catch (err) {
  console.log("Oops, that didn't work out: ", err)
}
```

Oh, and here's a great quote from this Wikipedia on
[salted duck eggs](http://en.wikipedia.org/wiki/Salted_duck_egg).

> A salted duck egg is a Chinese preserved food product made by soaking duck
> eggs in brine, or packing each egg in damp, salted charcoal. In Asian
> supermarkets, these eggs are sometimes sold covered in a thick layer of salted
> charcoal paste. The eggs may also be sold with the salted paste removed,
> wrapped in plastic, and vacuum packed. From the salt curing process, the
> salted duck eggs have a briny aroma, a gelatin-like egg white and a
> firm-textured, round yolk that is bright orange-red in color.

![Chinese Salty Egg](./salty_egg.jpg)

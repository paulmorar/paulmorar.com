---
title: Template literals
date: "2019-11-17T21:12:03.284Z"
description: "Template literals and how to use them"
---

Recently I had a bit too much time on my plate and started to reflect a little on my programming habits, trying to create a javascript feature timeline - understanding how the evolution of JavaScript made things easier for me, sort of like a before and after thing. While doing so, I realised that string interpolation used to be a really big thing, and we used to write our own functions in order to facilitate patterns. For reference, this is what I am talking about:

```js
const firstName = "Paul"
const lastName = "Morar"

const interpolatedString =
  "Welcome to " + firstName + " " + lastName + "'s blog.”;

// Welcome to Paul Morar's blog.
```

This is a simple example, but things can get way crazier, and in those cases it is quite easy to lose track of the concatenation operators. This is where our feature comes in to help. It declares our final string and provides placeholders for the values. For these placeholders the syntax used is `${exampleValue}`, where `exampleValue` can be either an expression or variable. And the code looks like this:

```js
const firstName = "Paul"
const lastName = "Morar"

const interpolatedString = `Welcome to ${firstName} ${lastName}’s blog.`

// Welcome to Paul Morar's blog.
```

Nowadays using **template literals**, also known as **template strings**, is a norm. Now, in my opinion the naming of the feature is currently misleading, as the word template indicates a repeatable action, which most often is not the case.

This feature is in my top three most used language features currently, and I use it many times during the day without even noticing(it made logging errors pain free 😅).

But enough about this. I would like to discuss about this features hidden gem. A really powerful thing that not many of us use right now. Some say it is a sub-feature, but the official [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) refers to it as _an advanced form of template literals_. This is called **tagged templates** and it looks like below.

```js
const firstName = "Paul"
const lastName = "Morar"

const format = (strings, ...values) => {
  console.log({ strings, values })
}

format`Welcome to ${firstName} ${lastName}’s blog.`

/*
{
  strings: ["Welcome to ", " ", "’s blog.”],
  values: ["Paul", "Morar"]
}
*/
```

As we can see, the first argument is an array of the string values from your literal, and the following ones are the placeholder values(instead of naming them specifically, I usually prefer to gather them into an array of their own - in this case, the `values` array). One thing to mention here is that the implementation of this feature guarantees that the length of the `strings` array is larger than the length of the `values` array, by 1, even if the strings values are empty strings.

```js
const x = "x"
const x = "y"

const format = (strings, ...values) => {
  console.log({ strings, values })
}

format`${x}${y}`

/*
{
  strings: ["", "", "”],
  values: ["x", "y"]
}
*/
```

## Use Cases

This feature has been around for quite a while now. Even so, I often see developers using it without really understanding the code, and looking at it as a layer of magic. I see this happening especially when using libraries like [styled-components](https://www.styled-components.com/) or [linaria](https://linaria.now.sh/) as both of them use this feature heavily.
The two libraries mentioned are used for writing CSS in/along-side JavaScript(mainly used with React). The underlying motivation is a blog post of its own. And styling a component looks like this:

```
const Button = styled.button`
  padding: 1em;
  background: papayawhip;
`;
```

Other use cases could be translation and internationalisation libraries, formatting currencies(we all know the pain around this), sanitising HTML or anything that involves parsing strings for that matter.

On that note, I was feeling like this feature is extremely powerful, and that is why I decided to write about it. Imagine that you write an interpreter as your tag function. You could essentially create your own programming language with your own syntax within the string template that you provide it with.

One great place where you could see this features most common use cases is the [common-tags library](https://github.com/declandewet/common-tags). There you will find all sorts of basic goodies that can inspire you and get you going on using this feature on your own projects.

View it live [here](https://awayfromhomeplanet.github.io/calculator)!

28 May: 
  A very basic calculator. So far it can only handle single-digit whole numbers and the four basic operators. This is the hardest project I've done so far! Took me really long to come up with a system for handling the operator precedence and being able to display the intermediate results while the user is keying in a long equation. Lots of head scratching and flowcharts but it was really fun!

2 June:
  Now supports numbers with multiple digits. This required a complete overhaul of the program's logic as all operations were now conducted within the enterOperator function (whereas before, * and / were done in the enterDigit function.) I rewrote the enterOperator code 5 times to make it as elegant (eh I hope) as possible, which was hard because there are so many combinations of conditions and ways of grouping them. Eventually I gave = its own function which cleaned things up a lot. This is a lot harder than I thought and it's just the beginning !!!
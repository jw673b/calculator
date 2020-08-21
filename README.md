This is my simple calculator app. It follows PEMDAS and will round any answers to a max of 4 decimal places.

The buttons are fully functional but if you prefer, there are keyboard inputs as well.

Add = shift + =
Subtract = -
Multiplication = x
Division = /
Exponent = shift + 6
Percent = %
Point = .
Equals = "return/enter"

Challenges:
Over the course of creating this calculator the primary challenge I faced was the use of regular expressions to match against strings. My method of storing the values to be used within the calculator was to use a text input and then parse the contained value for numbers and operators. Regex was a large part of being able to split the expression into defined pieces and then evaluate.

My second challenge was learning that there is a lot of effiency to be had in planning out the approach to tackle a larger problem. I've never tried to code anything with as many moving parts before and though there aren't really that many lines of code, I did need to use quite a few separate functions to get the calculator fully functional. I think this challenge would have been a lot simpler had I initially whiteboarded my approach and wrote some pseudocode on how I would start.

Lessons Learned:
I learned quite a bit about regular expressions through reading documentation and experimenting on regexr.com to see how I can match complex sets of characters. Moving forward I think I'll have a better understanding of regular expressions to begin with but I'll also have a resource that I can use as a sandbox to test different combinations.

In my next project, I would like to whiteboard and pseudocode before I start. I think by breaking down the problem into smaller pieces, I'll have a better understanding of how to tackle a large problem, and I'll also have a better idea of what steps should come first.
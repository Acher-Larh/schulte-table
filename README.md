# schulte-table
A web application that is used to practice speed reading.

Some inspiration:
https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.zl1_FBcfNLWBzMll3hB7ZwHaFu%26pid%3DApi&f=1
https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.O4WjtIp4hgql0TQR2TL7igHaNK%26pid%3DApi&f=1
https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.7aIbyv9VWT9UatMgIdJnGQHaKi%26pid%3DApi&f=1
https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.j_fFVY6gev0anOO3E1_kmAHaGg%26pid%3DApi&f=1

There can only be 1 table active at a time -> Right now if you click more than once on the "begin" button it creates another table right under the old one. What we want is to first send an alert for the user to chose wether restart the table or to cancel the action. 

TASKS LIST 

* MARKUP 
- [x] make the navbar
- [x] make the footer
- [x] make a stopwatch

* FUNCTIONALITY
- [x] add the complete-cell functionality -> change the "state" of a cell once it has been "clicked".
- [x] "There can only be 1 table active at a time.
- [x] Congratulate de user if he succesfully cleared the table + give the time it took.
- [ ] in the alert give the score and whether or not it's a record. 
- [x] remove the table after giving the score.
- [x] make it so that the counter doesn't go higher than the table size.
- [x] "wrong cell" will also include cells that weren't clicked in order( first: 1, then: 2, etc.)
- [x] separate event functions from pasive ones.(timer) -> instead of  that I only left 1 button and added linked all the functions inside it. The only way to restart the game is by finishing it.
- [ ] make a "pause" button -> It should "freeze" the table; to do that we are going to add a class to the table and style it with a "display: none" or "visibility: hidden".
- [ ] make it so that the user can click on the same key more than once. -> remove the state of wrong cell 2 seconds after its been applied.

* STYLING
- [x] style the schulte table
- [ ] make the animations for when a cell is clicked("correct" and "wrong" animations).
- [x] style the navbar
- [x] style the body: the title and buttons.
- [x] style the footer.

SOLUTIONS CENTER
- To add the "wrong cell" functionality, we are going to make a Set object of numbers from 1 to tableSize, and then compare them to find whether the number clicked has been repeted. -> didn't do it, the actual solution has better functionality.
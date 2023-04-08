# shades-quiz-me
Kyle Implementation of Shades Quiz Me Project

Your task for this take-home project is to build a lightweight web version of the “quiz me!” game that’s shown in the Figma file here. Your project should check these three boxes:
Basic functionality: As shown in the Figma, the user should be able to:
See an image and four answers (one being correct) per question
See a timer that shows them # seconds left
Select an answer and see whether it was right or wrong
If they don’t select an answer before time runs out, see the correct answer anyway
See how many points they got for a correct answer, depending on how much time was left
See how many total questions there are, and what their progress is
After they’ve finished all questions, see their total score
Click “play again” after the game is over
Accept structured data input: You can use a format of your choice (JSON, .csv file, etc.) – but fundamentally, the user will start by uploading a structured data file that specifies the following items (you should make an example file yourself using some shades content that you think would make a fun quiz).
For each question: image (hosted anywhere that’s easy), title, 3 incorrect answers, 1 correct answer
Game-level params: # of seconds per question, # of points per correct answer, # of bonus points per second of time left on clock when answer is submitted
Construct the game based on the input file:
When the user uploads the file to your site, the game should be constructed and initialized based on the data in the file.

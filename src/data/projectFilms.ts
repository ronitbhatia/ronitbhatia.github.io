// Rendered project explainers. Original demo and repository links stay in projects.ts.
interface ProjectFilm { file: string; seconds: number; transcript: string[] }

export const projectFilms: Partial<Record<number, ProjectFilm>> = {
  "1": {
    "file": "01-lenscraft",
    "seconds": 23,
    "transcript": [
      "Begin with one cash scenario and see how the balance changes.",
      "Ask about runway and the same numbers become a time horizon.",
      "Compare a lower spend. The layout follows the question; the math stays deterministic."
    ]
  },
  "2": {
    "file": "02-unclogai",
    "seconds": 23,
    "transcript": [
      "A task export shows work and status, but dependencies are easy to miss.",
      "Connect the tasks and one approval holds up three release channels.",
      "Graph analysis surfaces the bottleneck. A local model suggests the next move."
    ]
  },
  "3": {
    "file": "03-voyagelog",
    "seconds": 25,
    "transcript": [
      "Where did I take that photo?",
      "A place and one memory start a journal entry.",
      "The place name becomes a map pin without entering coordinates.",
      "Return to the pin to open the photo and revisit the trip."
    ]
  },
  "4": {
    "file": "04-startup-planner-agent",
    "seconds": 23,
    "transcript": [
      "Start with one sentence about a business you might build.",
      "Local agents turn it into a market outline, a SWOT review and an MVP plan.",
      "The result is a draft to test, not proof that customers will buy."
    ]
  },
  "5": {
    "file": "05-excellensight",
    "seconds": 23,
    "transcript": [
      "Three comments can describe the same frustration in different words.",
      "One encoder feeds two jobs: classifying trends and summarising feedback.",
      "A short report makes the pattern easier to discuss with a product team."
    ]
  },
  "6": {
    "file": "06-fraud-capstone",
    "seconds": 23,
    "transcript": [
      "Separate claims can hide a shared connection in plain sight.",
      "A shared shop is a lead to investigate, not evidence of fraud.",
      "The capstone weighed building link analysis against buying it."
    ]
  },
  "7": {
    "file": "07-taskify",
    "seconds": 23,
    "transcript": [
      "Start with the skills a task actually requires.",
      "A Transformer compares task language with team profiles.",
      "Ranked matches inform the manager’s choice."
    ]
  },
  "8": {
    "file": "08-gdelt-monitoring",
    "seconds": 23,
    "transcript": [
      "One logistics story becomes several related news reports.",
      "Embeddings group reports by meaning for local retrieval.",
      "A local language model turns retrieved evidence into a hypothesis."
    ]
  },
  "9": {
    "file": "09-esp32-rps",
    "seconds": 23,
    "transcript": [
      "A hand gesture is a vision problem on a very small computer.",
      "Shrink the camera frame to fit inference on the board.",
      "At 56% deployed accuracy, the prototype also shows the limit."
    ]
  },
  "10": {
    "file": "10-l-store",
    "seconds": 16,
    "transcript": [
      "Update requested: 12 to 18.",
      "Append a new version. Keep the base row.",
      "A pointer takes the read to 18.",
      "The value changed. The original row didn’t."
    ]
  },
  "11": {
    "file": "11-quivlo",
    "seconds": 16,
    "transcript": [
      "Mark a sentence worth remembering.",
      "Turn the passage into a question.",
      "Edit the question in your own words.",
      "You decide what enters your library."
    ]
  },
  "12": {
    "file": "12-treadwell",
    "seconds": 23,
    "transcript": [
      "A chair beside the route is not a reason to interrupt.",
      "Move the same chair into the walking path. Its relevance changes.",
      "Local inference on the Mac can trigger a brief warning through the phone."
    ]
  },
  "13": {
    "file": "13-syro",
    "seconds": 25,
    "transcript": [
      "How long have I been scrolling?",
      "Long sessions can pass unnoticed. Syro checks only the apps you select.",
      "A check-in invites you to name the moment. You can keep scrolling.",
      "Optional context becomes a private daily reflection, processed on your iPhone."
    ]
  }
};

function setupProblem(numOfPrisoners) {
  let prisoners = [...Array(numOfPrisoners).keys()];
  let boxes = knuthShuffle(prisoners);
  let mistake = false;
  let solved = false;

  return {
    prisoners,
    boxes,
    mistake,
    solved
  };
}

function prisonersAlgorithm(problem) {
  for (let p = 0; p < problem.prisoners.length; p++) {
    let guess = p;
    let found = false;
    for (
      let tries = Math.floor(problem.prisoners.length / 2);
      tries > 0;
      tries--
    ) {
      let box = problem.boxes[guess];
      if (box === problem.prisoners[p]) {
        found = true;
        //console.log("Prisoner " + p + " found his box!");
        break;
      } else {
        guess = box;
      }
    }
    if (!found) {
      problem.mistake = true;
      // console.log("Prisoner " + p + " failed!");
      break;
    }
  }
}

function checkSolution(problem) {
  if (!problem.mistake) {
    problem.solved = true;
  }

  if (problem.solved) {
    //console.log("The prisoners survived!");
    return "win";
  } else {
    // console.log("The prisoners were executed!");
    return "loss";
  }
}

function knuthShuffle(arr) {
  newArr = arr.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    randomIndex = Math.floor(Math.random() * (i + 1));
    temp = newArr[i];
    newArr[i] = newArr[randomIndex];
    newArr[randomIndex] = temp;
  }
  return newArr;
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}

function main() {
  let numOfPrisoners = 100;
  let problem = setupProblem(numOfPrisoners);
  prisonersAlgorithm(problem);

  return checkSolution(problem);
}

let runs = 1000;
let results = [];
for (let i = 0; i < runs; i++) {
  results.push(main());
}
let wins = results.filter((result) => result === "win").length;
let losses = results.filter((result) => result === "loss").length;
console.log("Wins: " + wins);
console.log("Losses: " + losses);
console.log("Win rate: " + wins / runs);

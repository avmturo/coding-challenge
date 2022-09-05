import { getResults } from ".";

const givenDivision = [
  {
    name: "Rockets",
    points: 64,
  },
  {
    name: "Cardinals",
    points: 77,
  },
  {
    name: "Bruisers",
    points: 51,
  },
  {
    name: "Renegades",
    points: 37,
  },
  {
    name: "Porpoises",
    points: 52,
  },
];

const divisionWithDuplicateNameInRelegatedAndPromoted = [
  {
    name: "Rockets",
    points: 64,
  },
  {
    name: "Bruisers",
    points: 77,
  },
  {
    name: "Bruisers",
    points: 51,
  },
  {
    name: "Renegades",
    points: 37,
  },
  {
    name: "Porpoises",
    points: 52,
  },
];

test("returns one team to promote and one team to relegate", () => {
  const resultString = `Promote:
Cardinals

Relegate:
Renegades`;

  expect(getResults(givenDivision, 1)).toBe(resultString);
});

test("returns two teams to promote and two teams to relegate", () => {
  const resultString = `Promote:
Cardinals
Rockets

Relegate:
Bruisers
Renegades`;

  expect(getResults(givenDivision, 2)).toBe(resultString);
});

test("returns notification string if n is greater than half the division size", () => {
  const resultString = 'Too many teams being relegated and promoted'

  expect(getResults(givenDivision, 3)).toBe(resultString);
});

test("returns notification string if there is overlap in the relegated and promoted teams", () => {
  const resultString = 'Overlap in relegated and promoted teams'

  expect(getResults(divisionWithDuplicateNameInRelegatedAndPromoted, 2)).toBe(resultString);
});

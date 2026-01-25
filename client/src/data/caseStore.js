export let caseStages = [
  {
    id: 1,
    title: "Case Filed",
    date: "2026-02-02",
    note: "Property dispute case filed in district court.",
  },
  {
    id: 2,
    title: "First Hearing",
    date: "2026-02-15",
    note: "Initial arguments to be presented.",
  },
];

export const addCaseStage = (stage) => {
  caseStages.push(stage);
};

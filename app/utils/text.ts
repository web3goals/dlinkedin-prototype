import {
  STATEMENT_SKILL_CTO,
  STATEMENT_SKILL_SOLIDITY,
  STATEMENT_SKILL_TYPESCRIPT,
} from "@/constants/statement";

export function statementSkillToText(skill: number) {
  if (skill === STATEMENT_SKILL_CTO) {
    return "CTO";
  }
  if (skill === STATEMENT_SKILL_SOLIDITY) {
    return "Solidity";
  }
  if (skill === STATEMENT_SKILL_TYPESCRIPT) {
    return "Typescript";
  }
  return "Unknown skill";
}

export function statementEvaluationToText(evaluation: number) {
  return `${evaluation} ⭐`;
}

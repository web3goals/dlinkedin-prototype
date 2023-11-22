import {
  STATEMENT_SKILL_CEO,
  STATEMENT_SKILL_CMO,
  STATEMENT_SKILL_CTO,
  STATEMENT_SKILL_DEVELOPER,
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
  if (skill === STATEMENT_SKILL_CEO) {
    return "CEO";
  }
  if (skill === STATEMENT_SKILL_CMO) {
    return "CMO";
  }
  if (skill === STATEMENT_SKILL_DEVELOPER) {
    return "Developer";
  }
  return "Unknown skill";
}

export function statementEvaluationToText(evaluation: number) {
  if (evaluation === 5) {
    return `${evaluation} 🔥`;
  }
  if (evaluation === 4) {
    return `${evaluation} 👍`;
  }
  if (evaluation === 3) {
    return `${evaluation} 😑`;
  }
  if (evaluation === 2) {
    return `${evaluation} 👎`;
  }
  if (evaluation === 1) {
    return `${evaluation} 😡`;
  }
  return `${evaluation} ⭐`;
}

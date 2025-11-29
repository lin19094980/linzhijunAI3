export interface CaseData {
  eventDescription: string;
  femaleName: string;
  femaleArgument: string;
  maleName: string;
  maleArgument: string;
}

export interface VerdictResult {
  analysis: string;
  femaleResponsibility: number;
  maleResponsibility: number;
  verdictSummary: string;
  winner: 'female' | 'male' | 'tie';
  advice: string;
}

export enum AppStep {
  INPUT = 'INPUT',
  LOADING = 'LOADING',
  RESULT = 'RESULT',
}

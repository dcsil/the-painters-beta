export type Actor = 'user' | 'system';

export type IconName =
  | 'upload'
  | 'check'
  | 'settings'
  | 'send'
  | 'database'
  | 'shield'
  | 'search'
  | 'dashboard'
  | 'chat'
  | 'bot'
  | 'monitor'
  | 'bell'
  | 'list'
  | 'files'
  | 'report'
  | 'user'
  | 'gear';

export interface DecisionBranch {
  label: string;
  outcome: string;
  isError?: boolean;
}

export interface Decision {
  label: string;
  branches: DecisionBranch[];
}

export interface WorkflowStep {
  actor: Actor;
  label: string;
  detail?: string;
  icon?: IconName;
  error?: string;
  decision?: Decision;
}

export interface WorkflowDiagramProps {
  title?: string;
  steps: WorkflowStep[];
}

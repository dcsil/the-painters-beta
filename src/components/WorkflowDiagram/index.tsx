import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import type {
  Actor,
  IconName,
  WorkflowDiagramProps,
  WorkflowStep,
} from './types';

export type { WorkflowStep, WorkflowDiagramProps } from './types';

type IconRenderer = () => React.ReactElement;

const ICONS: Record<IconName, IconRenderer> = {
  upload: () => (
    <>
      <path d="M12 3v12" strokeLinecap="round" />
      <path d="m7 8 5-5 5 5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" strokeLinecap="round" />
    </>
  ),
  check: () => (
    <path d="m5 12 4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
  ),
  settings: () => (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" />
    </>
  ),
  send: () => (
    <>
      <path d="m22 2-7 20-4-9-9-4Z" strokeLinejoin="round" />
      <path d="M22 2 11 13" strokeLinecap="round" />
    </>
  ),
  database: () => (
    <>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14a9 3 0 0 0 18 0V5" />
      <path d="M3 12a9 3 0 0 0 18 0" />
    </>
  ),
  shield: () => (
    <path
      d="M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6Z"
      strokeLinejoin="round"
    />
  ),
  search: () => (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4.3-4.3" strokeLinecap="round" />
    </>
  ),
  dashboard: () => (
    <>
      <rect x="3" y="3" width="7" height="9" rx="1" />
      <rect x="14" y="3" width="7" height="5" rx="1" />
      <rect x="14" y="12" width="7" height="9" rx="1" />
      <rect x="3" y="16" width="7" height="5" rx="1" />
    </>
  ),
  chat: () => (
    <path
      d="M21 12a8 8 0 0 1-11.8 7L3 21l2-6.2A8 8 0 1 1 21 12Z"
      strokeLinejoin="round"
    />
  ),
  bot: () => (
    <>
      <rect x="4" y="8" width="16" height="12" rx="2" />
      <path d="M12 4v4" strokeLinecap="round" />
      <circle cx="9" cy="14" r="1" />
      <circle cx="15" cy="14" r="1" />
    </>
  ),
  monitor: () => (
    <>
      <rect x="3" y="4" width="18" height="12" rx="1" />
      <path d="M8 20h8M12 16v4" strokeLinecap="round" />
      <path d="M7 10l2 2 2-3 2 4 2-2" strokeLinejoin="round" strokeLinecap="round" />
    </>
  ),
  bell: () => (
    <>
      <path d="M6 8a6 6 0 1 1 12 0c0 7 3 8 3 8H3s3-1 3-8" strokeLinejoin="round" />
      <path d="M10 21a2 2 0 0 0 4 0" strokeLinecap="round" />
    </>
  ),
  list: () => (
    <>
      <path d="M8 6h13M8 12h13M8 18h13" strokeLinecap="round" />
      <circle cx="4" cy="6" r="1" />
      <circle cx="4" cy="12" r="1" />
      <circle cx="4" cy="18" r="1" />
    </>
  ),
  files: () => (
    <>
      <path d="M9 3h7l4 4v12a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" strokeLinejoin="round" />
      <path d="M15 3v5h5" strokeLinejoin="round" />
      <path d="M4 8v11a2 2 0 0 0 2 2h9" strokeLinejoin="round" />
    </>
  ),
  report: () => (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1.5" />
      <path d="M8 8h8M8 12h8M8 16h5" strokeLinecap="round" />
    </>
  ),
  user: () => (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" strokeLinecap="round" />
    </>
  ),
  gear: () => (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" strokeLinecap="round" />
    </>
  ),
};

function Icon({ name }: { name: IconName }) {
  const render = ICONS[name];
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      {render()}
    </svg>
  );
}

function ConnectorArrow({ kind }: { kind: 'straight' | 'userToSystem' | 'systemToUser' }) {
  if (kind === 'straight') {
    return (
      <svg className={styles.arrow} viewBox="0 0 40 40" preserveAspectRatio="none">
        <line x1="20" y1="0" x2="20" y2="32" />
        <polygon points="20,40 16,32 24,32" />
      </svg>
    );
  }
  // Curved arrow from one lane to the other via the center column.
  const startX = kind === 'userToSystem' ? 0 : 100;
  const endX = kind === 'userToSystem' ? 100 : 0;
  const arrowX = endX;
  const arrowDir = kind === 'userToSystem' ? 1 : -1;
  return (
    <svg className={styles.arrow} viewBox="0 0 100 40" preserveAspectRatio="none">
      <path d={`M${startX},2 C50,2 50,36 ${endX},36`} />
      <polygon
        points={`${arrowX},40 ${arrowX - 4 * arrowDir},32 ${arrowX - 8 * arrowDir},36`}
      />
    </svg>
  );
}

function defaultIcon(step: WorkflowStep): IconName {
  if (step.icon) return step.icon;
  return step.actor === 'user' ? 'user' : 'gear';
}

function StepCard({ step, index }: { step: WorkflowStep; index: number }) {
  const isUser = step.actor === 'user';
  return (
    <div className={clsx(styles.card, isUser ? styles.cardUser : styles.cardSystem)}>
      <span className={styles.stepIndex} aria-hidden="true">
        {index + 1}
      </span>
      <span className={styles.iconBadge}>
        <Icon name={defaultIcon(step)} />
      </span>
      <div className={styles.cardBody}>
        <div className={styles.label}>{step.label}</div>
        {step.detail && <div className={styles.detail}>{step.detail}</div>}
        {step.error && <div className={styles.errorPill}>{step.error}</div>}
      </div>
    </div>
  );
}

function DecisionBlock({ decision }: { decision: NonNullable<WorkflowStep['decision']> }) {
  return (
    <div className={styles.decision}>
      <div className={styles.decisionHeader}>{decision.label}</div>
      <div className={styles.branches}>
        {decision.branches.map((branch, i) => (
          <div
            key={i}
            className={clsx(styles.branch, branch.isError && styles.branchError)}
          >
            <span className={styles.branchLabel}>{branch.label}</span>
            <span className={styles.branchOutcome}>{branch.outcome}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function WorkflowDiagram({ title, steps }: WorkflowDiagramProps) {
  return (
    <figure className={styles.diagram} role="group" aria-label={title ?? 'Workflow diagram'}>
      {title && <figcaption className={styles.title}>{title}</figcaption>}
      <div className={styles.lanes}>
        <div className={clsx(styles.laneHeader, styles.laneHeaderUser)}>User</div>
        <div className={styles.spacer} />
        <div className={clsx(styles.laneHeader, styles.laneHeaderSystem)}>System</div>

        {steps.map((step, i) => {
          const isUser = step.actor === 'user';
          const prev = steps[i - 1];
          const connector: 'straight' | 'userToSystem' | 'systemToUser' | null = !prev
            ? null
            : prev.actor === step.actor
              ? 'straight'
              : prev.actor === 'user'
                ? 'userToSystem'
                : 'systemToUser';

          return (
            <React.Fragment key={i}>
              {connector && (
                <div className={clsx(styles.row, isUser ? styles.rowUser : styles.rowSystem)}>
                  <div className={clsx(styles.cell, styles.cellEmpty, !isUser && styles.cellSystem, isUser && styles.cellUser)}>
                    {connector === 'straight' && isUser && <ConnectorArrow kind="straight" />}
                  </div>
                  <div className={styles.connector}>
                    {connector !== 'straight' && <ConnectorArrow kind={connector} />}
                  </div>
                  <div className={clsx(styles.cell, styles.cellEmpty, isUser && styles.cellUser, !isUser && styles.cellSystem)}>
                    {connector === 'straight' && !isUser && <ConnectorArrow kind="straight" />}
                  </div>
                </div>
              )}

              <div className={clsx(styles.row, isUser ? styles.rowUser : styles.rowSystem)}>
                <div className={clsx(styles.cell, isUser ? styles.cellUser : styles.cellSystem)}>
                  {isUser && <StepCard step={step} index={i} />}
                </div>
                <div className={clsx(styles.cell, styles.cellEmpty)} />
                <div className={clsx(styles.cell, isUser ? styles.cellUser : styles.cellSystem)}>
                  {!isUser && <StepCard step={step} index={i} />}
                </div>
              </div>

              {step.decision && <DecisionBlock decision={step.decision} />}
            </React.Fragment>
          );
        })}
      </div>
    </figure>
  );
}

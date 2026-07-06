import type { ReactNode } from 'react';

type WorkflowNode = {
  id: string;
  label: string;
};

type WorkflowProps = {
  nodes: WorkflowNode[];
  connections?: Array<[number, number]>; // optional explicit connections by node index
};

export function WorkflowSection({ nodes, connections }: WorkflowProps) {
  // If no explicit connections provided, assume linear order
  const conns = connections && connections.length > 0 ? connections : nodes.map((_, i) => (i < nodes.length - 1 ? [i, i + 1] as [number, number] : null)).filter(Boolean) as Array<[number, number]>;

  return (
    <section className="workflow-section">
      <div className="workflow-section__inner">
        {nodes.map((node, idx) => (
          <div key={node.id} className="workflow-node">
            <div className="workflow-node__dot" />
            <div className="workflow-node__body">
              <strong>{node.label}</strong>
            </div>
            {idx < nodes.length - 1 ? <div className="workflow-node__connector" aria-hidden /> : null}
          </div>
        ))}
      </div>
    </section>
  );
}

import { describe, it, expect } from 'vitest';
import { GraphNode, cloneGraph } from './clone-graph.js';

describe('cloneGraph', () => {
  it('dua node saling terhubung', () => {
    const a = new GraphNode(1);
    const b = new GraphNode(2);
    a.neighbors = [b];
    b.neighbors = [a];
    const c = cloneGraph(a);
    expect(c).not.toBe(a);
    expect(c.val).toBe(1);
    expect(c.neighbors[0].val).toBe(2);
    expect(c.neighbors[0].neighbors[0]).toBe(c);
  });
});

# Graph traversal

!!! danger "DRAFT"

    This page is a work in progress.

The core of contig extraction often involves sophisticated graph traversal algorithms. These algorithms aim to find paths through the graph that likely represent true genomic sequences.

a) Greedy Traversal: At each branching point, choose the highest-coverage edge. This simple approach can be effective but may lead to misassemblies in complex regions.
b) Depth-First Search (DFS): Explore paths deeply before backtracking. This can be effective for finding long contigs but may struggle with complex repeat structures.
c) Breadth-First Search (BFS): Explore all possible paths in parallel. This can be more thorough but is computationally intensive for large graphs.
d) Eulerian Path: Some assemblers attempt to find Eulerian paths (paths that visit every edge exactly once) in simplified subgraphs, which can be effective for certain genome structures.
e) Maximum Flow Algorithms: These can be used to find multiple paths through the graph simultaneously, potentially resolving some complex repeat structures.

<!-- REFERENCES -->

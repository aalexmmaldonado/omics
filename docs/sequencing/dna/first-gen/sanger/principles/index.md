# Controlled DNA synthesis

The development of Sanger sequencing was grounded in a deep understanding of DNA structure and replication mechanisms.
Frederick Sanger and his colleagues at the University of Cambridge approached the challenge of determining DNA sequences by considering how the natural process of DNA replication could be manipulated and observed.
The concept of controlled DNA synthesis was fundamental to Sanger's approach to DNA sequencing.
To understand this concept, it's crucial to consider the natural process of DNA replication and how Sanger proposed manipulating it for sequencing purposes.

## Reading DNA's Code

At the core of Sanger's work was a fundamental question: How can we determine the exact sequence of nucleotides in a DNA molecule?
This was not a trivial problem, as DNA molecules can be extremely long and are composed of just four types of nucleotides (A, T, G, C) repeated in a specific order.
To address this challenge, Sanger and his colleagues drew upon several key principles and concepts related to DNA structure and replication.

Understanding how DNA naturally replicates was crucial to Sanger's approach.
DNA polymerase enzymes read a template strand and create a complementary strand by adding nucleotides one by one.
This process is highly accurate and processive, meaning it can continue for long stretches of DNA without dissociating from the template.
The specific pairing of nucleotides (A with T, G with C) ensures the accuracy of replication and provides a mechanism for "reading" one strand by creating its complement.
This complementarity is fundamental to both natural DNA replication and Sanger sequencing.

Several challenges need to be overcome to develop a reliable sequencing method.
Genomic DNA can be millions of base pairs long, making developing a method to read such long sequences a significant challenge.
Additionally, the four DNA nucleotides are very similar in structure and chemical properties, making it difficult to distinguish between them directly.
The speed and processivity of DNA polymerase in natural systems also posed a challenge, as replication occurs too quickly and continuously to allow for easy observation of each nucleotide addition.
Furthermore, in natural systems, DNA replication continues until the end of the template is reached or specific termination signals are encountered.

## Terminating DNA replication

Sanger hypothesized that if DNA replication could be selectively terminated at specific points, the resulting fragments would reveal the sequence of the template DNA.
Here's how this idea works in practice:

1.  **Template Preparation**: Start with a single-stranded DNA template whose sequence you want to determine.
2.  **Primer Attachment**: Attach a short, known DNA sequence (primer) to the template.
    This provides a starting point for DNA synthesis.
3.  **Controlled Synthesis**: Allow DNA polymerase to begin synthesizing the complementary strand, but include in the reaction a small amount of modified nucleotides that, when incorporated, stop further synthesis.
4.  **Fragment Generation**: As synthesis proceeds, these modified nucleotides are occasionally incorporated instead of the normal nucleotides, causing the synthesis to stop at different points along the template.
5.  **Fragment Analysis**: By separating these fragments by size and determining which modified nucleotide caused each termination, you can deduce the sequence of the original template.

!!! quote "Terminating DNA replication with modified nucleotides"
    This model simplifies the complex process of DNA replication, omitting enzymes like DNA polymerase and other cellular factors. It aims to visualize the basic concept of complementary base pairing and the directionality of DNA synthesis.

    <div id="chain-termination-container"></div>
    <script src="./chain-termination.js"></script>

The key to this method is the generation of a set of DNA fragments that differ in length by single nucleotides.
Each fragment length corresponds to the position of a specific nucleotide in the sequence.
By determining the length of each fragment and which nucleotide it ends with, you can reconstruct the sequence of the original DNA template.

Sanger's brilliant insight was realizing that you don't need to observe the DNA synthesis process directly.
Instead, by cleverly controlling where the synthesis stops and then analyzing the results, you can indirectly determine the sequence.
This approach transformed the problem of reading a long, complex DNA molecule into a more manageable task of analyzing a collection of shorter DNA fragments.

To implement this concept, Sanger designed an experimental approach involving four separate reactions, each containing all four normal dNTPs but with a small amount of one type of ddNTP.
In each reaction, DNA fragments would be created that terminated at every occurrence of that specific nucleotide.
This approach allowed for the generation of a comprehensive set of fragments representing terminations at each nucleotide position in the template DNA.

### Dideoxynucleotides

The use of dideoxynucleotides (ddNTPs) as chain terminators was a critical insight in the development of the method.
These modified nucleotides lack the 3'-OH group necessary for DNA chain elongation.
Sanger proposed that by incorporating ddNTPs into the reaction mixture along with normal deoxynucleotides (dNTPs), DNA synthesis would occasionally terminate when a ddNTP was incorporated instead of a dNTP.
This controlled termination would produce a set of DNA fragments of various lengths, each ending at a specific nucleotide.

## Fragment separation

The separation and analysis of these DNA fragments presented another challenge in the development of the sequencing method. Sanger recognized that if these fragments could be separated based on their size, the pattern across all four reactions would reveal the original DNA sequence. This realization led to the incorporation of gel electrophoresis as a crucial component of the sequencing process. Gel electrophoresis allowed for the precise separation of DNA fragments based on their length, providing a visual representation of the sequence when the results from all four reactions were analyzed together.

## Nucleotide detection

Detection of the separated DNA fragments was initially achieved through radioactive labeling. Sanger's method involved incorporating radioactive nucleotides into the DNA fragments during synthesis, allowing for their visualization after gel electrophoresis. This approach provided the sensitivity needed to detect the relatively small amounts of DNA produced in the sequencing reactions. Later developments in the technique would replace radioactive labeling with fluorescent tags, enabling automation and increased throughput.

[^sanger1977dna]: Sanger, F., Nicklen, S., & Coulson, A. R. (1977). DNA sequencing with chain-terminating inhibitors. *Proceedings of the national academy of sciences, 74*(12), 5463-5467. doi: [10.1073/pnas.74.12.5463](https://doi.org/10.1073/pnas.74.12.5463)
[^shendure2008next]: Shendure, J., & Ji, H. (2008). Next-generation DNA sequencing. *Nature biotechnology, 26*(10), 1135-1145. doi: [10.1038/nbt1486](https://doi.org/10.1038/nbt1486)

[^shuhaib2023mastering]: Al-Shuhaib, M. B. S., & Hashim, H. O. (2023). Mastering DNA chromatogram analysis in Sanger sequencing for reliable clinical analysis. *J. Genet. Eng. Biotechnol., 21*(1), 115. doi: [10.1186/s43141-023-00587-6](https://doi.org/10.1186/s43141-023-00587-6)
[^lopez2021sanger]: Arteche-López, A., Ávila-Fernández, A., Romero, R., Riveiro-Álvarez, R., López-Martínez, M. A., Giménez-Pardo, A., ... & Ayuso, C. (2021). Sanger sequencing is no longer always necessary based on a single-center validation of 1109 NGS variants in 825 clinical exomes. *Scientific reports, 11*(1), 5697. doi: [10.1038/s41598-021-85182-w](https://doi.org/10.1038/s41598-021-85182-w)
[^cario2020sanger]: De Cario, R., Kura, A., Suraci, S., Magi, A., Volta, A., Marcucci, R., ... & Sticchi, E. (2020). Sanger validation of high-throughput sequencing in genetic diagnosis: Still the best practice?. *Frontiers in genetics, 11*, 592588. doi: [10.3389/fgene.2020.592588](https://doi.org/10.3389/fgene.2020.592588)
[^giani2020long]: Giani, A. M., Gallo, G. R., Gianfranceschi, L., & Formenti, G. (2020). Long walk to genomics: History and current approaches to genome sequencing and assembly. *Computational and Structural Biotechnology Journal*, 18, 9-19. doi: [10.1016/j.csbj.2019.11.002](https://doi.org/10.1016/j.csbj.2019.11.002)
[^crossley2020guidelines]: Crossley, B. M., Bai, J., Glaser, A., Maes, R., Porter, E., Killian, M. L., ... & Toohey-Kurth, K. (2020). Guidelines for Sanger sequencing and molecular assay monitoring. *Journal of Veterinary Diagnostic Investigation, 32*(6), 767-775. doi: [10.1177/1040638720905833](https://doi.org/110.1177/1040638720905833)

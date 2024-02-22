# FM-index

!!! warning "Preliminaries"

    We assume you are familiar with the following material:

    -   [Burrows–Wheeler transform](../../compression/bwt/)

In the realm of computer science, the ability to efficiently search through vast amounts of text is a cornerstone of numerous applications, from the intricate analysis of genetic sequences to the retrieval of information in large databases.
The FM-index stands as a pivotal innovation in this domain, offering a sophisticated yet practical solution to the challenge of text searching.
Developed by Paolo Ferragina and Giovanni Manzini in 2000, this data structure has revolutionized the way we approach text indexing and searching by combining compression with search efficiency.

At its core, the FM-index is a compressed full-text substring index.
It facilitates the searching of substrings within a larger text corpus with remarkable efficiency.
The innovation of the FM-index lies not just in its search capabilities but also in its ability to compress the indexed text, thus conserving valuable storage space.

TODO:

&nbsp;I&nbsp;&nbsp;&nbsp;F&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;L<br>
`1   $abracadabra`<br>
`2   a$abracadabr`<br>
`3   abra$abracad`<br>
`4   abracadabra$`<br>
`5   acadabra$abr`<br>
`6   adabra$abrac`<br>
`7   bra$abracada`<br>
`8   bracadabra$a`<br>
`9   cadabra$abra`<br>
`10  dabra$abraca`<br>
`11  ra$abracadab`<br>
`12  racadabra$ab`<br>

<!-- REFERENCES -->

[^cheng2018fmtree]: Cheng, H., Wu, M., & Xu, Y. (2018). FMtree: a fast locating algorithm of FM-indexes for genomic data. *Bioinformatics, 34*(3), 416-424. doi: [10.1093/bioinformatics/btx596](https://doi.org/10.1093/bioinformatics/btx596)
[^wikipedia]: [FM-index Wikipedia](https://en.wikipedia.org/wiki/FM-index)
[^curious-coding]: [Interactive demo from Curious Coding](https://curiouscoding.nl/notes/bwt/)
[^alex-bowe]: [Blog post from Alex Bowe](https://www.alexbowe.com/fm-index/)
[^bwt-fmindex-langmead]: [Slides from Ben Langmead](https://www.cs.jhu.edu/~langmea/resources/lecture_notes/bwt_and_fm_index.pdf)
[^simpson2010efficient]: Simpson, J. T., & Durbin, R. (2010). Efficient construction of an assembly string graph using the FM-index. *Bioinformatics, 26*(12), i367-i373. doi: [10.1093/bioinformatics/btq217](https://doi.org/10.1093/bioinformatics/btq217)

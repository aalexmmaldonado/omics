# Burrows–Wheeler transform

The Burrows-Wheeler Transform (BWT) is a revolutionary algorithm in the field of data transformation and compression.
Developed by Michael Burrows and David Wheeler in 1994, this algorithm reorganizes a string of characters in such a way that similar characters are grouped together, forming runs of the same character.
This unique characteristic makes the BWT an invaluable tool in data compression, as it enhances the efficiency of subsequent compression algorithms by making the data more uniform and, thus, easier to compress.

## Applications

The primary application of the BWT is in data compression.
By transforming data into runs of similar characters, the BWT prepares the data for more efficient compression by other algorithms.
It's often used as a pre-processing step in compression algorithms to increase their effectiveness.
The transformation makes the data more uniform, which in turn makes it easier for compression algorithms to reduce the size of the data without losing any information.

In the realm of bioinformatics, the BWT has found significant applications, particularly in sequence alignment and genome assembly.
The ability of the BWT to organize similar characters (or nucleotides, in the case of DNA/RNA) together makes it an excellent tool for identifying regions of similarity within long sequences of genomic data.
This capability is crucial for aligning sequences to reference genomes, identifying genetic variations, and assembling short DNA sequences into longer ones.

## Methodology

### Rotation

The first step in the BWT is to construct a matrix that includes all possible rotations of the input string.
To do this, we take the input string and rotate it one character at a time, appending each rotation to a matrix.

```python
def create_rotations(input_string):
    rotations = []
    length = len(input_string)
    # Concatenate the string with itself to simplify rotation
    temp_string = input_string + input_string
    # Generate all rotations
    for i in range(length):
        rotations.append(temp_string[i:i+length])
    return rotations
```

Here is an example for each stage of processing the input `"banana$"` using the Burrows-Wheeler Transform (BWT).

!!! note

    It's common to append a special character (like `$`) to the end of the input string to signify the end of the string. This character should be unique and lexicographically smaller than any other character in the string to ensure it sorts properly.

The matrix consisting of all possible rotations of the input string `"banana$"`:

-   `banana$`
-   `anana$b`
-   `nana$ba`
-   `ana$ban`
-   `na$bana`
-   `a$banan`
-   `$banana`

### Sorting

After creating the matrix of all possible rotations, the next step is to sort these rotations lexicographically (i.e., in dictionary order).
This step reorganizes the matrix into a more structured form that is essential for the next step of the transform.

```python
def sort_rotations(rotations):
    return sorted(rotations)
```

The sorted rotations of the input string, lexicographically:

-   `$banana`
-   `a$banan`
-   `ana$ban`
-   `anana$b`
-   `banana$`
-   `na$bana`
-   `nana$ba`

### Extraction

The final step in the Burrows-Wheeler Transform is to extract the last column of the sorted matrix.
This column contains the transformed string, which tends to have runs of similar characters, making it more amenable to compression.

```python
def extract_last_column(sorted_rotations):
    last_column = ''.join(rotation[-1] for rotation in sorted_rotations)
    return last_column
```

The last column of this sorted matrix, which is the transformed string: `annb$aa`

## BWT in Sequence Alignment Tools

Many modern sequence alignment tools incorporate the BWT due to its efficiency in handling large genomic datasets. Tools like BWA (Burrows-Wheeler Aligner) and Bowtie use the BWT to rapidly align DNA sequences to large genomes. By leveraging the BWT, these tools can efficiently process millions of DNA sequences, enabling rapid analysis of genetic data.

## Conclusion

The Burrows-Wheeler Transform is a powerful algorithm that has significantly impacted data compression and bioinformatics. Its ability to reorganize data into runs of similar characters makes it an essential tool in sequence alignment, genome assembly, and data compression algorithms. The BWT exemplifies how sophisticated algorithms can solve complex problems in data processing and analysis, contributing to advancements in technology and science.

This educational material provides a concise overview of the BWT, including its applications, operation, and significance in various fields. By understanding the principles and applications of the BWT, learners can appreciate its role in modern computing and bioinformatics.

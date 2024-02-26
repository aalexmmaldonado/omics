# 4.1.2 Salmon

Salmon is a method for quantifying transcript abundance from RNA-seq data.
Salmon is designed to account for various biases that affect the accuracy of abundance estimates, notably fragment GC-content bias.
It features a dual-phase parallel inference algorithm and bias models to correct for these biases, significantly improving the sensitivity of differential expression analysis.
The method involves lightweight mapping, an online phase for initial expression level estimation and model parameterization, and an offline phase for refining these estimates.
Salmon's approach is demonstrated to outperform existing methods in terms of accuracy, leveraging models for sequence-specific bias and fragment GC bias, among others.

## Objectives

### Maximum-likelihood

The "Maximum-likelihood objective" in the context of Salmon's transcript quantification process aims at finding the set of transcript abundance estimates that maximizes the likelihood of the observed RNA sequencing data under the model assumed by Salmon. This approach is grounded in the principle of maximum likelihood estimation (MLE), a statistical method for estimating the parameters of a model given observed data. Below is a simplified explanation based on the paper's description:

- **Likelihood Function**: The likelihood function represents the probability of the observed data given a set of parameters (in this case, transcript abundances). Maximizing this function helps in finding the parameter values that make the observed data most probable.
- **Fragment-Transcript Assignment**: Salmon models the probability of observing a sequencing fragment given its assignment to a particular transcript. This modeling includes considerations for the likelihood of a fragment's length given a transcript, the starting position of the fragment on the transcript, and the concordance of the fragment with the sequencing library's format.
- **Optimization via EM Algorithm**: The Expectation-Maximization (EM) algorithm is used to iteratively refine the estimates of transcript abundances to maximize the likelihood. The EM algorithm alternates between estimating the probability of fragment-transcript assignments (E-step) and updating the abundance estimates to maximize the likelihood given these assignments (M-step).
- **Use of Auxiliary Models**: Salmon uses auxiliary models for sequence-specific biases, fragment GC content, and other factors that can affect the likelihood of observing a fragment from a transcript. These models are integrated into the likelihood function and optimized alongside the abundance estimates.


### Bayesian

The Bayesian objective in the context of the Salmon software, as detailed in the paper, revolves around inferring the posterior distribution of transcript abundances from RNA sequencing data, conditioned on the observed data and the known transcriptome. This approach contrasts with directly seeking maximum likelihood estimates of the parameters of interest, offering a probabilistic understanding of transcript abundances that incorporates prior knowledge and the uncertainty inherent in the data.

- **Posterior Distribution of Transcript Abundances**: The Bayesian objective seeks to infer the posterior distribution of nucleotide fractions (transcript abundances), denoted as Pr{h|FT}, given the transcriptome (T) and the observed fragments (F). This posterior distribution encapsulates our updated beliefs about the transcript abundances after observing the data.
- **Variational Bayesian Inference**: Direct computation of the posterior distribution is often intractable due to the high dimensionality and complexity of the data. Salmon adopts a variational Bayesian (VB) approach to approximate this posterior distribution. Variational inference transforms the problem of computing the posterior into an optimization problem, where the goal is to find an approximation to the posterior that minimizes a divergence measure (e.g., Kullback-Leibler divergence) from the true posterior.
- **Collapsed Variational Bayesian Objective**: In its online phase, Salmon optimizes a collapsed variational Bayesian objective, which simplifies the variational inference by integrating out certain variables and focusing on optimizing a lower-dimensional representation of the data. This approach helps in managing computational complexity while still aiming to closely approximate the true posterior distribution.
- **Full Variational Bayesian Objective**: During the offline phase, Salmon employs the full variational Bayesian objective, allowing for a more detailed and comprehensive optimization that considers the full complexity of the model and data. This phase further refines the estimates obtained during the online phase, aiming to achieve a closer approximation to the true posterior distribution.


## Bias corrections

The model implemented by Salmon tries to account for several types of biases that commonly affect RNA-seq data. These biases, if uncorrected, can lead to inaccurate quantification of transcript abundances. Below is an explanation of the different biases that Salmon's model addresses.

### Sequence-Specific Biases

Sequence-specific biases arise from the sequencing process itself, where certain sequences are preferentially selected or amplified due to their nucleotide composition. This bias is particularly evident at the 5′ and 3′ ends of sequenced fragments. Salmon models these biases by learning sequence-specific bias at both ends of the fragments, which helps in correcting for the preferential selection of sequences based on their nucleotide composition.

### Fragment-Level GC Bias

The GC content of a fragment can significantly affect its likelihood of being sequenced, with fragments of extreme GC content being underrepresented in the sequencing data. Salmon addresses this by learning a model of fragment-level GC bias, which corrects for the preferential sequencing of fragments based on their GC content. This model considers the observed distribution of sequenced fragments for different GC content levels and corrects the abundance estimates accordingly.

### Strand-Specific Protocols

Some RNA-seq protocols are strand-specific, meaning that they can distinguish between the sense and antisense strands of RNA. This specificity introduces bias in the data that needs to be corrected for accurate quantification. Salmon accounts for the directionality imposed by strand-specific protocols in its bias models.

### Fragment Length Distribution

The distribution of fragment lengths can also bias abundance estimates. Shorter fragments might be overrepresented in the sequencing data due to the selection process during library preparation. Salmon corrects for this by considering the empirical distribution of fragment lengths and adjusting the effective length of transcripts accordingly. This correction ensures that the quantification accounts for the likelihood of sampling each possible fragment that a transcript can produce.

### Incorporation of Bias Models into Effective Length

After learning the bias models, Salmon re-estimates the effective length of each transcript to take into account the biases. This effective length now reflects not only the physical length of the transcript but also the likelihood of sampling each possible fragment given the learned biases. This approach, first introduced by Roberts et al., allows Salmon to correct for biases in a comprehensive manner, leading to more accurate abundance estimates.

## Online inference

The online inference phase of Salmon's algorithm is designed to tackle the challenge of estimating transcript abundances from RNA-sequencing data.
This phase employs a variant of stochastic collapsed variational Bayesian inference to optimize a collapsed variational objective function.
The inference procedure operates as a streaming algorithm, updating estimated read counts after processing small groups of observations (mini-batches).
These updates are done asynchronously and in parallel, aiming to make efficient use of computational resources.

During the online phase, Salmon estimates initial expression levels, auxiliary parameters, and foreground bias models.
It also constructs equivalence classes over the input fragments, which serve as a highly reduced representation of the sequencing experiment.
This strategy helps manage the complexity of the data by grouping together fragments that provide similar information about transcript abundances.

The key aspects of the online phase include:

1. **Streaming Inference**: The algorithm processes data in mini-batches, allowing for efficient and parallel processing. This approach helps Salmon to quickly adjust its estimates of transcript abundances as more data are processed.
2. **Variational Bayesian Inference**: By employing a form of variational Bayesian inference, Salmon approximates the posterior distribution of transcript abundances. This statistical framework allows for the incorporation of prior knowledge and the estimation of uncertainty in the abundance estimates.
3. **Equivalence Classes**: Salmon groups together sequenced fragments into equivalence classes based on their compatibility with the same set of transcripts. This reduces the computational complexity of the inference process and enables more efficient optimization.
4. **Bias Models**: The online phase involves the estimation of models to correct for known biases in the sequencing data. These include sequence-specific biases and biases related to the sequencing process itself. By correcting for these biases, Salmon aims to produce more accurate estimates of transcript abundances.
5. **Adaptation to Data**: The algorithm dynamically updates its estimates and models based on the data observed in each mini-batch. This adaptive approach allows Salmon to refine its predictions as more information becomes available.

In summary, the online inference phase of Salmon is a sophisticated computational strategy designed to accurately estimate transcript abundances from RNA-seq data. By leveraging variational Bayesian inference and efficient data processing techniques, Salmon addresses the challenges of bias correction and data complexity, ultimately aiming to provide accurate and reliable estimates of transcript abundances in a computationally efficient manner.

## Offline inference

Offline inference describes a computational process that takes place after the initial, or "online," analysis of RNA sequencing data by the Salmon software. This phase leverages the data and preliminary analyses obtained from the online phase to refine the estimates of transcript abundance, essentially polishing the results for greater accuracy.

- **Rich Equivalence Classes**: In the offline phase, Salmon utilizes "rich equivalence classes" constructed during the online phase. These classes group fragments (reads or parts of reads from sequencing) that are likely to come from the same set of transcripts, thereby reducing computational complexity and focusing efforts on distinguishing between transcripts that share many fragments in common.
- **Expectation-Maximization (EM) Algorithm**: The core of the offline inference phase is an optimization process using the EM algorithm. This algorithm iteratively improves the estimates of how many fragments come from each transcript, effectively fine-tuning the abundance measurements. It does this by maximizing the likelihood of observing the given data under the model, adjusting transcript abundance estimates to fit the observed data better.
- **Variational Bayes Optimization**: Optionally, Salmon can perform variational Bayesian (VB) optimization instead of standard EM updates. This approach involves approximating the true posterior distribution of transcript abundances with a simpler distribution, then iteratively updating this approximation to make it as close as possible to the true posterior. This method is particularly useful for managing computational complexity and uncertainty.
- **Convergence Criterion**: The offline phase continues iterating until the changes in the estimates of transcript abundance fall below a pre-defined threshold, indicating that further iterations are unlikely to significantly alter the results. This criterion ensures that the algorithm stops when it has effectively converged on a stable solution.

## Posterior sampling

Posterior sampling details a statistical method used in the offline phase of the Salmon software to estimate the distribution of transcript abundances from RNA sequencing data. This method allows for the quantification of the uncertainty in transcript abundance estimates, providing more than just point estimates.

- **Gibbs Sampling**: This is a Markov Chain Monte Carlo (MCMC) algorithm used to generate a sequence of samples from the posterior distribution of transcript abundances. Salmon's implementation of Gibbs sampling iteratively samples transcript abundances given the fragment assignments (i.e., which transcripts the sequenced fragments are likely to come from) and then reassigns fragments to transcripts based on these sampled abundances. This process helps in understanding the variability and confidence in the abundance estimates.
- **Bootstrap Sampling**: An alternative method to Gibbs sampling, bootstrap sampling involves generating multiple resampled datasets from the original sequencing data by sampling with replacement. For each resampled dataset, the offline inference procedure is rerun to produce new estimates of transcript abundances. This method is used to assess the stability and reliability of the abundance estimates by observing how they vary across the resampled datasets.

<!-- REFERENCES -->

[^salmon-github]: [Salmon repository on GitHub](https://github.com/COMBINE-lab/salmon)
[^patro2017salmon]: Patro, R., Duggal, G., Love, M. I., Irizarry, R. A., & Kingsford, C. (2017). Salmon provides fast and bias-aware quantification of transcript expression. *Nature methods, 14*(4), 417-419. doi: [10.1038/nmeth.4197](https://doi.org/10.1038/nmeth.4197)

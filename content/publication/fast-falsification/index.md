---
title: "Fast Koopman Surrogate Falsification Using Linear Relaxations and Weights" 
publication_types:
  - "1"
authors:
  - Stanley Bak
  - Abdelrahman Hekal
  - Niklas Kochdumper
  - Ethan Lew
  - Andrew Mata 
  - Amir Rahmati 
doi: https://doi.org/10.1007/978-3-031-78750-8_12
publication: 22nd International Symposium on Automated Technology for Verification and Analysis (ATVA 2024) 
publication_short: ATVA 
abstract: Recent work demonstrated that using Koopman surrogate models to falsify black-box models against signal temporal logic specifications is highly effective. However, the bottleneck of this approach arises from the mixed-integer linear program optimization used to synthesize the falsifying trajectory. The complexity of mixed-integer linear programming can be prohibitive, increasing exponentially with the number of binary variables. In this work, we introduce a new weighted robustness encoding that eliminates the need for binary variables. We also propose a new weighting scheme for Koopman operator linearization that aims to compensate for inaccuracies in the learned model. We evaluate our approach using a set of benchmarks from the ARCH falsification competition. Our weighting methods significantly improve computational efficiency and reduce the number of simulations needed to find falsifying traces. 
draft: false
featured: false
categories: []
image:
  filename: featured
  focal_point: Smart
  preview_only: false
date: 2025-02-12T22:05:44.276Z
url_code: https://github.com/Abdu-Hekal/FReaK
---

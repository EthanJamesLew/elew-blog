---
title: Kernel Methods Derivations
subtitle: Regression and Classification with Kernels
date: 2022-10-17T00:10:28.548Z
draft: false
featured: false
tags: []
image:
  filename: featured
  focal_point: Smart
  preview_only: false
---
# Problem Statement (Regression)

We have a collection of $n$ observations for training data $\mathbf X \in \mathbb R^{n \times m}$. Also, this data has labels $Y \in \mathbb R^n$ that are the result of a function $f: \mathbb R^m \rightarrow \mathbb R$ applied to $\mathbf X$ *plus some additive, zero-mean noise independently and identically distributed (the noise motivates regularization)*. Our goal is to learn an estimate of $f$, $\hat f$, that minimizes the loss function

\begin{equation}
\operatorname*{argmin}_{\hat{f}} \sum_{i=1}^{n} \left( \hat f(\mathbf x_i) - y_i \right)^2 + \lambda M(\hat f),
\end{equation}

where $M$ is some regularizer to control the complexity of $\hat f$ in the presence of noisy training data. This objective---namely the space of functions to consider and the notion of their complexity---is poorly defined. So, we restrict ourselves to finding an estimate in the reproducing kernel hilbert space (RKHS) $\mathcal H$ for a provided kernel function $k: \mathbb R^m \times \mathbb R^m \rightarrow \mathbb R$ *with a regularization term (the smoothness functional)*.
\begin{equation}
\operatorname*{argmin}_{\hat{f} \in \mathcal H} \frac{1}{2} \sum_{i=1}^{n} \left( \hat f(\mathbf x_i) - y_i \right)^2 + \frac{\lambda}{2}\|\hat f \|^2_{\mathcal H}.
\end{equation}

## Solution (Kernel Ridge Regression)

By the representer theorem, the minimizer of the objective takes the form
\begin{equation}
\hat f (.) = \sum_{i=1}^{n} \alpha_i k(., \mathbf x_j),
\end{equation}
meaning that the optimization problem is equivalent to finding the weights $\mathbf \alpha = (\alpha_1, , \alpha_2, \dots, \alpha_n)^T$,
\begin{equation}
\operatorname*{argmin}_{\alpha \in \mathbb R^n} \frac{1}{2} \left\| Y - \mathbf K \alpha \right\|^2_2 + \frac{\lambda}{2}\alpha^T \mathbf K \alpha,
\end{equation}
where the kernel matrix $\mathbf K$ has elements $\mathbf K_{ij} = k(\mathbf x_i, \mathbf x_j). $We can take the gradient the objective and we find the single solution $\mathbf K\left( \mathbf K + \lambda \mathbf I \right)\alpha = \mathbf K Y$ when the gradient is zero. Thus,
\begin{equation}
\alpha = \mathbf K^T \left( \mathbf K \mathbf K^T + \lambda \mathbf I \right)^{-1} Y.
\end{equation}
Further, we can evaluate any point of the regressor by building a kernel vector and applying the weights,
\begin{equation}
\hat f(\mathbf x) = \alpha^T \begin{bmatrix} k(\mathbf x_1, \mathbf x) \\ k(\mathbf x_2, \mathbf x) \\ \vdots \\ k(\mathbf x_n, \mathbf x) \end{bmatrix}.
\end{equation}
Note: When the kernel is the *linear kernel* $k(\mathbf x, \mathbf x') = \mathbf x^T \mathbf x'$ and $\lambda =0$, this is equivalent to linear regression.

\# Problem Statement (Classification)



We have a collection of $n$ observations for training data $\mathbf X \in \mathbb R^{n \times m}$. Also, this data has \*class labels\* $Y \in \{-1, 1\}^n$ that distinguish whether an element $\mathbf x_i$ belongs to class $y_i \in \{-1, 1\}$ . Our goal is to learn an estimate of a class labeling function $f$, $\hat f$, that minimizes the loss function



\begin{equation}

\operatorname*{argmin} _{\hat f} \sum_i^N \max \left(0,1-y_i \hat f\left(\mathbf{x}_i\right)\right).

\end{equation}

The classifier will only achieve a minimum value of 0 when $f(\mathbf x_i)$ and $y_i$ "agree" with one another. Again, this problem is poorly defined. So, let's assume a classifier with the following form (called the dual form)

\begin{equation}

f(\mathbf{x})=\sum_i^N \alpha_i y_i k\left(\mathbf{x}_i, \mathbf{x}\right)+b,

\end{equation}

allowing for the optimization problem

\begin{equation}

\operatorname*{argmin} _{\mathbf{w} \in \mathbb{R}^d}\|\mathbf{w}\|^2+C \sum_i^N \max \left(0,1-y_i f\left(\mathbf{x}_i\right)\right).

\end{equation}

The norm of $\| \mathbf w\|^2$ is a regularization factor.



\## Solution (Support Vector Machine)



Like before, we can use the representer theorem to show that an optimal $\mathbf w$ will take the form

\begin{equation}

\mathbf{w}(.) =\sum_{j=1}^N \alpha_j y_j k(., \mathbf{x}_j).

\end{equation}

We can use this fact to eventually derive

\begin{equation}

\begin{aligned}

&\max _{\alpha_i \geq 0} \sum_i \alpha\_i-\frac{1}{2} \sum\_{j k} \alpha_j \alpha_k y_j y_k k\left(\mathbf{x}_j, \mathbf{x}_k\right)\\

&

\begin{aligned}

\text { subject to } & 0 \leq \alpha_i \leq C \text { for } \forall i, \\

&\sum_i \alpha_i y_i=0

\end{aligned}

\end{aligned}.

\end{equation}

Note that this is a convex optimization problem (quadratic program). \[See this example for an optimization](https://cvxopt.org/applications/svm/index.html).
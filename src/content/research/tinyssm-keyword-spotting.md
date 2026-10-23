---
title: 'TinySSM: Keyword Spotting at the Edge'
description: 'Exploring state-space models for always-on keyword spotting within the memory and latency limits of microcontrollers.'
status: 'ongoing'
period: 'Ongoing'
featured: true
order: 1
topics:
  - TinyML
  - Keyword spotting
  - State-space models
  - Edge AI
technologies:
  - State-space models
  - Embedded inference
  - Model efficiency
cover: '/images/research/tinyssm.svg'
coverAlt: 'Abstract diagram of an audio waveform flowing into a small microcontroller chip'
---

## Overview

TinySSM is an exploration of state-space models for keyword spotting on
microcontrollers. The goal is not simply to make a model smaller, but to find a
design that fits the whole pipeline: preprocessing, inference, memory, and the
energy cost of listening continuously.

Keyword spotting is a useful stress test for edge AI. The task is narrow, the
input is continuous, and the device may have only a few hundred kilobytes of
memory. A model that is accurate in a notebook but cannot run within those
limits is not yet a solution.

## Motivation

Always-on sensing changes the design problem. Inference is no longer a single
request that can wait for a GPU; it is a background process competing with
everything else on a small device. Efficiency therefore has to be considered
at the level of the full system rather than as a single accuracy-per-parameter
number.

State-space models are appealing in this setting because they process a stream
with a compact recurrent state. Whether that theoretical advantage survives
quantization, fixed-point arithmetic, and the realities of an embedded
toolchain is the interesting question.

## Approach

The work is organized around a few practical questions:

- How small can the model be while remaining useful for a constrained
  vocabulary?
- Which parts of the architecture dominate memory once the model is deployed?
- How do quantization and fixed-point inference affect the model's behavior?
- Where is the real latency bottleneck: the model, the front end, or the
  surrounding firmware?

I am treating this as an iterative engineering study. Each version should be
measurable on the target hardware, and negative results should be recorded
rather than hidden.

## Current status

This project is ongoing and exploratory. No benchmark claims are published on
this site yet. When results are available and reproducible, they will be added
to the project page and, if appropriate, submitted for peer review.

## Open questions

- Can the recurrent state be kept small enough for the tightest MCU tier?
- Does the streaming advantage hold when the audio front end is included?
- Which training-time choices make the model more robust to low-precision
  deployment?

If you are working on related problems in TinyML or efficient sequence models,
the [contact page](/contact/) explains how to get in touch.

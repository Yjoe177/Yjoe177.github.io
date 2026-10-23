---
title: 'Agentic MCU Kernel Optimization'
description: 'Investigating whether language-model agents can help write, test, and refine the low-level kernels that make inference practical on microcontrollers.'
status: 'ongoing'
period: 'Ongoing'
featured: true
order: 2
topics:
  - Agentic systems
  - Code generation
  - Kernels
  - Edge AI
technologies:
  - LLM agents
  - Kernel optimization
  - Embedded systems
cover: '/images/research/agentic-mcu.svg'
coverAlt: 'Abstract diagram of an agent loop connecting code, measurement, and a microcontroller'
---

## Overview

This project asks a systems question with an agentic twist: can a language-model
agent participate usefully in the optimization of low-level kernels for
microcontroller inference?

Writing a fast kernel for a small device is a tight feedback loop. You inspect
the generated code, reason about memory access, measure, revise, and repeat.
Much of that loop is expressed in text: compiler output, timing logs, register
usage, and source. That makes it an interesting place to study agents that can
use tools rather than only produce plausible code.

## Motivation

Most agent benchmarks reward a final answer. Systems work rewards a process:
the ability to form a hypothesis, run a measurement, notice an unexpected
result, and change direction. A kernel that compiles is not necessarily a
kernel that is correct, and a kernel that is fast on one input is not
necessarily robust.

The project is therefore as much about evaluation as generation. The useful
question is not "can an agent write a kernel?" but "can an agent be trusted to
tell whether the kernel is any good?"

## Approach

The work is framed as a closed loop:

1. Inspect a reference implementation and the target constraints.
2. Propose a transformation or a new kernel.
3. Compile and test for numerical correctness.
4. Measure on the target or a faithful simulator.
5. Record the result and decide what to try next.

The loop is deliberately conservative. Measurements come from tools, not from
the agent's description of what it did. Failed attempts are kept because they
are often more informative than successful ones.

## Current status

This is ongoing research. The site does not yet report benchmark numbers or
claim a working system. The immediate work is to define a trustworthy
evaluation harness and a set of kernel tasks that are small enough to study but
representative enough to matter.

## Open questions

- What level of tool access is needed for an agent to reason about performance?
- How should an agent represent uncertainty when a measurement is noisy?
- Can an agent transfer an optimization insight from one kernel to another?
- What does a useful human-in-the-loop workflow look like for embedded systems?

Related work on [TinySSM](/research/tinyssm-keyword-spotting/) provides a
concrete deployment context for some of these questions.

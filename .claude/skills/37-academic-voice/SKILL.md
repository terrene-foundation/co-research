---
name: academic-voice
description: "Academic voice preservation and AI detection bias mitigation. Use when writing academic prose, drafting paragraphs, reviewing text for detection patterns, or editing files in a workspace's 03-drafts/ directory."
---

# Academic Voice & Detection Bias Mitigation Reference

These constraints mitigate detection bias from statistical tools, not to conceal AI involvement. We disclose AI assistance per venue requirements. The goal is authentic voice preservation and genuinely better academic writing.

## How AI Detectors Work

### Statistical Methods

**Perplexity**: Measures how "surprising" text is to a language model. Human text has HIGH perplexity (unpredictable). AI text has LOW perplexity (predictable). Detectors flag uniformly low perplexity.

**Burstiness**: Variation in sentence complexity. Human text: HIGH burstiness (short mixed with long). AI text: LOW burstiness (uniform). GPTZero uses this as primary signal.

**Entropy at token level**: AI chooses tokens near the top of the probability distribution. Humans choose less probable tokens more often.

**Type-token ratio**: AI reuses vocabulary more than humans. Lower lexical diversity = higher AI probability.

**Punctuation predictability**: Overly correct, uniform punctuation is an AI signal. Humans use punctuation inconsistently; semi-colon usage, comma splices, and occasional errors are human markers.

**Grammatical over-precision**: Overly correct grammar signals AI. Humans make minor errors, use sentence fragments, and occasionally write awkward constructions. Perfect grammar throughout a document is flagged.

### Classifier-Based Methods

**Originality.ai**: ELECTRA-style discriminator pre-trained on 160GB, fine-tuned on millions of labeled samples. Binary classifier (threshold 0.5). Patent US 12,253,988 (March 2025). Key facts: (a) score is **confidence** AI was used _at all_, not percentage of AI content; (b) even editing/planning with AI tools raises the score; (c) formulaic content (intros, conclusions, abstracts) produces highest false positive rates; (d) short content (<100 words) is unreliable; (e) longer documents score significantly better; (f) continuously retrains against humanizer tools.

**Turnitin**: Trained classifier integrated into plagiarism detection. Scores each sentence, averages across document. Threshold: >20% AI probability triggers flag.

**GPTZero**: Seven-component model combining perplexity, burstiness, and classifiers. Operates at sentence, paragraph, and document level.

### Watermarking (Provider-Side)

Some LLM providers embed statistical watermarks by biasing token selection toward a pseudorandom "green list." Provider-specific; not detectable by third-party tools.

## Empirical Findings on Detection Patterns

Identified by scanning academic papers through Originality.ai segment-by-segment.

### What Scores HUMAN (Green)

1. **Specific numbers and dates**: "127 million rider-only miles", "93% reduction", "84 AI ethics guidelines"
2. **First-person claims**: "I argue that...", "I present an alternative...", "I disagree with..."
3. **Rhetorical questions**: "What is the human for?", "Who is responsible if...?"
4. **Domain-specialist vocabulary**: "wealth effects", "residual loss", "adverse selection", "moral hazard"
5. **Sentences that START a new argument** rather than continue one
6. **Short blunt sentences mixed with long complex ones**
7. **Specific citation integration**: "Hart and Moore (1990, Proposition 3)"
8. **Paragraphs opening with questions, counterpoints, or examples**
9. **Colloquial phrases within formal prose**: "the term stuck", "skin in the game"

### What Scores AI (Red)

1. **Abstract openings**: "Organizations adopting autonomous AI systems face..."
2. **"As X, Y transforms" thesis patterns**
3. **Smooth literature summarization**: "Hagendorff (2020) articulated the issue very clearly..."
4. **"However, this mechanism..." logical pivots**
5. **Setup-example-citation-conclusion paragraph arc** (structure triggers detection even with specific content)
6. **Causal chain sentences** in uniform structure
7. **Smooth bridge sentences between sections**

### Critical Finding: Structure Over Content

The detector scores STRUCTURE, not CONTENT. A paragraph with specific numbers can score red if it follows a predictable arc. **Restructuring paragraphs is more effective than rewriting content.**

### Critical Finding: Scan Length

Same text scored 85% Original with full paper vs 56% AI when a section was removed. **Always scan full documents.**

### Humanizer Tools Are Irrelevant

Humanizer tools use token-level manipulation (synonym substitution, perplexity injection). Originality.ai retrains against these continuously. Our approach is genuine stylistic control via these rules, not post-hoc manipulation.

## MUST Rules (20 Rules)

### 1. No Em Dashes

MUST NOT use em dashes (U+2014). Use commas, parentheses, semicolons, or restructure. Alternatives: comma-delimited clause, parentheses, two sentences, colon for elaboration.

### 2. No AI-Signature Words

**Banned words**: delve, crucial, comprehensive, multifaceted, utilize, landscape (metaphor), tapestry, paradigm (unless citing Kuhn), facilitate, underscore, realm, intricate, pivotal, nuanced (standalone), cornerstone, commendable, meticulous, endeavor, testament, beacon, bustling.

**Banned phrases**: "It is important to note that", "It is worth noting that", "In recent years", "A growing body of literature", "has garnered significant attention", "plays a crucial role", "In the context of", "In today's rapidly evolving", "In an era of", "At its core", "In conclusion" (as opener), "Navigating the complexities of", "a double-edged sword".

### 3. No AI Transition Patterns

Banned as paragraph openers: Furthermore, Moreover, Additionally, Consequently, Notably, Importantly, Significantly, Interestingly. OK within sentences: "The results are significant." Banned: "Significantly, the results show..."

### 4. No Parallel Lists

No lists of three with parallel grammar. Wrong: "It enhances X. It improves Y. It strengthens Z." Right: Vary structure or use two/four items.

### 5. Vary Sentence Length (Burstiness)

Mix under-10-word sentences with over-40-word sentences. Uniform length is the #1 burstiness trigger.

### 6. Active Voice by Default

"I propose" not "it is proposed." "Fama and Jensen showed" not "it was shown by." Passive OK when actor is unknown or object deserves emphasis.

### 7. First Person for Author Claims

"I argue", "I build on". Third person for existing work.

### 8. Anchor Terms at First Use

Bold key concepts at first use: **human-in-the-loop**, **functional agency**. Then use without re-explanation.

### 9. Domain-Specific Vocabulary Over Generic

Wrong: "addresses the challenges inherent in AI governance." Right: Use the specific terminology of the domain being studied (e.g., "addresses the residual loss that persists under incomplete contracts").

### 10. Imperfect Flow

Allow roughness: blunt transitions, colloquial phrases within formal prose, short sentences that break rhythm. Originality.ai flags text where every sentence connects perfectly.

### 11. No Excessive Nominalization

Keep verbs as verbs. "Separating trust from execution" not "the architectural separation of trust from execution." Research shows LLMs nominalize at 1.5-2x human rates (Reinhart et al., 2025).

### 12. No Topic-Sentence-Then-Elaboration in Every Paragraph

Vary openings: question, counterpoint, example, continuation, citation.

### 13. No Trailing Significance Claims

Wrong: "...emphasizing the importance of human judgment in organizational governance." Right: "The framework separates trust from execution." If importance is real, the argument shows it.

### 14. No Register Leveling

Abstract reads differently from limitations. Proposition reads differently from example. Vary register to match content.

### 15. No Epistemic Flatness

Very certain about fundamentals, hedging on frontiers, openly uncertain about specifics. "This follows directly from Holmstrom (1979)" vs "I am less certain whether this extends to multi-agent settings."

### 16. No False Balance

If evidence favors one position, say so. "On the other hand" only when the other hand is genuinely strong.

### 17. No "As X, Y Transforms" Thesis Patterns

Wrong: "As managers shift their delegation, the governance problem transforms..." Right: "The governance problem is no longer about monitoring effort. It is about screening judgment." Lead with conclusion, then explain why.

### 18. No Smooth Literature Summarization

Break up lit reviews: direct quotation + your reaction, blunt assessments ("This misses the point."), parenthetical noting what the author did NOT address, varied citation integration (author-prominent, information-prominent, integrated).

### 19. No Setup-Example-Citation-Conclusion Arc

Break the four-beat arc. Start with the example, or the citation, or embed conclusion mid-paragraph. Don't let the reader predict what comes next.

### 20. No "However, This Mechanism" Logical Pivots

Wrong: "However, this mechanism breaks down..." Right: "The mechanism breaks. Autonomous systems do not throttle effort based on authority allocation."

## SHOULD Rules (5 Rules)

### 21. Specific Numbers and Dates

Use numerals for large figures: "127 million" not "one hundred twenty-seven million." Specificity is human.

### 22. Semicolons and Colons

AI underuses semicolons. "The human remains in the loop in name; the oversight is nominal."

### 23. Parenthetical Asides

Occasionally use (like this one) for minor qualifications. Humans do this; AI integrates everything.

### 24. Specific Page Numbers

"Hart and Moore (1990, Proposition 3)" beats "Hart and Moore (1990) showed that..."

### 25. Rhetorical Questions

Sparingly: "But does this hold when the agent cannot bear wealth effects?"

## Detection Tool Quick Reference

| Detector       | Architecture                           | Primary Signal                         | False Positive Risk                         |
| -------------- | -------------------------------------- | -------------------------------------- | ------------------------------------------- |
| Originality.ai | ELECTRA discriminator, 160GB pre-train | Stylistic uniformity, classifier       | Abstracts, conclusions, formulaic content   |
| GPTZero        | 7-component model                      | Perplexity + burstiness                | Non-native English, uniform sentence length |
| Turnitin       | Trained classifier                     | Sentence-level scoring, >20% threshold | Formulaic STEM writing                      |

**All detectors**: Perform worse on specialized academic text. Cannot distinguish "AI wrote this" from "human directed AI." Sadasivan et al. (2023) proved reliable detection is theoretically impossible for sufficiently good LMs. RAID benchmark (Dugan et al., ACL 2024): at safe false positive rates, detectors "regularly struggle to generalize to unseen generators." Kobak et al. (2025 update): at least 13.5% of 2024 PubMed abstracts processed with LLMs (40% in some subcorpora).

## Research Sources

- Kobak et al. (2024), "Delving into ChatGPT usage..." _Science Advances_. Source of word list.
- Reinhart et al. (2025), "Do LLMs write like humans?" _PNAS_ 122(8). Register leveling, nominalization.
- Liang et al. (2023), "GPT detectors are biased against non-native English writers." _Patterns_. >61% FP rate.
- Mitchell et al. (2023), "DetectGPT." ICML 2023. Zero-shot detection via probability curvature.
- Sadasivan et al. (2023), "Can AI-Generated Text be Reliably Detected?" arXiv:2303.11156. Impossibility result.
- Dugan et al. (2024), "RAID benchmark." ACL 2024. Largest detector evaluation.
- Hans et al. (2024), "Spotting LLMs With Binoculars." ICML 2024. Dual-model detection.
- Kirchenbauer et al. (2023), "A Watermark for LLMs." ICML 2023. Green-list watermarking.

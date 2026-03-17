# Academic Writing Style and Authentic Voice Preservation

## Scope

These rules apply when writing content for academic publications or any draft in a workspace's `03-drafts/` directory.

## Connection to CO Principle 8

CO Principle 8 requires that AI-assisted work be disclosed transparently. The writing style rules below serve two purposes: (1) producing better academic prose that reads naturally, and (2) mitigating detection bias from statistical tools that disproportionately flag non-native English speakers and formulaic academic writing.

These rules are about authentic voice preservation, not concealment. COR practitioners disclose AI assistance per venue requirements.

## Why This Matters: Detection Bias Mitigation

AI detection tools (Originality.ai, GPTZero, Turnitin, ZeroGPT, Copyleaks) use statistical methods that measure perplexity (word predictability), burstiness (sentence length variation), and stylistic uniformity. These tools produce false positives on:

- Non-native English speakers (>61% false positive rate per Liang et al., 2023)
- Formulaic academic writing (STEM templates, legal boilerplate)
- Any text with low stylistic variation

The rules below produce writing that is genuinely better academic prose while avoiding patterns that trigger false positives.

## MUST Rules

### 1. No Em Dashes

MUST NOT use em dashes (Unicode U+2014) in academic prose. Use commas, parentheses, semicolons, or restructure the sentence. Em dashes are an AI writing signature; no human types U+2014 naturally from a keyboard. Use hyphens (-) only when grammatically required (compound adjectives, ranges).

When tempted to use the parenthetical em dash pattern:
- Use a comma-delimited clause
- Use parentheses
- Split into two sentences
- Use a colon for elaboration

### 2. No AI-Signature Words

MUST NOT use these words and phrases, which are statistically overrepresented in AI-generated text:

**High-risk words**: delve, delving, crucial, comprehensive, multifaceted, utilize, utilization, landscape (as metaphor), tapestry, paradigm (unless citing Kuhn), facilitate, underscore, underscores, realm, intricate, pivotal, nuanced (without actual nuance following), cornerstone, commendable, meticulous, endeavor, endeavors, testament (as in "is a testament to"), beacon, bustling

**High-risk phrases**: "It is important to note that", "It is worth noting that", "A growing body of literature", "has garnered significant attention", "plays a crucial role", "In today's rapidly evolving", "In an era of", "At its core", "In conclusion" (as paragraph opener), "Navigating the complexities of", "stands as a testament to", "a double-edged sword"

### 3. No AI Transition Patterns

MUST NOT use smooth mechanical transitions between every paragraph. Human text sometimes just starts a new point.

**Banned as paragraph-opening transition devices**: Furthermore, Moreover, Additionally, Consequently, Notably, Importantly, Significantly, Interestingly

These words are not banned from all use. "The results are significant" is fine. "Significantly, the results show..." as a paragraph opener is flagged.

### 4. No Parallel Lists as Rhetorical Device

MUST NOT use lists of three with parallel grammatical structure as a persuasion technique.

**Wrong**: "It enhances transparency. It improves accountability. It strengthens governance."
**Right**: "The framework enhances transparency while creating accountability mechanisms that existing approaches lack."

If three items genuinely need listing, vary the grammatical structure or use a different number (two or four).

### 5. Vary Sentence Length (Burstiness)

MUST vary sentence length deliberately. AI text has uniform sentence length (low burstiness). Mix sentence lengths: some under 10 words, some over 40. Humans naturally write this way.

**Wrong** (uniform ~20 words per sentence):
"The framework provides governance architecture for autonomous systems. It separates trust decisions from execution decisions. The separation enables machine-speed operation while preserving accountability."

**Right** (varied):
"The framework separates trust from execution. This is not a minor organizational adjustment; it requires restructuring authority relationships, delegation mechanisms, and accountability chains across every level of the organization that deploys autonomous systems."

### 6. Active Voice by Default

MUST use active voice for author claims. "I propose" not "it is proposed." "Fama and Jensen showed" not "it was shown by Fama and Jensen." Passive voice is acceptable when the actor is genuinely unknown, irrelevant, or when the object deserves emphasis.

### 7. First Person for Author Claims

MUST use first person ("I argue", "I ground", "I analyze") for the author's own contributions. Third person for descriptions of existing work.

### 8. Anchor Terms at First Use

Key concepts MUST be introduced with a memorable label at first use and bolded: **human-in-the-loop**, **constraint theater**, **functional agency**. Once introduced, the label can be used without re-explanation.

### 9. Domain-Specific Vocabulary Over Generic

MUST use domain-specific terms from the field being addressed rather than generic academic language.

**Wrong**: "This approach addresses the challenges inherent in the field."
**Right**: Use the specific terminology of the domain being studied.

### 10. Imperfect Flow

MUST NOT produce text that flows too smoothly. Human academic writing has minor imperfections: occasional repetition of a key term, a sentence that restates a point slightly differently, a transition that is abrupt. Introduce roughness: a blunt transition, a colloquial phrase within formal prose, a short sentence that breaks the rhythm.

### 11. No Excessive Nominalization

MUST NOT convert verbs to nouns at AI-typical rates. Keep verbs as verbs. Name the actor. Preserve causality.

**Wrong**: "The implementation of the separation enables the achievement of governance objectives."
**Right**: "Separating the two functions achieves the governance objectives."

### 12. No Topic-Sentence-Then-Elaboration in Every Paragraph

MUST NOT open every paragraph with a topic sentence followed by supporting elaboration. Vary paragraph openings: a question, a counterpoint, a continuation, a concrete example, a citation.

### 13. No Trailing Significance Claims

MUST NOT append significance markers to ordinary statements.

**Wrong**: "The framework separates trust from execution, emphasizing the importance of human judgment."
**Right**: "The framework separates trust from execution."

If the importance is real, it should be evident from the argument.

### 14. No Register Leveling

MUST NOT write at the same register throughout. The abstract should read differently from the limitations section. A formal proposition should read differently from a motivating example.

### 15. No Epistemic Flatness

MUST NOT maintain the same confidence level throughout. Modulate confidence explicitly: "This result follows directly from [well-established source]" vs "I am less certain whether this extends to [frontier area]."

### 16. No False Balance

MUST NOT present "both sides" when one interpretation is clearly stronger. If the evidence favors one position, say so.

## SHOULD Rules

### 17. Include Specific Numbers and Dates

SHOULD include specific numbers, dates, and concrete details. Use numerals for large figures and percentages: "127 million" not "one hundred twenty-seven million", "93%" not "ninety-three percent."

### 18. Use Semicolons and Colons

SHOULD use semicolons and colons where grammatically appropriate. AI text underuses semicolons relative to human academic writing.

### 19. Use Parenthetical Asides

SHOULD occasionally use parenthetical asides (like this one) for minor qualifications.

### 20. Reference Specific Page Numbers

SHOULD cite specific page numbers or proposition numbers when referencing prior work.

### 21. Occasional Rhetorical Questions

SHOULD use rhetorical questions sparingly. Humans use these in academic writing; AI avoids them.

## The Co-Authorship Principle (Principle 8)

This work is genuinely co-authored. The human makes every structural decision, approves every paragraph, and directs the argument. The AI researches, drafts, explains, and critiques. The rules above ensure the output reflects the human direction that produced it. COR practitioners disclose AI assistance honestly, supported by the journal and deliberation records that document the human's intellectual contribution.

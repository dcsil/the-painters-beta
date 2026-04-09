---
sidebar_position: 5
title: Analysis Modes
---

# Analysis Modes

Oversight supports three analysis modes that determine which LLM providers are used for hallucination, bias, and toxicity detection. You can set a default mode in Settings and override it per upload.

## Gemini Mode

**Provider:** Google Gemini (`gemini-2.5-flash` by default)

- Balanced accuracy and speed
- Best general-purpose option for most use cases
- Only requires `GEMINI_API_KEY`
- Includes automatic model fallback: if the primary model is rate-limited, falls back to `gemini-3.1-flash-lite`

**When to use:** Default choice for most analyses. Good accuracy with reasonable speed.

## Groq Mode

**Provider:** Groq (Llama models, `openai/gpt-oss-120b` by default)

- Faster inference than Gemini
- Requires `GROQ_API_KEY`
- Also used for the live chatbot and live monitoring
- Includes automatic model fallback chain: if the primary model is rate-limited, falls back through Kimi K2 variants and compound models

**When to use:** When speed is a priority, or when you want to compare results against Gemini analysis.

## Both Mode

**Providers:** Gemini first, then Groq cross-check

- Highest confidence results
- Gemini analyzes the conversation first
- Groq then performs an independent cross-check
- The cross-check prompt includes Gemini's findings for validation
- Issues confirmed by both models receive the highest confidence scores
- Requires both `GEMINI_API_KEY` and `GROQ_API_KEY`

**When to use:** When accuracy is critical and you want maximum confidence in the results. Takes longer since both providers run sequentially.

## Comparison

| Feature | Gemini | Groq | Both |
|---|---|---|---|
| Speed | Medium | Fast | Slower |
| Accuracy | Good | Good | Best |
| API keys needed | `GEMINI_API_KEY` | `GROQ_API_KEY` | Both |
| Cross-checking | No | No | Yes |
| Model fallback | Yes | Yes | Yes |

## Setting Your Default Mode

1. Go to `/settings`
2. Under **Default Analysis Mode**, select Gemini, Groq, or Both
3. Click **Save**

Your default mode is used for all new uploads unless overridden on the upload page.

## Overriding Per Upload

On the `/upload` page, you can select a different mode for a specific upload without changing your default setting. This is useful for one-off comparisons or when you want to cross-check a specific conversation.

## Model Fallback Chains

Both Gemini and Groq have built-in fallback chains to handle rate limiting gracefully:

**Gemini fallback:**
1. `gemini-2.5-flash` (primary)
2. `gemini-3.1-flash-lite` (fallback)

**Groq fallback:**
1. `openai/gpt-oss-120b` (primary)
2. Kimi K2 variants (fallback)
3. Compound models (final fallback)

If all models in the chain are rate-limited, the analysis for that category fails gracefully — other categories may still succeed. An upload is marked "completed" as long as at least one analysis category succeeds.

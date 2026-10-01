#!/bin/bash
# Copy-rules guardrail hook (PostToolUse on Write|Edit)
# Enforces the deterministic subset of the site's copy rules
# (see CLAUDE.md "Copy rules", from the Rebrand Spec).
# The judgment-laden rules (colons in prose, AI-tells, voice) belong to
# the copy-editor agent — this hook only flags what grep can prove.
#
# Exit 2 = hard violation, message fed back to Claude to fix immediately
# Exit 0 = clean or warnings only

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_response.filePath // .tool_input.file_path // empty' 2>/dev/null)

[ -z "$FILE_PATH" ] && exit 0
[ ! -f "$FILE_PATH" ] && exit 0

# Only police files that contain rendered site copy
case "$FILE_PATH" in
  */src/app/*.tsx|*/src/components/*.tsx|*/src/content/*.ts|*/content/*.md|*/content/*.mdx) ;;
  *) exit 0 ;;
esac

ERRORS=""
WARNINGS=""

# HARD RULE: never name the white-labeled platform, in any file, ever
if grep -qiE "activepieces" "$FILE_PATH"; then
  ERRORS="${ERRORS}VIOLATION: '$FILE_PATH' names the white-labeled platform. This must never appear anywhere on the site. Remove it now.\n"
fi

# HARD RULE: no em-dashes in rendered copy (almost never legitimate in code either)
if grep -q "—" "$FILE_PATH"; then
  ERRORS="${ERRORS}VIOLATION: em-dash found in '$FILE_PATH'. Binding copy rule 1 forbids em-dashes in rendered copy. Restructure the sentence with periods and commas.\n"
fi

# Banned vocabulary, from the Rebrand Spec "Words we avoid" (word-boundary,
# case-insensitive). Words that collide with code (transform, navigate) are
# checked only in pure-copy files: markdown and src/content modules.
BANNED_COMMON="unlock|leverage|harness|empower|seamless|robust|cutting-edge|state-of-the-art|revolutionize|game-changer|supercharge|next-level|journey|landscape|ecosystem|AI-powered|intelligent solutions|tailored solutions|elevate|delve|synergy|holistic|employee"
if echo "$FILE_PATH" | grep -qE "\.(md|mdx)$|/src/content/"; then
  BANNED="${BANNED_COMMON}|transform|transformation|navigate"
else
  BANNED="$BANNED_COMMON"
fi
if echo "$FILE_PATH" | grep -qE "\.(md|mdx)$"; then
  # Markdown is pure copy, so punctuation rules apply to the whole file
  if grep -q ";" "$FILE_PATH"; then
    WARNINGS="${WARNINGS}WARNING: semicolon found in markdown copy '$FILE_PATH'. Copy rules forbid semicolons in rendered copy.\n"
  fi
fi

# Old positioning that contradicts a monthly fractional fee.
OLD=$(grep -oiE "fixed[- ]price|fixed scope|subscription|recurring license|build it[.,] you own it" "$FILE_PATH" 2>/dev/null | sort -u | tr '\n' ' ')
if [ -n "$OLD" ]; then
  WARNINGS="${WARNINGS}WARNING: old-positioning language in '$FILE_PATH': ${OLD}. The fractional model drops fixed-price and no-subscription claims.\n"
fi

MATCHES=$(grep -oiE "\b(${BANNED})\b" "$FILE_PATH" 2>/dev/null | sort -u | tr '\n' ' ')
if [ -n "$MATCHES" ]; then
  WARNINGS="${WARNINGS}WARNING: banned vocabulary in '$FILE_PATH': ${MATCHES}. See the Rebrand Spec copy rules (CLAUDE.md). If these words appear in code identifiers rather than rendered copy, ignore this warning.\n"
fi

if [ -n "$ERRORS" ]; then
  printf "%b" "$ERRORS" >&2
  [ -n "$WARNINGS" ] && printf "%b" "$WARNINGS" >&2
  echo "[$(date -u +%Y-%m-%dT%H:%M:%SZ)] COPY_RULES_BLOCK: $FILE_PATH" >> .claude/audit.log
  exit 2
fi

if [ -n "$WARNINGS" ]; then
  printf "%b" "$WARNINGS" >&2
fi

exit 0

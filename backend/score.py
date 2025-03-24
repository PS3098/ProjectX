import re
from textstat import textstat  # To use for readability checks

def generate_score(text: str, feedback: str) -> int:
    """
    Generate a score out of 100 based on submission length, grammar, readability, and relevance to the topic.
    """
    # Initialize score
    score = 100

    # 1. Check length of the submission (word count)
    word_count = len(text.split())
    if word_count < 200:
        score -= 15  # Deduct points for being too short
    elif word_count > 500:
        score -= 5  # Deduct slightly for being too long

    # 2. Check readability (use Flesch-Kincaid grade level)
    readability = textstat.flesch_reading_ease(text)
    if readability < 60:  # Lower scores for difficult to read text
        score -= 10

    # 3. Check for spelling/grammar issues (using a basic check or library)
    grammar_errors = detect_grammar_issues(feedback)
    score -= grammar_errors * 2  # Deduct 2 points for each grammar error

    # 4. Check topic relevance (simplified logic for demo)
    if not is_relevant_to_topic(text):
        score -= 20  # Deduct heavily if the submission is irrelevant

    # 5. Return score, make sure it doesn't go below 0
    return max(0, score)


def detect_grammar_issues(feedback: str) -> int:
    """
    Detect grammar issues (simplified, could use a library like `language-tool-python`).
    Returns number of grammar issues found.
    """
    # Simple placeholder for grammar issue count (can be enhanced with a library like language-tool-python)
    grammar_errors = 0
    # Let's count basic punctuation or spacing errors as a proxy for grammar issues.
    grammar_errors += len(re.findall(r'\s+', feedback))  # Count number of extra spaces (basic check)
    return grammar_errors

def is_relevant_to_topic(text: str) -> bool:
    """
    Check if the text is relevant to the expected topic. This can be based on keyword matching,
    or you could use a more sophisticated NLP method (like keyword extraction, etc.).
    """
    expected_keywords = ['AI', 'technology', 'innovation', 'humanity']  # Example expected keywords
    text_lower = text.lower()
    for keyword in expected_keywords:
        if keyword.lower() not in text_lower:
            return False
    return True


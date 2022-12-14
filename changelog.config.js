module.exports = {
    disableEmoji: false,
    format: "{emoji}{type}: {scope} - {subject}",
    list: ["feat", "fix", "refactor", "design", "chore", "test", "docs"],
    maxMessageLength: 64,
    minMessageLength: 3,
    questions: ["type", "scope", "subject", "body"],
    scopes: ["FE", "BE", "COMMON"],
    types: {
        chore: {
            description: "Build process or auxiliary tool changes",
            emoji: "🐋",
            value: "chore",
        },
        docs: {
            description: "Documentation only changes",
            emoji: "📖",
            value: "docs",
        },
        feat: {
            description: "A new feature",
            emoji: "✨",
            value: "feat",
        },
        fix: {
            description: "A bug fix",
            emoji: "🐞",
            value: "fix",
        },
        refactor: {
            description:
                "A code change that neither fixes a bug or adds a feature",
            emoji: "🛠️",
            value: "refactor",
        },
        test: {
            description: "Adding missing tests",
            emoji: "🚨",
            value: "test",
        },
        design: {
            description: "Change user interface design",
            emoji: "💄",
            value: "design",
        },
    },
};

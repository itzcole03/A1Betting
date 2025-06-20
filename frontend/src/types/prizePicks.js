export const PRIZEPICKS_CONFIG = {
    UPDATE_INTERVAL: 60000, // 60 seconds
    BATCH_SIZE: 50,
    MAX_RETRY_ATTEMPTS: 3,
    CACHE_DURATION: 300000, // 5 minutes
    GOBLIN_CONFIDENCE_THRESHOLD: 0.65,
    DEMON_RISK_THRESHOLD: 0.4,
    VALUE_BET_THRESHOLD: 3,
    HIGH_CONFIDENCE_THRESHOLD: 0.7,
    TRENDING_THRESHOLD: 100, // Minimum pick count to be considered trending
    PROCESSING_CHUNK_SIZE: 20,
    FILTER_DEBOUNCE_MS: 300,
};

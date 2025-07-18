import { EventBus } from '../core/EventBus';
import { PerformanceMonitor } from '../core/PerformanceMonitor';
export class DailyFantasyAdapter {
    constructor(config) {
        this.id = 'daily-fantasy';
        this.type = 'sports-projections';
        this.eventBus = EventBus.getInstance();
        this.performanceMonitor = PerformanceMonitor.getInstance();
        this.config = config;
        this.cache = {
            data: null,
            timestamp: 0
        };
    }
    async isAvailable() {
        return Boolean(this.config.apiKey);
    }
    async fetch() {
        const traceId = this.performanceMonitor.startTrace('daily-fantasy-fetch', {
            source: this.id,
            type: this.type
        });
        try {
            // Check cache first
            if (this.isCacheValid()) {
                return this.cache.data;
            }
            const spanId = this.performanceMonitor.startSpan(traceId, 'api-request', {
                url: `${this.config.baseUrl}/nba/projections`
            });
            const response = await fetch(`${this.config.baseUrl}/nba/projections`, {
                headers: {
                    'Authorization': `Bearer ${this.config.apiKey}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this.performanceMonitor.endSpan(spanId);
            // Update cache
            this.cache = {
                data,
                timestamp: Date.now()
            };
            // Publish event
            await this.eventBus.publish({
                type: 'daily-fantasy:data-updated',
                payload: {
                    timestamp: Date.now(),
                    projectionCount: data.projections.length
                }
            });
            this.performanceMonitor.endTrace(traceId);
            return data;
        }
        catch (error) {
            this.performanceMonitor.endTrace(traceId, error);
            throw error;
        }
    }
    isCacheValid() {
        if (!this.cache.data)
            return false;
        const age = Date.now() - this.cache.timestamp;
        return age < this.config.cacheTimeout;
    }
    clearCache() {
        this.cache = {
            data: null,
            timestamp: 0
        };
    }
    async connect() { }
    async disconnect() { }
    async getData() { return this.cache.data; }
    isConnected() { return true; }
    getMetadata() { return { id: this.id, type: this.type }; }
}

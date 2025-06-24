export class UnifiedMonitor {
  constructor() {
    this.metrics = new Map();
    this.userContext = null;
  }

  static getInstance() {
    if (!UnifiedMonitor.instance) {
      UnifiedMonitor.instance = new UnifiedMonitor();
    }
    return UnifiedMonitor.instance;
  }

  startTrace(name, type) {
    return {
      name,
      type,
      startTime: Date.now(),
      setHttpStatus: (status) => {},
    };
  }

  endTrace(trace) {
    const duration = Date.now() - trace.startTime;
    this.recordMetric(`trace.${trace.name}.duration`, duration, {
      type: trace.type || "timing",
    });
  }

  recordMetric(name, value, metadata = {}) {
    const metric = {
      name,
      value,
      timestamp: Date.now(),
      ...metadata,
    };

    // Store metric
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    const metrics = this.metrics.get(name);
    metrics.push(metric);

    // Keep only last 100 metrics per name to prevent memory leaks
    if (metrics.length > 100) {
      metrics.shift();
    }

    // Log metric for debugging (only in development)
    if (process.env.NODE_ENV === "development") {
      console.debug(`[Metric] ${name}: ${value}`, metadata);
    }
  }

  reportError(error, context) {
    console.error("Error:", error, "Context:", context);

    // Record error as metric
    this.recordMetric("error.count", 1, {
      component: context?.component || "unknown",
      action: context?.action || "unknown",
      error_type: error?.name || "Error",
    });
  }

  setUserContext(context) {
    this.userContext = context;
  }

  getMetrics(name) {
    return this.metrics.get(name) || [];
  }

  getAllMetrics() {
    return Object.fromEntries(this.metrics);
  }

  clearMetrics(name) {
    if (name) {
      this.metrics.delete(name);
    } else {
      this.metrics.clear();
    }
  }
}

export const unifiedMonitor = new UnifiedMonitor();

// Example Usage:
// unifiedMonitor.reportError(new Error('Something went wrong in payment processing'), { orderId: '12345' });
// unifiedMonitor.setUserContext({ id: 'user-6789', username: 'jane.doe' });
// const trace = unifiedMonitor.startTrace('checkout_flow', 'user.action');
// // ... some operations ...
// unifiedMonitor.recordMetric('items_in_cart', 3, { type: 'gauge'});
// unifiedMonitor.endTrace(trace);

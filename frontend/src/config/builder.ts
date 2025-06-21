import { builder } from "@builder.io/react";

// Initialize Builder with your API key from the provided project
const BUILDER_API_KEY = "00bc0cac06c243388f0cadf06ce977a0";

// Simple initialization without any complex options
builder.init(BUILDER_API_KEY);

// Export for use in components
export { builder };

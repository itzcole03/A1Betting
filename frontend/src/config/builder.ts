import { builder } from "@builder.io/react";

// Initialize Builder with your API key from the provided project
const BUILDER_API_KEY = "bb8f19eb9dd74c7a88ad7d1c6848a321";

// Simple initialization without any complex options
builder.init(BUILDER_API_KEY);

// Export for use in components
export { builder };

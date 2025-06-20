import { jsx as _jsx } from "react/jsx-runtime";
import { BuilderComponent } from '@builder.io/react';
import '../../config/builder';
const BuilderPage = ({ model = 'page', content, url }) => {
    return (_jsx(BuilderComponent, { model: model, content: content, url: url, 
        // Pass any custom data or context here
        data: {
            // You can pass app-specific data to Builder components
            theme: 'betting-app',
            user: null, // Replace with actual user data if needed
        } }));
};
export default BuilderPage;

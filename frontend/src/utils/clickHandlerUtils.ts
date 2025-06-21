/**
 * Utility functions to ensure onClick handlers are safe and prevent errors
 */

/**
 * Ensures an onClick handler is a function, returning a no-op if not
 * @param onClick - The onClick handler to validate
 * @returns A safe onClick function
 */
export const safeOnClick = (onClick?: (() => void) | null): (() => void) => {
  if (typeof onClick === 'function') {
    return onClick;
  }
  // Return a no-op function if onClick is not a function
  return () => {
    if (process.env.NODE_ENV === 'development') {
      console.warn('onClick handler was not a function, using no-op instead');
    }
  };
};

/**
 * Creates a safe onClick handler that wraps the original in a try-catch
 * @param onClick - The onClick handler to wrap
 * @returns A safe onClick function that won't crash the app
 */
export const wrappedOnClick = (onClick?: (() => void) | null): (() => void) => {
  return () => {
    try {
      if (typeof onClick === 'function') {
        onClick();
      }
    } catch (error) {
      console.error('Error in onClick handler:', error);
      // Optionally show user-friendly error message
      if (typeof window !== 'undefined' && 'toast' in window) {
        // If toast is available, show error
        console.warn('Action failed. Please try again.');
      }
    }
  };
};

/**
 * Higher-order component to wrap components with safe onClick handling
 */
export const withSafeOnClick = <P extends { onClick?: () => void }>(
  Component: React.ComponentType<P>
): React.ComponentType<P> => {
  const SafeComponent = (props: P) => {
    const safeProps = {
      ...props,
      onClick: props.onClick ? wrappedOnClick(props.onClick) : undefined,
    };
    
    return <Component {...safeProps} />;
  };
  
  SafeComponent.displayName = `withSafeOnClick(${Component.displayName || Component.name})`;
  return SafeComponent;
};
export const MockSnippet = ({children, ...props}) =>
  `Snippet: ${children}${props && Object.keys(props).length > 0 ? ` with props ${JSON.stringify(props)}` : ''}`;

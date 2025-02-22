 export const searchStyles = {
    container: "w-full max-w-2xl",
    inputWrapper: (isFocused: boolean) => `
      relative group ${isFocused ? 'ring-2 ring-blue-500/20 rounded-xl' : ''}
    `,
    input: `
      w-full bg-white border-2 border-gray-200 text-gray-900 text-base rounded-xl 
      focus:outline-none focus:border-blue-500 block p-4 pl-12 pr-10 
      transition-all duration-200 hover:border-gray-300 placeholder-gray-400
    `,
    searchIcon: (isFocused: boolean) => `
      h-5 w-5 ${isFocused ? 'text-blue-500' : 'text-gray-400'} 
      transition-colors duration-200
    `,
    clearButton: `
      absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 
      hover:text-gray-600 transition-colors duration-200
    `
  } as const;
  

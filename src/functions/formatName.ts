export function formatName(name: string) {
    const upperCaseChar = name.charAt(0).toUpperCase();
    const slicedName = name.slice(1, name.length);
    const formattedName = upperCaseChar + slicedName;
  
    return formattedName;
  }
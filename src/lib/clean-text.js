const cleanText = (text, tag, type) => {
  let modifiedText = text;
  const insertions = ['damaged', 'drawing', 'divine'];
  const addSpace = new RegExp(`(\\[${tag}\\])`, 'g');
  const removeSpaceBefore = new RegExp(`(\\[\\w+\\])\\s*(\\[${tag}\\])`, 'g');
  const removeSpaceAfter = new RegExp(`(\\[${tag}\\])\\s*(\\[\\w+\\])`, 'g');
  const removeConsecutive = new RegExp(`(\\[${tag}\\])(\\[${tag}\\])`, 'g');
  const addSpaceClosing = new RegExp(`(\\[${tag}/\\])`, 'g');
  const closeSpaceAfterOpenTag = new RegExp(`([^\\[])\\s*(\\[${tag}])`, 'g');
  const closeSpaceBeforeCloseTag = new RegExp(`(\\[${tag}/\\])\\s*([^\\[])`, 'g');

  if (insertions.indexOf(type) < 0) {
    modifiedText = modifiedText
      .replace(addSpace, '$1 ') // When  we see [tag], add a space in front of it.
      .replace(addSpaceClosing, ' $1') // When  we see [/tag], add a space after it.
      .replace(closeSpaceAfterOpenTag, '$1$2') // When we see [tag]__word, change it to [tag]word
      .replace(closeSpaceBeforeCloseTag, '$1$2'); // When we see word___[/tag], change it to word[/tag]
    // WARNING: This code doesnt handle [tag1][tag2]nested metatags[/tag2][/tag1], except for special case.
  }

  if (insertions.indexOf(type) >= 0) {
    modifiedText = modifiedText
      .replace(addSpace, ' $1 ') // Add spaces before/after [drawing]
      .replace(removeSpaceBefore, '$1$2') // If [drawing] between [tags][/tags], remove space before...
      .replace(removeSpaceAfter, '$1$2') // ...or after it.
      .replace(removeConsecutive, '$1 $1'); // no consecutive [drawing]
  }

  return modifiedText
    .trim() // Remove useless spaces at the start and the end of the lines.
    .replace(/\s+/g, ' '); // No multiple spaces.
};

export default cleanText;

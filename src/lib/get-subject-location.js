const READABLE_FORMATS = {
  image: ['jpeg', 'png', 'svg+xml', 'gif'],
};

function getSubjectLocation(subject, frame = 0) {
  let format;
  let type;
  let src;

  const currentLocation = (subject && subject.locations) ? subject.locations[frame] : undefined;

  //When transitioning e.g. from a Subject with 5 pages to a Subject with 2
  //pages, an error will occur if the page viewer is still set to page 5.
  if (!currentLocation) return undefined;

  Object.keys(currentLocation).some((mimeType) => {
    src = currentLocation[mimeType];
    [type, format] = mimeType.split('/');
    const extensions = type || [];
    if (type in READABLE_FORMATS && READABLE_FORMATS[extensions].includes(format)) {
      return type;
    }
  });
  return { type, format, src };
}

export {
  getSubjectLocation
};

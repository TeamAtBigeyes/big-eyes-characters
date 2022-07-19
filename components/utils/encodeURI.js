const encodeUri = (string) => {
  if (typeof string === 'undefined') {
    return ''
  }

  return encodeURIComponent(string)
}

export default encodeUri
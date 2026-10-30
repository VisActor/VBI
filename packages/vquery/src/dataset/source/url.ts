export const isUrl = (url: string) => {
  return isHttpUrl(url) || isBase64Url(url)
}
export const isHttpUrl = (url: string) => {
  return url.startsWith('http://') || url.startsWith('https://')
}

export const isBase64Url = (url: string) => {
  return url.startsWith('data:')
}

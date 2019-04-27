export const convertFileToBuffer = async file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result
      const regex = /^data:.+\/(.+);base64,(.*)$/

      const matches = result.match(regex)
      const data = matches[2]
      resolve(new Buffer(data, 'base64'))
    }
    reader.onabort = () => reject('file reading was aborted')
    reader.onerror = () => reject('file reading has failed')

    reader.readAsDataURL(file)
  })
}

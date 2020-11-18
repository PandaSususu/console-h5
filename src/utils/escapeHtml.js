import faces from '@/assets/js/face'

const escapeHtml = (val) => {
  let result = val
  // 表情
  const faceReg = /表情\[\W{1,}\]/g
  if (faceReg.test(result)) {
    const faceGroup = result.match(faceReg)
    console.log(faceGroup)
    faceGroup.map(item => {
      const faceKey = item.match(/\[\S+\]/g)[0]
      result = result.replace(item, `<img src="${faces[faceKey]}">`)
    })
  }

  // 图片
  const imageReg = /图片\[\S+\]/g
  if (imageReg.test(result)) {
    const imageGroup = result.match(imageReg)
    imageGroup.map(item => {
      const url = item.substr(3, item.length - 4)
      console.log(url)
      result = result.replace(item, `<img src="${url}">`)
    })
  }

  // 链接
  const linkReg = /链接\(\S+\)\[\S+\]/g
  if (linkReg.test(result)) {
    const linkGroup = result.match(linkReg)
    console.log(linkGroup)
    linkGroup.map(item => {
      const link = item.match((/\((\S+)\)/))[1]
      const title = item.match((/\[(\S+)\]/))[1]
      result = result.replace(item, `<a href="${link}" target="_blank">${title}</a>`)
    })
  }

  // 换行
  const hrReg = /\[hr\]/g
  if (hrReg.test(result)) {
    const hrGroup = result.match(hrReg)
    hrGroup.map(item => {
      result = result.replace(item, '<hr/>')
    })
  }
  return result
}

export {
  escapeHtml
}

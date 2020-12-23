import faces from '@/assets/js/face'

const htmlEncode = (html) => {
  let temp = document.createElement('div')
  temp.textContent !== undefined ? (temp.textContent = html) : (temp.innerText = html)
  const output = temp.innerHTML
  temp = null
  return output
}

const escapeHtml = (val) => {
  let result = val
  // 表情
  const faceReg = /表情\[\S{1,}\]/g
  if (faceReg.test(result)) {
    console.log(result)
    const faceGroup = result.match(faceReg)
    console.log(faceGroup)
    faceGroup.map(item => {
      const faceKey = item.match(/\[\S+\]/g)[0]
      if (faces[faceKey]) {
        result = result.replace(item, `<img src="${faces[faceKey]}">`)
      }
    })
  }

  // 图片
  const imageReg = /图片\[\S+\]/g
  if (imageReg.test(result)) {
    const imageGroup = result.match(imageReg)
    imageGroup.map(item => {
      const url = item.substr(3, item.length - 4)
      result = result.replace(item, `<img src="${url}">`)
    })
  }

  // 链接
  const linkReg = /链接\(\S+\)\[\S+\]/g
  if (linkReg.test(result)) {
    const linkGroup = result.match(linkReg)
    linkGroup.map(item => {
      const link = item.match((/\((\S+)\)/))[1]
      const title = item.match((/\[(\S+)\]/))[1]
      result = result.replace(item, `<a href="${link}" target="_blank">${title}</a>`)
    })
  }

  // 应用内容
  result = result.replace(/\[引用\]/g, '<div class="layui-elem-quote">')
  result = result.replace(/\[\/引用\]/g, '</div>')

  // 代码块替换
  const code = /(\[\/?代码(.+?)[^\]]*\])|\[[^\]]*\]/g
  if (code.test(result)) {
    const group = result.match(code)
    group.map((item) => {
      result = result.replace(item, htmlEncode(item))
    })
    result = result.replace(/\[代码\]/g, '<pre>')
    result = result.replace(/\[\/代码\]/g, '</pre>')
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

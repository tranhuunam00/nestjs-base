/* eslint-disable no-useless-escape */
export const getSearchString = (text: string): string => {
  let searchString = (text || '').replace(/ /g, ' *')
  searchString = searchString.toLowerCase()
  searchString = searchString.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
  searchString = searchString.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
  searchString = searchString.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
  searchString = searchString.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
  searchString = searchString.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
  searchString = searchString.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
  searchString = searchString.replace(/đ/g, 'd')
  searchString = searchString.replace(
    /!|\$|%|\^|\*|∣|\+|\=|\<|\>|\?|\/|,|\:|\'|\"|\&|\#|\[|\]|~/g,
    ''
  )
  searchString = searchString.replace(/-+-/g, '-') // thay thế 2- thành 1-
  searchString = searchString.replace(/^\-+|\-+$/g, '') // cắt bỏ ký tự - ở đầu và cuối chuỗi
  return searchString.toLowerCase()
}

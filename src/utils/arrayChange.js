
function arrayRefEntityToStr (arr) {
    if (!arr) return [];
    for(let i=0; i<arr.length; i++){
      let item = arr[i]
      if(item.dataType === 'object' && item.refEntityId === 0){
        item.refEntityId = ''
      }
      if(item.refEntity){
        this.arrayRefEntityToStr(item.refEntity.propertyList)
      }
      if (item.dataType === 'array' && item.refProperty) {
        if (item.refProperty.refEntityId === 0) {
          item.refProperty.refEntityId = ''
        }
      }
    }
    return arr
  }

  function arrayRefEntityToNumber (arr) {
    if (!arr) return [];
    for(let i=0; i<arr.length; i++){
    let item = arr[i]
      if(item.dataType === 'object' && item.refEntityId === ''){
        item.refEntityId = 0
      }
      if(item.refEntity){
        this.arrayRefEntityToNumber(item.refEntity.propertyList)
      }
      if(item.dataType === 'array' && item.refProperty) {
        if (item.refProperty.refEntityId === '') {
          item.refProperty.refEntityId = 0
        }
      }
    }
    return arr
  }
export default {
  arrayRefEntityToStr,
  arrayRefEntityToNumber
}

import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LENGTH = 15

// compare:findindex传入的是function,所以不能直接传val
function insertArray(arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val) // 插入到数组最前
  if (maxLen && arr.length > maxLen) {
    arr.pop() // 删除末位元素
  }
}

// 存储搜索历史
export function saveSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LENGTH)
  storage.set(SEARCH_KEY, searches)
  return searches
}
// 加载本地缓存的搜索历史
export function loadSearch() {
  return storage.get(SEARCH_KEY, [])
}
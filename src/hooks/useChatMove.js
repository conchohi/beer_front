import { useState } from "react"
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom"

const getNum  = (param, defaultValue) => {

  if(!param){
    return defaultValue
  }

  return parseInt(param)
}

const getString = (param) =>{
  return param ? param : "";
}

const useChatMove = () => {
  const navigate = useNavigate()

  const [refresh, setRefresh] = useState(false)  
  const [queryParams] = useSearchParams()

  const page = getNum(queryParams.get('page'), 1)
  const size = getNum(queryParams.get('size'), 6)
  const category = getString(queryParams.get('category'))
  const searchTerm = getString(queryParams.get('searchTerm'))
  const searchType = getString(queryParams.get('searchType'))
  const orderBy = getString(queryParams.get('orderBy'))

  const queryDefault = createSearchParams({page, size, category, searchTerm, orderBy, searchType}).toString() 

  const moveToList = (pageParam) => {

    let queryStr = ""

    if(pageParam){
      const pageNum = getNum(pageParam.page, 1)
      const sizeNum = getNum(pageParam.size, 6)
      queryStr = createSearchParams({page:pageNum, size: sizeNum, category : pageParam.category, searchTerm:pageParam.searchTerm, searchType:pageParam.searchType, orderBy:pageParam.orderBy}).toString()
    }else {
      queryStr = queryDefault
    }

    navigate({
      pathname: `/chat/list`,
      search:queryStr
    })

    setRefresh(!refresh) //추가 
  }


  return  {moveToList, page, size, category, searchTerm, searchType, orderBy, refresh}
}

export default useChatMove

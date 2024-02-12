import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getNews } from '../store/features/news/newsSlice';

const News = () => {

  const newsList = useSelector(state=>state.news.newsList)
  console.log(newsList.data);

  const dispatch = useDispatch()
  useEffect(() =>{
    dispatch(getNews())
  },[])

  return (
    <div>News</div>
  )
}

export default News
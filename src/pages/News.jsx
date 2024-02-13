import { Switch } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { news } from '../data';
import { DeleteIcon, EditIcon } from '../icons';
import { getNews } from '../store/features/news/newsSlice';


const News = () => {

  // const newsList = useSelector(state=>state.news.newsList)
  // console.log(newsList.data);

  // const dispatch = useDispatch()
  // useEffect(() =>{
  //   dispatch(getNews())
  // },[])

  return (
    <section>
      <ul className='flex flex-col gap-3'>
        {news.map(n => (
          <li className='flex justify-between bg-slate-100 p-4'>
            <div className='flex'>
              <span className='w-7'>
                {n.id}
              </span>
              <span>
                {n.title}
              </span>
            </div>
            <div className='flex gap-8'>
              <Switch
                value={n.is_active}
              />
              <DeleteIcon />
              <EditIcon />
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default News
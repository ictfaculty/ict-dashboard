import { Button, Switch } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteIcon, EditIcon } from '../icons';
import { getNews } from '../store/features/news/newsSlice';
import ModalForm from '../components/Modals/ModalForm';


const News = () => {
  const newsList = useSelector(state => state.news.newsList)
  const [showModal, setShowModal] = useState(false)

  const handleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  }

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getNews())
  }, [])
  return (
    <section>
      <div className="mb-5 flex flex-wrap justify-between items-center">
        <h1 className='text-[26px] text-textPrimary'>Список новостей</h1>
        <Button onClick={handleModal} className='bg-primary' type="primary">+ Добавить</Button>
        {showModal ? 
        <ModalForm />
          : null
        }
      </div>
      <ul className='flex flex-col gap-3'>
        {newsList.map(n => (
          <li className='flex justify-between bg-slate-100 p-4'>
            <div className='flex'>
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
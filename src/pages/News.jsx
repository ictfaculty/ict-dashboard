import { Button, Switch } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteIcon, EditIcon } from '../icons';
import { changeActivity, deleteNews, getNews, setCurrentNews } from '../store/features/news/newsSlice';
import ModalForm from '../components/Modals/ModalForm';
import CardNews from './News/CardNews';
import ModalEdit from './News/ModalEdit';


const News = () => {
  const newsList = useSelector(state => state.news.newsList)
  // console.log(newsList);
  const loading = useSelector(state => state.news.isLoading)
  const [showModal, setShowModal] = useState(false)
  const [showModalEdit, setShowModalEdit] = useState(false)

  const handleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  }

  const handleDelete = (newsId) => {
    dispatch(deleteNews(newsId));
  }

  const changeActive = (newsId) => {
    dispatch(changeActivity(newsId));
  }

  const handleEdit = (news) => {
    setShowModalEdit(prev => prev = !prev)
    dispatch(setCurrentNews(news));
  }


  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getNews())
  }, [])
  return (
    <>
      <section>
        {/* <AddNews open close /> */}
        <div className="mb-5 flex flex-wrap justify-between items-center">
          <h1 className='text-[26px] text-textPrimary'>Список новостей</h1>
          <Button onClick={handleModal} className='bg-primary' type="primary">+ Добавить</Button>
          {showModal ?
            <ModalForm />
            : null
          }
          {
            showModalEdit?
            <ModalEdit/>
            : null
          }
        </div>
        {
          loading ?
            <div className="flex justify-center items-center min-h-[50vh]">
              Loading...
            </div>
            :
            <ul className='flex flex-col gap-3 h-[70vh] overflow-auto'>
              {newsList?.map(n => (
                n ?
                  <li key={n.id} className='flex justify-between bg-slate-100 p-4' >
                    <div className='flex gap-2 items-center'>
                      <img
                        className='w-10 h-10'
                        src={n.image_url}
                        alt=""
                      />
                      <span>
                        {n.title}
                      </span>
                    </div>
                    <div className='flex gap-8'>
                      <Switch
                        checked={n.is_active}
                        onChange={() => changeActive(n.id)}
                      />

                      <div div className="cursor-pointer" onClick={() => handleDelete(n.id)}>
                        <DeleteIcon />
                      </div>

                      <div className="cursor-pointer" onClick={() => handleEdit(n)}>
                        <EditIcon />
                      </div>
                    </div>
                  </li>
                  :
                  null

              ))}

            </ul>
        }
        {/* {
        loading ?
          <div className="flex justify-center items-center min-h-[50vh]">
            Loading...
          </div>
          :
          <div className='flex flex-wrap justify-between gap-3'>
            {newsList?.map(n => (
              <CardNews
                img={n.image_url}
                isActive={n.is_active}
                title={n.title}
                description={n.description}
                onClickDelete={() => handleDelete(n.id)}
              />
            ))}
          </div>
      } */}
      </section >


    </>
  )
}

export default News
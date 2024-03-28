import { Button, Switch } from 'antd'
import React, { useEffect, useState } from 'react'
// import { announcements } from '../data'
import { DeleteIcon, EditIcon } from '../icons'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAds, getAds, setCurrentAds } from '../store/features/ads/adsSlice'
import ModalAdd from './ads/ModalAdd'
import ModalEdit from './ads/ModalEdit'

const Announcement = () => {

  const dispatch = useDispatch()
  const announcements = useSelector(ads => ads.ads.adsList)
  // console.log(announcements);
  const loading = useSelector(state => state.ads.isLoading)
  const [showModal, setShowModal] = useState(false)
  const [showModalEdit, setShowModalEdit] = useState(false)


  const handleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  }

  const handleDelete = (id) => {
    dispatch(deleteAds(id));
  }

  const handleEdit = (news) => {
    setShowModalEdit(prev => prev = !prev)
    dispatch(setCurrentAds(news));
  }

  useEffect(() => {
    dispatch(getAds())
  }, [])
  return (
    <section>
      <div className="mb-5 flex flex-wrap justify-between items-center">
        <h1 className='text-[26px] text-textPrimary'>Список обьявлений</h1>
        <Button onClick={handleModal} className='bg-primary' type="primary">+ Добавить</Button>
        {
          showModal ?
            <ModalAdd />
            :
            null
        }
        {
          showModalEdit ?
            <ModalEdit />
            : null
        }
      </div>
      {
        loading ?
          <div className="flex justify-center items-center min-h-[50vh]">
            Loading...
          </div>
          :
          <ul className='flex justify-between flex-wrap gap-3 h-[70vh] overflow-auto'>
            {announcements.map(a => (

              <div
                key={a.id}
                className="shadow-md w-[290px] max-h-[300px] p-5 flex flex-col justify-between mb-6 "
              >
                <div className="">
                  <div className="flex justify-between gap-5">
                    <p className='text-[19px] text-red-500'>{a.title}</p>
                    <Switch
                      value={a.is_active}
                    />
                  </div>
                  <p className=''>{a.description}</p>
                </div>
                <div className="flex items-end justify-between">
                  <div className="">
                    <p className='text-[10px] opacity-[.7]'>Дата создания: {a.created_at}</p>
                    <p className='text-[10px] opacity-[.7]'>Автор: {a.created_by}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div
                      onClick={() => handleDelete(a.id)}
                      className="cursor-pointer"
                    >
                      <DeleteIcon />
                    </div>
                    <div
                      onClick={() => handleEdit(a)}
                      className="cursor-pointer"
                    >
                      <EditIcon />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </ul>

      }

    </section>
  )
}

export default Announcement
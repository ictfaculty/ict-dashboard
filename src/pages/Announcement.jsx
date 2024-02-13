import { Switch } from 'antd'
import React from 'react'
import { announcements } from '../data'
import { DeleteIcon, EditIcon } from '../icons'

const Announcement = () => {
  return (
    <section>
      <ul className='flex flex-col gap-3'>
        {announcements.map(a => (
          <li className='flex justify-between bg-slate-100 p-4'>
            <div className='flex'>
              <span className='w-7'>
                {a.id}
              </span>
              <span>
                {a.title}
              </span>
            </div>
            <div className='flex gap-8'>
              <Switch
                value={a.is_active}
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

export default Announcement
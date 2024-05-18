import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getStudents, getSubjects } from '../store/features/students/studentsSlice'
import TimeTable from './timeTable/TimeTable'

const Timetable = () => {




  return (
    <div>
      <TimeTable/>
    </div>
  )
}

export default Timetable
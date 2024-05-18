import React, { useEffect } from 'react'
import TrimesterTable from './trimester/TrimesterTable'
import { useDispatch } from 'react-redux'
import { getStudents, getSubjects } from '../store/features/students/studentsSlice'

const Trimester = () => {


    return (
        <div>
            <TrimesterTable />
        </div>
    )
}

export default Trimester
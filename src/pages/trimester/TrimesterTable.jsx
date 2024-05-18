

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import '../../App.css'
import { Select } from 'antd';
import { Input } from 'antd';
import { getStudents, getSubjects } from '../../store/features/students/studentsSlice';
const { Search } = Input;

const { Option } = Select;

const TimeTable = () => {
    const studentsList = useSelector(state => state.students.studentsList) || [];
    const subjectsList = useSelector(state => state.students.subjectsList) || [];

    const [selectedSemester, setSelectedSemester] = useState('all')
    const [selectedGroup, setSelectedGroup] = useState('all')
    const [selectedCourse, setSelectedCourse] = useState('all')
    const [search, setSearch] = useState('')

    //semesterChange
    const handleSemesterChange = value => {
        setSelectedSemester(value)
    }
    //groupChange
    const handleGroupChange = value => {
        setSelectedGroup(value)
    }
    //courseChange
    const handleCourseChange = value => {
        setSelectedCourse(value)
    }

    const filteredSubjectsList = subjectsList.filter(subject =>
        studentsList.some(student => {
            if (selectedCourse !== 'all' && student.course !== selectedCourse) {
                return false;
            }
            const semesters = selectedSemester === 'full'
                ? [...(student.firstSemester || []), ...(student.secondSemester || [])]
                : student[selectedSemester + 'Semester'] || [];

            return student.course === selectedCourse && semesters.some(grade => grade.id === subject.id);
        })
    );


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getStudents())
        dispatch(getSubjects())
    }, [])



    return (
        <div>

            <div className="flex justify-between flex-wrap">
                <div className="mb-4 md:mb-0 ">
                    <Input placeholder={`Поиск студентов`}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="mb-4 flex lg:justify-end gap-3 flex-wrap">
                    {
                        selectedCourse != 'all' ?
                            <Select
                                defaultValue="all"
                                style={{
                                    width: 160,
                                }}
                                value={selectedSemester}
                                onChange={handleSemesterChange}
                                options={[
                                    { value: 'all', label: 'Тахсил', },
                                    { value: 'full', label: 'Соли 2023-2024', },
                                    { value: 'first', label: 'Нимсолаи 1', },
                                    { value: 'second', label: 'Нимсолаи 2', },
                                ]}
                            /> :
                            null
                    }
                    <Select
                        defaultValue="fourth"
                        style={{
                            width: 160,
                        }}
                        value={selectedCourse}
                        onChange={handleCourseChange}
                        options={[
                            // { value: 'all', label: 'Курсхо', },
                            { value: 'all', label: 'Донишчуён', },
                            { value: '4', label: 'Курси 4', },
                            { value: '3', label: 'Курси 3', },
                            { value: '2', label: 'Курси 2', },
                            { value: '1', label: 'Курси 1', },
                        ]}
                    />

                    <Select
                        defaultValue="all"
                        style={{
                            width: 160,
                        }}
                        value={selectedGroup}
                        onChange={handleGroupChange}
                        options={[
                            { value: 'all', label: 'Гурух' },
                            { value: '530102-A', label: '530102-A', },
                            { value: '530102-Б', label: '530102-Б', },
                        ]}
                    />
                </div>
            </div>
            <div className="h-[70vh] overflow-auto element-with-scroll">
                <table className='w-full '>
                    <thead className='' >
                        {
                            selectedSemester !== 'all' ?
                                <tr>
                                    <th className='text-[13px]'>№</th>
                                    <th>Ному насаб</th>
                                    <th className='text-[10px]'>Курс</th>
                                    {/* <th>Б/Ш</th> */}
                                    <th>Гурух</th>
                                    {
                                        filteredSubjectsList && filteredSubjectsList.map((subject) => (
                                            <th className='text-[12px]' key={subject.id}>{subject.name}</th>
                                        ))
                                    }
                                </tr> :
                                <tr>
                                    <th className='text-[13px]'>№</th>
                                    <th>Ному насаб</th>
                                    <th className='text-[10px]'>Курс</th>
                                    <th>Гурух</th>
                                    <th>E-mail</th>
                                    <th>Телефон</th>
                                    <th>Адрес</th>
                                    <th>Б/Ш</th>
                                    <th>Шакли тахсил</th>
                                </tr>
                        }

                    </thead>
                    <tbody>
                        {
                            selectedSemester == 'all' ?
                                studentsList && studentsList
                                    .filter(student => (
                                        student.firstname.trim().toLowerCase().includes(search)
                                    ))
                                    .filter(student => (
                                        selectedCourse == 'all' ? student : student.course == selectedCourse
                                    ))
                                    .filter(student => (
                                        (selectedSemester == 'all' ? [...student.firstSemester, ...student.secondSemester] :
                                            selectedSemester == 'first' ? student.firstSemester : student.secondSemester
                                        )
                                            .some(grade => parseInt(grade.grade) < '50')
                                    ))
                                    .filter(student => (
                                        selectedGroup === 'all' ? student :
                                            selectedGroup === '530102-A' ? student.group === '530102-A' :
                                                student.group === '530102-Б'
                                    ))
                                    .map((student, index) => (
                                        <tr key={student.id} className='text-center'>
                                            <td className='text-[13px]'>{index + 1}</td>
                                            <td style={{ width: '23%' }} className='text-[16px] text-start text-[red]'>{`${student.firstname} ${student.lastname}`}</td>
                                            <td className='text-[14px]'>{student.course}</td>
                                            <td className='text-[12px]'>{student.group}</td>
                                            <td className='text-[14px] text-start'>{student.email}</td>
                                            <td className='text-[14px]'>+992 {student.phone}</td>
                                            <td className='text-[14px] text-start'>{student.Address}</td>
                                            <td className='text-[14px] text-start'>{student.isBudget ? 'Бучави' : 'Шартнома'}</td>
                                            <td className='text-[14px]'>{student.isFulltime ? 'Рузона' : 'Фосила'}</td>
                                        </tr>
                                    ))
                                :
                                studentsList && studentsList
                                    .filter(student => (
                                        student.firstname.trim().toLowerCase().includes(search)
                                    ))
                                    .filter(student => (
                                        selectedGroup === 'all' ? student :
                                            selectedGroup === '530102-A' ? student.group === '530102-A' :
                                                student.group === '530102-Б'
                                    ))
                                    .filter(student => (
                                        // (selectedSemester == 'all' ? [...student.firstSemester, ...student.secondSemester] :
                                        //     selectedSemester == 'first' ? student.firstSemester : student.secondSemester
                                        // )
                                        [...student.firstSemester, ...student.secondSemester].some(grade => parseInt(grade.grade) < '50')
                                    ))
                                    .filter(student => (
                                        student.course == selectedCourse
                                    ))
                                    .map((student, index) => (
                                        <tr key={student.id}>
                                            <td className='text-[13px] text-center'>{index + 1}</td>
                                            <td style={{ width: '21%' }} className='text-[14px] text-[red]'>{`${student.firstname} ${student.lastname.split('')[0]}`}</td>
                                            <td className='text-[11px] text-center  '>{student.course}</td>
                                            <td className='text-[7px]'>{student.group}</td>
                                            {
                                                (

                                                    (selectedSemester == 'full'
                                                        ? [...student.firstSemester, ...student.secondSemester]
                                                        : selectedSemester == 'first'
                                                            ? student.firstSemester
                                                            : student.secondSemester)
                                                ).map(grade => (
                                                    <td
                                                        key={grade.id}
                                                        style={{ color: grade.grade < 50 ? 'red' : '#000' }}
                                                        className='text-center text-[13px]'
                                                    >
                                                        {
                                                            grade.grade < 50 ?
                                                                <div className="flex justify-center text-[red]">
                                                                    {/* <span className='text-[red]'> </span> */}
                                                                    {grade.grade}
                                                                    {/* <br /> */}
                                                                    {/* <span style={{ fontSize: '10px', width: 'auto' }}>{grade.name}</span> */}
                                                                </div>
                                                                :
                                                                <div className="flex justify-center ">
                                                                    ✓
                                                                </div>
                                                        }
                                                    </td>
                                                ))
                                            }
                                        </tr>
                                    ))
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TimeTable
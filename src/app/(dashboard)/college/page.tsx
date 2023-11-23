import CollegeTable from '@/components/tables/CollegeTable'
import { api } from '@/trpc/server'
import React from 'react'

const CollegePage = async () => {

  const colleges = await api.college.getColleges.query()

  return (
    <div className="w-full ">
    <div className="p-8">
      <p className="text-2xl font-bold">Colleges</p>
      <div className="my-4">
        <CollegeTable data={colleges} />
      </div>
    </div>
  </div>
  )
}

export default CollegePage
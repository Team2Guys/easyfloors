import Container from 'components/common/container/Container'
import React from 'react'

const DetailSkaleton = () => {
  return (
    <Container className="flex flex-wrap lg:flex-nowrap gap-5 w-full mt-10 border-b pb-5 2xl:gap-20">
        <div className="w-full 2xl:w-[60%] lg:w-[55%] space-y-3">
          <div className="w-full h-[300px] sm:h-[700px] bg-gray-200 animate-pulse rounded"></div>
          <div className="flex space-x-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-full h-14 sm:h-32 bg-gray-200 animate-pulse rounded"></div>
            ))}
          </div>
        </div>
        <div className="w-full 2xl:w-[40%] lg:w-[45%] space-y-4">
          <div className="h-10 sm:h-12 w-full sm:w-3/4 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-10 sm:h-12 w-3/4 sm:w-1/2 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-10 sm:h-12 w-4/4 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-8 sm:h-10 w-6/6 sm:w-1/6 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-8 sm:h-10 w-4/6 sm:w-3/12 bg-gray-200 animate-pulse rounded hidden sm:block"></div>
          <div className=" h-10 sm:h-16 w-3/4  sm:w-1/4 bg-gray-200 animate-pulse rounded  hidden sm:block"></div>
          <div className="h-8 sm:h-12 w-4/6 sm:w-2/6 bg-gray-200 animate-pulse rounded  hidden sm:block"></div>
          <div className="h-8 sm:h-12 w-5/6 sm:w-3/6 bg-gray-200 animate-pulse rounded  hidden sm:block"></div>
          <div className="h-8 sm:h-12 w-4/6 sm:w-2/6 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-8 sm:h-12 w-4/6 sm:w-2/6 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-14 w-4/6 bg-gray-200 animate-pulse rounded"></div>

          <div className="flex gap-3">
            <div className="h-12 sm:h-20 w-1/2 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-12 sm:h-20 w-1/2 bg-gray-200 animate-pulse rounded"></div>
          </div>
          <div className="h-8 w-2/6 bg-gray-200 animate-pulse rounded"></div>
        </div>
    </Container>
  )
}

export default DetailSkaleton
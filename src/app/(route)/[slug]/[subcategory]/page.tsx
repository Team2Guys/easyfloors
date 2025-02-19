import Container from 'components/common/container/Container'
import Breadcrumb from 'components/Reusable/breadcrumb'
import SubCategory from 'components/sub-category/sub-category-product'
import React from 'react'

const Category = () => {
  return (
    <>
      <Breadcrumb image='/assets/images/category/category-breadcrumb.png'/>
      <Container className='flex flex-wrap lg:flex-nowrap lg:gap-4 xl:gap-8 mt-10'>
        <div className=' lg:w-[20%] h-20 bg-primary'>

        </div>
        <div className='lg:w-[80%]'>
          <SubCategory/>
        </div>
      </Container>
    </>
  )
}

export default Category
import Container from "components/common/container/Container"

const CategorySkeleton = () => {
   return (
      <>
         <Container>
            <div className="h-6 w-28 sm:w-52 bg-gray-200 animate-pulse my-4"></div>
         </Container>
         <div className="h-[70px] sm:h-[200px] xl:h-[332px] bg-gray-200 animate-pulse mb-6"></div>
         <Container>
            <div className="flex flex-wrap lg:flex-nowrap lg:gap-4 xl:gap-8 mt-4 lg:mt-10">
               <div className="lg:w-[20%] hidden lg:block">
                  <div className="h-full bg-gray-200 rounded animate-pulse"></div>
               </div>
               <div className="w-full lg:w-[80%]">
                  <div className="pb-4">
                     <div className="h-14 w-60 bg-gray-200 animate-pulse mb-8"></div>
                     <div className="h-5 bg-gray-200 animate-pulse mb-3"></div>
                     <div className="h-5 bg-gray-200 animate-pulse mb-3"></div>
                     <div className="h-5 bg-gray-200 animate-pulse mb-3"></div>
                     <div className="h-5 bg-gray-200 animate-pulse mb-3 block lg:hidden"></div>
                     <div className="h-5 bg-gray-200 animate-pulse mb-3 block lg:hidden"></div>
                  </div>
                  <div className="mb-5 flex justify-between items-center gap-4">
                     <div className="h-10 w-28 bg-gray-200 animate-pulse block lg:hidden"></div>
                     <div className="h-10 w-28 lg:w-52 bg-gray-200 animate-pulse"></div>
                  </div>
                     
                     <div className="h-10 bg-gray-200 animate-pulse"></div>
                  <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                     {[...Array(6)].map((_, i) => (
                        <div key={i} className="w-full h-[200px] sm:h-[300px] animate-pulse flex flex-col mt-3">
                           <div className="h-[150px] sm:h-[200px] w-full bg-gray-300"></div>
                           <div className="py-3 flex flex-col gap-2">
                              <div className="h-6 bg-gray-300 rounded"></div>
                              <div className="flex items-center justify-between gap-2">
                                 <div className="h-6 w-28 bg-gray-300 rounded"></div>
                                 <div className="h-10 w-40 bg-gray-300 rounded"></div>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </Container>
      </>
   )
}

export default CategorySkeleton
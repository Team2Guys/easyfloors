import React from 'react'
import MainPage from './MainPage'

import { fetchRedirectUrls} from 'config/general';

async function  Page() {
  const  Redirecturls=await fetchRedirectUrls()
  console.log(Redirecturls, "Redirecturls")
  return (
    <MainPage Redirecturls={Redirecturls} />
  )
}

export default Page
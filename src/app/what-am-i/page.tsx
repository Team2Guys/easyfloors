import Breadcrumb from 'components/Reusable/breadcrumb'
import WhatAmICetagory from 'components/WhatAmICetagory/WhatAmICetagory'
import { WhatAmIcategoryData } from 'data/data'
import React from 'react'

const Whatami = () => {
  return (
 <>
    <Breadcrumb title="What Am I?" image="/assets/category/header-image.png" />
    <WhatAmICetagory data={WhatAmIcategoryData} />
 </>
  )
}

export default Whatami

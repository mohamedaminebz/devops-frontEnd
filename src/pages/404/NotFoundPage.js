import React from 'react'

import notFound404 from './404.jpg'

export default function NotFoundPage() {
  return (
    <div>
        <img src={notFound404} width={"100%"} alt='404' height={"800px"}/>
    </div>
  )
}

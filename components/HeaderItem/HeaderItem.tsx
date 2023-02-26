import React from 'react'

interface Props {
    icon: JSX.Element,
    content: JSX.Element | string
}

export default function HeaderItem({icon,content}:Props) {
  return (
    <div>HeaderItem</div>
  )
}

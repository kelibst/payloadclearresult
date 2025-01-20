import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
  <div className=' flex items-center gap-2'>
  <div className='max-w-[60px]'>
    <img
      alt="ClearResultConsul Logo"
      width={100}
      height={60}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('w-full h-[60px] rounded-full', className)}
      src="../images/logo.jpg"
    /></div>
    <h1 className="font-pacifico text-lg">ClearResult Consult</h1>
    </div>
  )
}

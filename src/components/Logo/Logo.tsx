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
    <img
      alt="ClearResultConsul Logo"
      width={200}
      height={60}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('w-full h-[60px] rounded-full', className)}
      src="../images/logo.jpg"
    />
  )
}

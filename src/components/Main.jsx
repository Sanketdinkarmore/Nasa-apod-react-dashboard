import React from 'react'

const Main = (props) => {
  const {data}=props
  const isVideo = data?.media_type === 'video'
  const videoUrl = data?.url
  const imageUrl = data?.hdurl || data?.url
  const normalizedEmbedUrl =
    typeof videoUrl === 'string' && videoUrl.includes('youtu.be/')
      ? videoUrl.replace('youtu.be/', 'www.youtube.com/embed/')
      : typeof videoUrl === 'string' && videoUrl.includes('youtube.com/watch?v=')
        ? videoUrl.replace('watch?v=', 'embed/')
        : videoUrl
  const isEmbeddableVideo =
    typeof normalizedEmbedUrl === 'string' &&
    (normalizedEmbedUrl.includes('youtube.com') ||
      normalizedEmbedUrl.includes('youtu.be') ||
      normalizedEmbedUrl.includes('vimeo.com'))

  return (
    <div className='imgContainer'>
      <span className='mediaTypeBadge'>{isVideo ? 'VIDEO' : 'IMAGE'}</span>
      {isVideo ? (
        isEmbeddableVideo ? (
          <iframe
            src={normalizedEmbedUrl}
            title={data?.title || 'nasa-apod-video'}
            className='bgVideoFrame'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            referrerPolicy='strict-origin-when-cross-origin'
            allowFullScreen
          />
        ) : (
          <video
            src={videoUrl}
            className='bgVideo'
            controls
            preload='metadata'
          />
        )
      ) : (
        <img src={imageUrl} alt={data?.title || 'bg-img'} className='bgImage' />
      )}
    </div>
  )
}

export default Main
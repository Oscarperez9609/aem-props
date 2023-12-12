import React, { useState } from 'react'
import { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import renderHTML from 'react-render-html'
import 'swiper/swiper.min.css'
import 'swiper/swiper-bundle.css'
import 'swiper/modules/pagination/pagination.min.css'
import 'swiper/modules/navigation/navigation.min.css'
import { MapTo } from '@adobe/aem-react-editable-components'
import generateRouteLink from '../../../utils/generateRouteLink'
import './Banner.css';

const Button = ({ button, index }) => {
  const [isHover, setIsHover] = useState(false)
  const handleMouseEnter = () => {
    setIsHover(true)
  }
  const handleMouseLeave = () => {
    setIsHover(false)
  }
  const buttonStyles = {
    backgroundColor: isHover ? button.hoverBackground : button.background,
    color: isHover ? button.hoverColor : button.color,
    borderColor: isHover ? button.hoverBorder : button.border,
  }
  return (
    <a
      className='btn buttons-brasil'
      style={buttonStyles}
      href={generateRouteLink(button.link)}
      key={index}
      aria-label={button.text}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span aria-hidden='true' className='banner-span'>
        {button.text}
      </span>
    </a>
  )
}
const Slide = ({ item, index }) => {
  return (
    <div className='slide-container'>
      <img
        className='slide-background'
        aria-label='decorativo'
        src={item.backgroundDesktop}
        alt={
          item.backgroundAlt
            ? item.backgroundAlt
            : (item.mainText ? item.mainText.replace(/<[^>]+>/g, '') : index) +
              '-alt'
        }
        loading='lazy'
      />
      <div
        className={
          item.resourcePath
            ? 'banner-content-br'
            : 'banner-content-br banner-only-br'
        }
      >
        <div
          className={
            item.resourcePath
              ? 'slide-content-br'
              : 'slide-content-br slide-only-br'
          }
        >
          {item.mainText && (
            <div className='main-text-br font-ENELBlack'>
              <h2>{renderHTML(item.mainText)}</h2>
            </div>
          )}
          {item.secondaryText && (
            <div className='secondary-text-br font-ENELRegular'>
              <h3>{renderHTML(item.secondaryText)}</h3>
            </div>
          )}
          <div className='content-button'>
            <div className='button-brasil'>
              {item.buttons &&
                item.buttons.map((button, i2) => (
                  <Button key={i2} button={button} index={i2} />
                ))}
            </div>
          </div>
        </div>
        {item.resourcePath && (
          <div className='slide-resource-br'>
            {item.video ? (
              <video playsInline autoPlay controls muted loop>
                <source src={item.resourcePath} type='video/mp4' />
              </video>
            ) : (
              <img
                src={item.resourcePath}
                alt={
                  item.mainText
                    ? item.mainText.replace(/<[^>]+>/g, '')
                    : 'Imagen ' + index
                }
                className='banner__image--resource'
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}
const Banner = ({ slides = [] }) => {
  return slides.length ? (
    <Swiper
      slidesPerView={1}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      modules={[Autoplay]}
      className='banner-carousel-br'
    >
      {slides.map((item, index) => (
        <SwiperSlide key={'slide-' + index}>
          <Slide item={item} index={index} />
        </SwiperSlide>
      ))}
    </Swiper>
  ) : (
    <div className='default-backgroud'>Banner</div>
  )
}

const BannerConfig = {
  emptyLabel: 'Enel Brasil - Banner',

  isEmpty: function (props) {
    return props.slides ? (props.slides.length > 0 ? true : false) : false
  },
}

export default MapTo('mercadolivre/components/bannerBR')(Banner, BannerConfig)

import React from 'react';
import './BlogHead.css';
import 'swiper/swiper.min.css';
import 'swiper/swiper-bundle.css';
import 'swiper/modules/navigation/navigation.min.css';
import { MapTo } from '@adobe/aem-react-editable-components';

const urlShort = window.location.href;
const segments = urlShort.split('/');
const desiredSegment = segments[segments.length - 3];
const secondLastSegment = segments[segments.length - 2];

const BlogHead = ({
  imgHead,
  imgAlt,
  blogBreadcrum,
  blogEneltitle,
  tiempoLectura,
  datepicker,
  btnVideo,
  urlDoc,
  htmlCode,
  ...props
}) => {
  console.log(props, blogEneltitle);
  return (
    <div className="flex-col flex">
      <div className="image-container">
        <img alt={imgAlt || 'Enel X Alt'} src={`${imgHead}`} />
        <div className="image-text">
          <pre>
            {desiredSegment}/{secondLastSegment}
          </pre>
          <h2>{blogEneltitle || 'default title'}</h2>
        </div>
      </div>
    </div>
  );
};

const BlogHeadConfig = {
  emptyLabel: 'Enel - Banner Blog',

  isEmpty: function (props) {
    return false;
  },
};

export default MapTo('mercadolivre/components/blogHead')(
    BlogHead,
    BlogHeadConfig
);

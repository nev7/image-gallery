import React, { Component } from 'react';
import '../styles/GalleryThumbs.css';

class GalleryThumbs extends Component {
    render() {
        const { images, selectImage } = this.props; //, onMouseOver, hover
        return (
            <div className='container-thumbs'>
                {images.map((image, index) => {
                    const SOURCE_ROOT = "https://i.imgur.com/";
                    let fullSource = '';

                    if (image.images) {
                        fullSource = SOURCE_ROOT + image.images[0].id + '.jpg';
                    } else {
                        fullSource = SOURCE_ROOT + image.id + '.jpg';
                    }
                    return <div className='thumb-box' key={index} onClick={function(){selectImage(image)}}>
                                <div className='img-container'>
                                    <img className='thumb-img' src={ fullSource } alt='thumbnail image'/>
                                </div>
                                <div className='thumb-description'>{image.title}</div>
                           </div>
                })}
            </div>
        )
    }
}

export default GalleryThumbs;
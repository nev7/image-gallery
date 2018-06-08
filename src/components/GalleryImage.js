import React, { Component } from 'react';
import '../styles/GalleryImage.css';

class GalleryImage extends Component {
    render() {
        const { image, onClick } = this.props;
        const SOURCE_ROOT = "https://i.imgur.com/";
        let fullSource = '';
        if (image !== null && image.images) {
            fullSource = SOURCE_ROOT + image.images[0].id + '.jpg';
        } else if (image !== null) {
            fullSource = SOURCE_ROOT + image.id + '.jpg';
        }
        return (
            <div>
                {image ? <div className='image-preview-box' onClick={ function(){ onClick(null) } }>
                    <img className='large-img' src={ fullSource } alt='large image'/>
                    <h2 className='image-title'>{image.title}</h2>
                    <p className='image-description'>{image.description}</p>
                    <div className='votes-score-box'>
                        <p className='up-votes'>UP: { image.ups }</p>
                        <p className='down-votes'>Down: { image.downs }</p>
                        <p className='image-score'>Score: { image.score }</p>
                    </div>
                </div> : null }
            </div>
        )
    }
}

export default GalleryImage;